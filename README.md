# Reposter

Reposter is a Chrome extension that helps local businesses and service providers share their message across relevant Facebook groups without repeating the same copy-and-paste workflow.

It opens selected groups, finds Facebook's post composer, and pre-fills the chosen message. The user reviews each post and clicks **Post**, keeping the final publishing decision in their hands.

[Add Reposter to Chrome](https://chromewebstore.google.com/detail/reposter/klcefljmljgkojnjffjhpbmocnjdphlp) | [Visit the product site](https://noorps.github.io/reposter) | [Read the privacy policy](https://noorps.github.io/reposter/privacy.html)

## The problem

Tutors, photographers, real estate agents, cleaners, coaches, and other local service providers often rely on niche Facebook groups to reach nearby customers. Posting consistently means opening the same groups, finding each composer, and pasting the same message again and again.

Reposter handles that repetitive setup while leaving every final post under the user's control.

## Features

- Save multiple message variants for different services or audiences
- Organize and select frequently used Facebook groups
- Search for niche communities by keyword, location, or interest
- Get group recommendations based on business type and location
- Open selected groups and pre-fill each post composer
- Detect and skip paused or restricted groups
- Schedule a weekly reminder to stay consistent
- Use up to four saved groups on the free plan

## How it works

1. Save a message in the Reposter dashboard.
2. Add Facebook groups manually or discover new ones through search and recommendations.
3. Select the groups you want to reach.
4. Start a posting session.
5. Reposter opens each group and pre-fills the composer.
6. Review the content and click **Post** yourself.

Reposter does not publish posts automatically.

## Technical highlights

Facebook's composer is built with Lexical and does not reliably respond to standard DOM value assignment. Reposter uses Chrome's debugger API to simulate keyboard input at the moment text is inserted. The debugger detaches immediately afterward.

The extension is built with:

- JavaScript, HTML, and CSS
- Chrome Extension Manifest V3
- Chrome storage, tabs, scripting, alarms, notifications, and debugger APIs
- Supabase authentication and profile storage
- GitHub Pages for the product site and privacy policy

## Project structure

```text
.
├── chrome-extension/
│   ├── manifest.json
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── auth.js
│   └── supabase-config.js
├── index.html
└── privacy.html
```

## Install

### Chrome Web Store

Install the published extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/reposter/klcefljmljgkojnjffjhpbmocnjdphlp).

After installation, click the Reposter icon in the Chrome toolbar to open the dashboard.

### Local development

1. Clone this repository.

   ```bash
   git clone https://github.com/noorps/reposter.git
   ```

2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `chrome-extension` directory.
6. Open the extension from the Chrome toolbar.

A valid Supabase configuration is required for account authentication.

## Permissions

Reposter requests only the Chrome permissions needed for its core workflow:

- `tabs` to open selected Facebook group pages
- `scripting` to interact with the page
- `storage` to save groups, messages, settings, and session data locally
- `alarms` and `notifications` for weekly reminders
- `debugger` to simulate text input in Facebook's Lexical composer
- Access to `facebook.com` pages where the extension operates

The debugger permission is used only while inserting text and is detached immediately afterward.

## Privacy

Reposter does not store Facebook credentials or publish without user confirmation.

Saved messages, group selections, reminder settings, and session information are stored in Chrome's local extension storage. Supabase stores account and profile information used for authentication and personalized recommendations.

For full details, read the [privacy policy](https://noorps.github.io/reposter/privacy.html).

## Responsible use

Users are responsible for following Facebook's rules and the rules of each group they join. Reposter is intended to reduce repetitive work, not to enable spam or bypass moderation.

## Support

For questions, feedback, or account deletion requests, contact [reposterfaq@gmail.com](mailto:reposterfaq@gmail.com).

## Author

Built by [Purnoor Sharma](https://github.com/noorps).
