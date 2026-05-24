async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForButton(text, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const buttons = document.querySelectorAll('[role="button"]');
    for (const btn of buttons) {
      if (btn.textContent.trim() === text) return btn;
    }
    await sleep(150);
  }
  return null;
}

async function waitForComposer(timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const dialog = [...document.querySelectorAll('[role="dialog"]')]
      .find(el => el.innerText.includes("Create post")) ||
      document.querySelector('[role="dialog"]');

    if (dialog) {
      const composers = [...dialog.querySelectorAll('[contenteditable="true"]')]
        .filter(isVisible);
      const composer =
        composers.find(el => /create a public post/i.test(getComposerLabel(el))) ||
        composers.find(el => /what do you want to talk about|write something/i.test(getComposerLabel(el))) ||
        composers.find(el => el.getAttribute("role") === "textbox") ||
        composers[0];
      if (composer && composer.offsetParent !== null) return composer;
    }
    await sleep(150);
  }
  return null;
}

function getComposerLabel(el) {
  return [
    el.getAttribute("aria-placeholder"),
    el.getAttribute("aria-label"),
    el.getAttribute("placeholder"),
    el.innerText,
    el.textContent
  ].filter(Boolean).join(" ");
}

function isVisible(el) {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.visibility !== "hidden" &&
    style.display !== "none"
  );
}

function requestDebuggerTyping(text, timeout = 10000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve({ ok: false, error: "Timed out waiting for debugger typing" });
    }, timeout);

    chrome.runtime.sendMessage({ action: "typeText", text }, (response) => {
      clearTimeout(timer);
      resolve(response || { ok: false, error: chrome.runtime.lastError?.message || "No typing response" });
    });
  });
}

async function focusComposer(composer) {
  composer.scrollIntoView({ block: "center", inline: "nearest" });

  const rect = composer.getBoundingClientRect();
  const x = rect.left + Math.min(24, rect.width / 2);
  const y = rect.top + Math.min(24, rect.height / 2);
  const target = document.elementFromPoint(x, y) || composer;

  target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, clientX: x, clientY: y }));
  target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, clientX: x, clientY: y }));
  target.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, clientX: x, clientY: y }));
  composer.focus();
  await sleep(75);

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(composer);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

async function waitForInsertedText(composer, text, timeout = 2000) {
  const start = Date.now();
  const sample = text.slice(0, 20);

  while (Date.now() - start < timeout) {
    if (composer.innerText.includes(sample)) return true;
    await sleep(100);
  }

  return false;
}

async function insertComposerText(composer, text) {
  await focusComposer(composer);

  const debuggerResult = await requestDebuggerTyping(text);
  if (debuggerResult.ok) {
    return waitForInsertedText(composer, text);
  }

  console.log("Reposter: debugger typing failed, trying DOM insertion", debuggerResult.error);

  const beforeInput = new InputEvent("beforeinput", {
    bubbles: true,
    cancelable: true,
    composed: true,
    inputType: "insertText",
    data: text
  });
  composer.dispatchEvent(beforeInput);

  document.execCommand("insertText", false, text);

  composer.dispatchEvent(new InputEvent("input", {
    bubbles: true,
    composed: true,
    inputType: "insertText",
    data: text
  }));

  return waitForInsertedText(composer, text);
}

function isGroupPaused() {
  const bodyText = document.body.innerText;
  return (
    bodyText.includes("This group is paused") ||
    bodyText.includes("group has been paused") ||
    bodyText.includes("No longer accepting new posts")
  );
}

async function run(postText) {
  console.log("Reposter: started");
  await sleep(600);

  if (isGroupPaused()) {
    console.log("Reposter: group is paused, closing tab");
    chrome.runtime.sendMessage({ action: "closeTab" });
    return;
  }

  const placeholder = await waitForButton('Write something...');
  if (!placeholder) {
    console.log("Reposter: Write something button not found, closing tab");
    chrome.runtime.sendMessage({ action: "closeTab" });
    return;
  }

  console.log("Reposter: clicking composer");
  placeholder.click();
  await sleep(200);

  const composer = await waitForComposer();
  if (!composer) {
    console.log("Reposter: composer never appeared");
    chrome.runtime.sendMessage({ action: "postingFailed" });
    return;
  }

  console.log("Reposter: pasting text");
  const inserted = await insertComposerText(composer, postText);
  if (!inserted) {
    console.log("Reposter: text insertion did not verify");
    chrome.runtime.sendMessage({ action: "postingFailed" });
    return;
  }

  console.log("Reposter: done!");
  await sleep(100);
  chrome.runtime.sendMessage({ action: "postingDone" });
}

// Entry point — read from storage, fall back to default if nothing saved
chrome.storage.local.get(["postText"], (data) => {
  const postText = data.postText || "Hey everyone! I offer tennis lessons and SAT tutoring in the Austin/DFW area. All skill levels welcome — DM me for availability! 🎾";
  run(postText);
});
