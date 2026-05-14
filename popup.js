const GROUPS = [
  { id: "g1", url: "https://www.facebook.com/groups/146104119060597" },
  { id: "g2", url: "https://www.facebook.com/groups/1983005668510281" },
  { id: "g3", url: "https://www.facebook.com/groups/402946181962616" },
  { id: "g4", url: "https://www.facebook.com/groups/498850401892441" },
  { id: "g5", url: "https://www.facebook.com/groups/1438402670290014" },
];

// Load saved message
chrome.storage.local.get(["postText"], (data) => {
  if (data.postText) {
    document.getElementById("postText").value = data.postText;
  }
});

// Load saved reminder settings
chrome.storage.local.get(["reminderDay", "reminderTime"], (data) => {
  if (data.reminderDay !== undefined) {
    document.getElementById("reminderDay").value = data.reminderDay;
  }
  if (data.reminderTime !== undefined) {
    document.getElementById("reminderTime").value = data.reminderTime;
  }
});

// Save message
document.getElementById("saveMessage").addEventListener("click", () => {
  const text = document.getElementById("postText").value.trim();
  if (!text) return;
  chrome.storage.local.set({ postText: text });
  const msg = document.getElementById("messageSaved");
  msg.textContent = "Message saved!";
  setTimeout(() => msg.textContent = "", 2000);
});

// Save reminder
document.getElementById("saveReminder").addEventListener("click", () => {
  const day = parseInt(document.getElementById("reminderDay").value);
  const hour = parseInt(document.getElementById("reminderTime").value);
  chrome.storage.local.set({ reminderDay: day, reminderTime: hour });
  chrome.runtime.sendMessage({ action: "setReminder", day, hour });
  const msg = document.getElementById("savedMsg");
  msg.textContent = "Reminder saved!";
  setTimeout(() => msg.textContent = "", 2000);
});

// Test reminder
document.getElementById("testReminder").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "testReminder" });
  const msg = document.getElementById("savedMsg");
  msg.textContent = "Notification sent!";
  setTimeout(() => msg.textContent = "", 2000);
});

// Post to selected groups
document.getElementById("postBtn").addEventListener("click", () => {
  const selected = GROUPS.filter(g =>
    document.getElementById(g.id).checked
  );

  if (selected.length === 0) {
    document.getElementById("status").textContent = "Select at least one group.";
    return;
  }

  document.getElementById("postBtn").disabled = true;
  document.getElementById("status").textContent = `Opening ${selected.length} group(s)...`;

  chrome.runtime.sendMessage({
    action: "openAndInject",
    groups: selected.map(g => g.url)
  });

  setTimeout(() => {
    document.getElementById("postBtn").disabled = false;
    document.getElementById("status").textContent = "Tabs opened — click Post in each one!";
  }, 2000);
});