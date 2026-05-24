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

Facebook's composer runs on [Lexical](https://lexical.dev/), Meta's rich text editor. Setting `element.value` directly does not work because Lexical manages its own state separately from the DOM.

Fix: simulate a paste event via `ClipboardEvent` + `DataTransfer`. Lexical processes paste events through its own state manager, so the text registers correctly and the Post button activates.

```js
const dataTransfer = new DataTransfer();
dataTransfer.setData('text/plain', postText);
composer.dispatchEvent(new ClipboardEvent('paste', {
  clipboardData: dataTransfer,
  bubbles: true,
  cancelable: true
}));
```

## Stack

- Vanilla JS, Chrome Extensions Manifest V3
- Chrome APIs: `tabs`, `scripting`, `storage`, `alarms`, `notifications`

## Install

1. Clone the repo
2. Go to `chrome://extensions` in Chrome
3. Enable Developer mode
4. Click Load unpacked and select the `chrome-extension` folder

To use with your own groups, update `GROUPS` in `popup.js` and `postText` in `content.js`.

## Roadmap

- [ ] Copy variants to avoid spam detection
- [ ] Web dashboard (Next.js + Supabase) for managing groups and post text
- [ ] Nextdoor and Craigslist support