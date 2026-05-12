function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openAndInject(url) {
  return new Promise((resolve) => {
    chrome.tabs.create({ url }, (tab) => {

      async function tryInject(tabId, attempts = 0) {
        if (attempts > 8) { resolve(); return; }
        try {
          await chrome.scripting.executeScript({
            target: { tabId },
            files: ["content.js"]
          });
          resolve();
        } catch (err) {
          setTimeout(() => tryInject(tabId, attempts + 1), 800);
        }
      }

      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          setTimeout(() => tryInject(tab.id), 2000);
        }
      });

    });
  });
}

async function openGroups(groups) {
  for (const url of groups) {
    await openAndInject(url);
    await sleep(800);
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

chrome.runtime.onMessage.addListener((message, sender) => {
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