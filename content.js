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
    await sleep(300);
  }
  return null;
}

async function waitForComposer(timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) {
      const composer = dialog.querySelector('[contenteditable="true"]');
      if (composer && composer.offsetParent !== null) return composer;
    }
    await sleep(300);
  }
  return null;
}

function isGroupPaused() {
  const bodyText = document.body.innerText;
  return (
    bodyText.includes("This group is paused") ||
    bodyText.includes("group has been paused") ||
    bodyText.includes("No longer accepting new posts")
  );
}

async function run() {
  console.log("Reposter: started");
  await sleep(1500);

  // Close tab if group is paused
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
  await sleep(1200);

  const composer = await waitForComposer();
  if (!composer) {
    console.log("Reposter: composer never appeared");
    return;
  }

  console.log("Reposter: pasting text");
  composer.click();
  composer.focus();
  await sleep(200);

  const dataTransfer = new DataTransfer();
  dataTransfer.setData('text/plain', postText);
  composer.dispatchEvent(new ClipboardEvent('paste', {
    clipboardData: dataTransfer,
    bubbles: true,
    cancelable: true
  }));

  console.log("Reposter: done!");
}

const postText = "Hey everyone! I offer tennis lessons and SAT tutoring in the Austin/DFW area. All skill levels welcome — DM me for availability! 🎾";

run();