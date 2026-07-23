<h1 align="center">𓆝 𓆟 𓆞 reposter 𓆞 𓆟 𓆝</h1>

<p align="center">
  post to the facebook groups that actually matter to your community, without doing the same copy-paste dance every week.
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/reposter/klcefljmljgkojnjffjhpbmocnjdphlp">add to chrome</a>
  ·
  <a href="https://noorps.github.io/reposter">website</a>
  ·
  <a href="https://noorps.github.io/reposter/privacy.html">privacy</a>
</p>

<p align="center">𓆝 𓆟 𓆞 𓆝</p>

## what is this?

i kept watching local businesses, tutors, photographers, real estate agents, and other service providers spend way too much time posting the same thing across facebook groups.

open a group. find the composer. paste the message. repeat. a lot.

reposter takes care of the annoying part. save your messages, pick your groups, and start a posting session. it opens each group and fills in the composer for you. you still review everything and click **post** yourself.

no mystery auto-posting. no handing over your facebook password. just fewer tabs to wrestle with.

## the fun part

facebook's post composer is built on lexical, which means the normal "find a text box and set its value" trick does not work.

reposter gets around that by using chrome's debugger api to type into the composer like a real keyboard. it attaches only while the text is being inserted, then immediately gets out of the way.

that tiny headache is basically why this project exists.

## what it can do

- save different messages for different services or audiences
- keep your regular facebook groups in one place
- search for niche communities by keyword, interest, or location
- recommend groups based on what your business does and where it is
- open selected groups and pre-fill the post composer
- skip groups that are paused or restricted
- remind you to post each week

## try it

the easiest way is through the [chrome web store](https://chromewebstore.google.com/detail/reposter/klcefljmljgkojnjffjhpbmocnjdphlp).

once it is installed, click the reposter icon in your chrome toolbar and the dashboard will walk you through the rest.

if you want to poke around locally:

```bash
git clone https://github.com/noorps/reposter.git
```

then open `chrome://extensions`, turn on developer mode, click **load unpacked**, and select the `chrome-extension` folder.

you will need your own supabase configuration for authentication.

## built with

javascript, html, css, chrome manifest v3, supabase, postgres rls, chrome storage, and a slightly stubborn facebook editor.

the main extension lives in `chrome-extension/`. the product site and privacy policy live at the repository root and are published with github pages.

## a quick privacy note

reposter does not know your facebook password and does not publish anything without you.

your messages, groups, reminders, and session details stay in chrome's local extension storage. supabase handles account authentication and the profile information used for recommendations.

the full version is in the [privacy policy](https://noorps.github.io/reposter/privacy.html).

please use reposter like a person. respect group rules, do not spam people, and make sure what you are sharing is actually useful.

<p align="center">𓆝 𓆟 𓆞 𓆝</p>

<p align="center">
  built by <a href="https://github.com/noorps">purnoor</a>
</p>
