function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function typeTextInTab(tabId, text) {
  const target = { tabId };

  return new Promise((resolve) => {
    chrome.debugger.attach(target, "1.3", () => {
      const attachError = chrome.runtime.lastError;
      if (attachError) {
        resolve({ ok: false, error: attachError.message });
        return;
      }

      chrome.debugger.sendCommand(target, "Input.insertText", { text }, () => {
        const insertError = chrome.runtime.lastError;
        chrome.debugger.detach(target, () => {
          resolve({
            ok: !insertError,
            error: insertError?.message
          });
        });
      });
    });
  });
}

function scrapeFacebookGroupResults() {
  const anchors = [...document.querySelectorAll('a[href*="/groups/"]')];
  const seen = new Set();

  return anchors.map(anchor => {
    const match = anchor.href.match(/https:\/\/www\.facebook\.com\/groups\/([^/?#]+)/);
    if (!match) return null;

    const url = `https://www.facebook.com/groups/${match[1]}`;
    if (seen.has(url)) return null;
    seen.add(url);

    const container = anchor.closest('[role="article"], [role="listitem"]') || anchor.closest("div");
    const lines = (container?.innerText || anchor.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    const name = lines.find(line =>
      !/join|joined|public group|private group|members?|posts?/i.test(line)
    ) || anchor.innerText || "Facebook group";

    const privacy = lines.find(line => /public group|private group/i.test(line)) || "";
    const members = lines.find(line => /members?/i.test(line)) || "";

    return { name, url, privacy, members };
  }).filter(Boolean).slice(0, 8);
}

function findGroupUrls(query) {
  return new Promise((resolve) => {
    const searchUrl = `https://www.facebook.com/search/groups?q=${encodeURIComponent(query)}`;

    chrome.tabs.create({ url: searchUrl, active: false }, (tab) => {
      if (chrome.runtime.lastError || !tab?.id) {
        resolve({ ok: false, error: chrome.runtime.lastError?.message || "Could not open Facebook search." });
        return;
      }

      let finished = false;
      const timeoutId = setTimeout(() => finish({ ok: false, error: "Facebook search timed out." }), 15000);

      function finish(result) {
        if (finished) return;
        finished = true;
        clearTimeout(timeoutId);
        chrome.tabs.onUpdated.removeListener(listener);
        chrome.tabs.remove(tab.id);
        resolve(result);
      }

      function runScrape() {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: scrapeFacebookGroupResults
        }, (results) => {
          if (chrome.runtime.lastError) {
            finish({ ok: false, error: chrome.runtime.lastError.message });
            return;
          }

          const candidates = results?.[0]?.result || [];
          finish({ ok: true, candidates });
        });
      }

      function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === "complete") {
          setTimeout(runScrape, 3500);
        }
      }

      chrome.tabs.onUpdated.addListener(listener);
    });
  });
}

function openAndInject(url) {
  return new Promise((resolve) => {
    let openedTabId = null;
    let finished = false;
    let updatedListener = null;
    const timeoutId = setTimeout(() => finish(false), 30000);

    function finish(ok = true) {
      if (finished) return;
      finished = true;
      clearTimeout(timeoutId);
      chrome.runtime.onMessage.removeListener(messageListener);
      chrome.tabs.onRemoved.removeListener(removedListener);
      if (updatedListener) chrome.tabs.onUpdated.removeListener(updatedListener);
      resolve(ok);
    }

    function messageListener(message, sender) {
      if (sender.tab?.id !== openedTabId) return;
      if (message.action === "postingDone" || message.action === "closeTab") {
        finish(true);
      }
      if (message.action === "postingFailed") {
        finish(false);
      }
    }

    function removedListener(tabId) {
      if (tabId === openedTabId) finish();
    }

    chrome.tabs.create({ url }, (tab) => {
      openedTabId = tab.id;
      chrome.runtime.onMessage.addListener(messageListener);
      chrome.tabs.onRemoved.addListener(removedListener);

      async function tryInject(tabId, attempts = 0) {
        if (attempts > 8) { finish(); return; }
        try {
          await chrome.scripting.executeScript({
            target: { tabId },
            files: ["content.js"]
          });
        } catch (err) {
          setTimeout(() => tryInject(tabId, attempts + 1), 400);
        }
      }

      updatedListener = function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(updatedListener);
          updatedListener = null;
          setTimeout(() => tryInject(tab.id), 800);
        }
      };
      chrome.tabs.onUpdated.addListener(updatedListener);

    });
  });
}

async function openGroups(groups) {
  for (const url of groups) {
    const ok = await openAndInject(url);
    if (!ok) break;
    await sleep(250);
  }
}

function setWeeklyReminder(day, hour) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, 0, 0, 0);

  let daysUntil = (day - now.getDay() + 7) % 7;
  if (daysUntil === 0 && target <= now) daysUntil = 7;
  target.setDate(target.getDate() + daysUntil);

  const delayMinutes = (target - now) / 60000;

  chrome.alarms.clear("weeklyReminder", () => {
    chrome.alarms.create("weeklyReminder", {
      delayInMinutes: delayMinutes,
      periodInMinutes: 10080
    });
  });
}

function showNotification() {
  chrome.notifications.create("reminderNotif", {
    type: "basic",
    iconUrl: "icon.png",
    title: "Time to post your ads! 🔁",
    message: "Open Reposter and post to your groups.",
    priority: 2
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "typeText") {
    typeTextInTab(sender.tab.id, message.text).then(response => {
      sendResponse(response);
    });
    return true;
  }
  if (message.action === "findGroupUrls") {
    findGroupUrls(message.query).then(response => {
      sendResponse(response);
    });
    return true;
  }
  if (message.action === "openPopup") {
    if (chrome.action?.openPopup) {
      try {
        const result = chrome.action.openPopup();
        if (result?.catch) {
          result.catch(() => chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") }));
        }
      } catch (error) {
        chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
      }
    } else {
      chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
    }
  }
  if (message.action === "openAndInject") {
    openGroups(message.groups);
  }
  if (message.action === "setReminder") {
    setWeeklyReminder(message.day, message.hour);
  }
  if (message.action === "closeTab") {
    chrome.tabs.remove(sender.tab.id);
  }
  if (message.action === "testReminder") {
    showNotification();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "weeklyReminder") showNotification();
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["reminderDay", "reminderTime"], (data) => {
    setWeeklyReminder(data.reminderDay ?? 1, data.reminderTime ?? 9);
  });
});
