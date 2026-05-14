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
