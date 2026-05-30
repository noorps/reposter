const DEFAULT_GROUPS = [];

const DEFAULT_VARIANTS = [
  {
    id: "tutoring",
    name: "Tutoring Offer",
    text: "Hi everyone! I offer SAT tutoring and academic support for students who want a clearer plan, stronger practice habits, and more confidence before test day. Message me for availability."
  },
  {
    id: "small-business",
    name: "Small Business Promo",
    text: "Hi everyone! I run a local service business and have a few openings this week. If you or someone you know needs help, feel free to message me and I can share details."
  }
];

let variants = [];
let selectedVariantId = null;
let groups = [];

const variantSelect = document.getElementById("variantSelect");
const variantName = document.getElementById("variantName");
const postText = document.getElementById("postText");
const messageSaved = document.getElementById("messageSaved");
const groupList = document.getElementById("groupList");

function createId() {
  return `variant-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function showMessage(el, text, type = "success") {
  el.textContent = text;
  el.classList.toggle("success", type === "success");
  el.classList.toggle("error", type === "error");
  setTimeout(() => {
    el.textContent = "";
    el.classList.remove("success", "error");
  }, 2200);
}

function getSelectedVariant() {
  return variants.find(variant => variant.id === selectedVariantId) || variants[0];
}

function renderVariants() {
  variantSelect.innerHTML = "";

  variants.forEach((variant) => {
    const option = document.createElement("option");
    option.value = variant.id;
    option.textContent = variant.name;
    variantSelect.appendChild(option);
  });

  const selected = getSelectedVariant();
  if (!selected) return;

  selectedVariantId = selected.id;
  variantSelect.value = selected.id;
  variantName.value = selected.name;
  postText.value = selected.text;
}

function persistVariants(callback) {
  chrome.storage.local.set({
    messageVariants: variants,
    selectedVariantId
  }, callback);
}

function saveCurrentVariant(callback) {
  const name = variantName.value.trim() || "Untitled Variant";
  const text = postText.value.trim();

  if (!text) {
    showMessage(messageSaved, "Add a message first.", "error");
    return false;
  }

  let variant = getSelectedVariant();
  if (!variant) {
    variant = { id: createId(), name, text };
    variants.push(variant);
  }

  variant.name = name;
  variant.text = text;
  selectedVariantId = variant.id;

  persistVariants(() => {
    chrome.storage.local.set({ postText: text }, () => {
      renderVariants();
      if (callback) callback(variant);
    });
  });

  return true;
}

function loadVariants() {
  chrome.storage.local.get(["messageVariants", "selectedVariantId", "postText"], (data) => {
    variants = Array.isArray(data.messageVariants) && data.messageVariants.length
      ? data.messageVariants
      : DEFAULT_VARIANTS.map(variant => ({ ...variant }));

    if (data.postText && !data.messageVariants) {
      variants[0] = {
        ...variants[0],
        name: "Saved Message",
        text: data.postText
      };
    }

    selectedVariantId = data.selectedVariantId || variants[0].id;
    persistVariants(renderVariants);
  });
}

function persistGroups() {
  chrome.storage.local.set({ userGroups: groups });
}

function renderGroups() {
  groupList.innerHTML = "";
  const postableGroups = groups.filter(group => group.url);

  if (!postableGroups.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Open the dashboard to add Facebook group URLs.";
    groupList.appendChild(empty);
    return;
  }

  postableGroups.forEach((group) => {
    const row = document.createElement("div");
    row.className = "group-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = group.id;
    checkbox.checked = group.selected !== false;

    const label = document.createElement("label");
    label.htmlFor = group.id;
    label.textContent = group.name;

    checkbox.addEventListener("change", () => {
      group.selected = checkbox.checked;
      persistGroups();
    });

    row.append(checkbox, label);
    groupList.appendChild(row);
  });
}

function loadGroups() {
  chrome.storage.local.get(["userGroups"], (data) => {
    groups = Array.isArray(data.userGroups)
      ? data.userGroups
      : DEFAULT_GROUPS.map(group => ({ ...group }));

    if (Array.isArray(data.userGroups)) {
      renderGroups();
    } else {
      chrome.storage.local.set({ userGroups: groups }, renderGroups);
    }
  });
}

variantSelect.addEventListener("change", () => {
  selectedVariantId = variantSelect.value;
  persistVariants(() => {
    const selected = getSelectedVariant();
    if (!selected) return;
    chrome.storage.local.set({ postText: selected.text });
    renderVariants();
  });
});

document.getElementById("saveVariant").addEventListener("click", () => {
  saveCurrentVariant(() => showMessage(messageSaved, "Variant saved."));
});

document.getElementById("newVariant").addEventListener("click", () => {
  const variant = {
    id: createId(),
    name: "New Message Variant",
    text: ""
  };

  variants.push(variant);
  selectedVariantId = variant.id;
  persistVariants(renderVariants);
  showMessage(messageSaved, "New message ready.");
});

document.getElementById("deleteVariant").addEventListener("click", () => {
  if (variants.length <= 1) {
    showMessage(messageSaved, "Keep at least one variant.", "error");
    return;
  }

  variants = variants.filter(variant => variant.id !== selectedVariantId);
  selectedVariantId = variants[0].id;
  persistVariants(renderVariants);
  showMessage(messageSaved, "Variant deleted.");
});

chrome.storage.local.get(["reminderDay", "reminderTime"], (data) => {
  if (data.reminderDay !== undefined) {
    document.getElementById("reminderDay").value = data.reminderDay;
  }
  if (data.reminderTime !== undefined) {
    document.getElementById("reminderTime").value = data.reminderTime;
  }
});

document.getElementById("saveReminder").addEventListener("click", () => {
  const day = parseInt(document.getElementById("reminderDay").value, 10);
  const hour = parseInt(document.getElementById("reminderTime").value, 10);
  chrome.storage.local.set({ reminderDay: day, reminderTime: hour });
  chrome.runtime.sendMessage({ action: "setReminder", day, hour });
  showMessage(document.getElementById("savedMsg"), "Reminder saved.");
});

document.getElementById("postBtn").addEventListener("click", () => {
  const selected = groups.filter(group => group.selected !== false && group.url);
  const status = document.getElementById("status");
  const postBtn = document.getElementById("postBtn");

  status.classList.remove("error");

  if (selected.length === 0) {
    status.textContent = "Select at least one group.";
    status.classList.add("error");
    return;
  }

  postBtn.disabled = true;

  const saved = saveCurrentVariant((variant) => {
    status.textContent = `Opening ${selected.length} group(s) with "${variant.name}"...`;

    chrome.runtime.sendMessage({
      action: "openAndInject",
      groups: selected.map(g => g.url)
    });

    setTimeout(() => {
      postBtn.disabled = false;
      status.textContent = "Tabs opened. Review and click Post in each one.";
    }, 2000);
  });

  if (!saved) {
    postBtn.disabled = false;
  }
});

document.getElementById("openDashboard").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes.userGroups) return;
  groups = Array.isArray(changes.userGroups.newValue) ? changes.userGroups.newValue : [];
  renderGroups();
});

loadVariants();
loadGroups();