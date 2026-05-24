# Auth Setup

This extension is wired for Supabase Auth, with local prototype login as a fallback while credentials are empty.

## 1. Create Supabase Project

Create a Supabase project, then copy:

- Project URL
- Public anon key

Paste them into `supabase-config.js`:

```js
const SUPABASE_CONFIG = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY",
  authRedirectUrl: "",
  requireConfiguredAuth: true
};
```

## 2. Enable Email Protection

In Supabase Auth settings:

- Require email confirmation
- Disable open signups later if using invite-only beta
- Add CAPTCHA once a backend invite flow exists

## 3. Bot Protection Plan

Do not put private invite codes or CAPTCHA secrets inside the extension. Chrome extensions can be inspected.

For beta launch, use a Supabase Edge Function or other backend endpoint that:

- Validates an invite code
- Verifies Cloudflare Turnstile
- Allows signup only after those checks pass

The current extension code handles the client-side Supabase signup/sign-in flow. The server-side gate should be added before public launch.
