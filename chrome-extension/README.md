# Reposter

Chrome extension that pre-fills Facebook Group post composers so you just click Post.

Built because Facebook Groups have no native scheduling and I was manually reposting the same tutoring ad to 5 groups every week.

## How it works

1. Click the extension icon, select your groups, hit Post
2. Extension opens each group, finds the composer, and pastes your text
3. You review and click Post in each tab
4. Paused or restricted groups are detected and closed automatically

Weekly reminder notification keeps you on schedule.

## The interesting part

Facebook's composer runs on [Lexical](https://lexical.dev/), Meta's rich text editor. Setting `element.value` directly does not work because Lexical manages its own state separately from the DOM, and standard DOM events like `ClipboardEvent` are intercepted and ignored.

Fix: use Chrome's debugger API to simulate keyboard input at the protocol level, bypassing Lexical's event filtering entirely.

```js
chrome.debugger.attach({ tabId }, "1.3", () => {
  chrome.debugger.sendCommand({ tabId }, "Input.insertText", { text }, () => {
    chrome.debugger.detach({ tabId });
  });
});
```

## Stack

- Vanilla JS, Chrome Extensions Manifest V3
- Chrome APIs: `tabs`, `scripting`, `storage`, `alarms`, `notifications`, `debugger`
- Supabase Auth + Postgres for user accounts and plan management
- Stripe for payments

## Install

1. Clone the repo
2. Go to `chrome://extensions` in Chrome
3. Enable Developer mode
4. Click Load unpacked and select the `chrome-extension` folder

## Roadmap

- [ ] Copy variants to avoid spam detection
- [ ] Nextdoor and Craigslist support