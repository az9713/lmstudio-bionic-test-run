# LM Studio Bionic — test run

A record of setting up [LM Studio Bionic](https://lmstudio.ai/docs/bionic) with a local Gemma model on Windows, verified end-to-end by a Claude Code session driving the real desktop app over the Chrome DevTools Protocol (CDP) — no manual clicking involved.

- **App:** Bionic 1.0.1
- **Model:** `google/gemma-4-e4b` (6.3GB GGUF, fully local)
- **Hardware:** RTX 3050 (4GB VRAM) laptop GPU, 32GB RAM
- **Result:** a Code project, a real prompt, a generated `fizzbuzz.py`, executed and confirmed correct

## Read the story

| | |
|---|---|
| 📘 **[Setup walkthrough](https://claude.ai/code/artifact/49ad7122-6c57-4d94-8a88-60636299224b)** | Click-by-click guide with real screenshots — follow this to set up Bionic yourself. |
| 🛰️ **[Run log: Brief to Proof](https://claude.ai/code/artifact/4f661f3d-ac70-404c-b3bf-82438eb455d8)** | How the session actually did it — tool decisions, obstacles, and the CDP/Playwright automation, phase by phase. |

Both links are hosted on claude.ai and are private to the account that published them. Local copies of the same pages ([`walkthrough.html`](walkthrough.html), [`journey.html`](journey.html)) are included in this repo — open them directly in a browser, no server required.

## What's in here

```
README.md              this file
walkthrough.html        the click-by-click setup guide (self-contained, screenshots inlined)
journey.html            the run log / case study (self-contained, screenshots inlined)
drive.js                the Playwright/CDP driver script used to automate Bionic's UI
bionic-test-project/    the Code project Bionic wrote to
  └─ fizzbuzz.py         the verified output — FizzBuzz 1–30, written by the local model
screenshots/            the 11 screenshots embedded in the two HTML pages above
```

## The driver script

`drive.js` connects to Bionic over its own Chrome DevTools Protocol port (the app is Electron/Chromium under the hood — relaunch it with `--remote-debugging-port=9222` to expose it) and gives four primitives: screenshot, click, type, and a text-based element finder. It's how every screenshot in this repo was captured and every click was made — no browser extension, no pixel-guessing.

```js
const browser = await chromium.connectOverCDP('http://localhost:9222');
const page = browser.contexts()[0].pages()[0];
await page.mouse.click(x, y);   // DOM coordinates, not screen pixels
```

## Can a Claude Artifact be pushed to GitHub?

Not directly — Artifacts published via Claude's Artifact tool live on claude.ai, not in a git remote, so there's no "push" command that reaches them. What *can* go to GitHub is the same self-contained HTML file that was used to publish it in the first place: [`walkthrough.html`](walkthrough.html) and [`journey.html`](journey.html) in this repo are exact copies of the source files behind the two links above. Committing them here version-controls the content; the claude.ai URLs and the GitHub copies are two separate hosting locations for the same page. If you want the GitHub copies live on the web too (rather than opened locally), turn on **GitHub Pages** for this repo pointing at the root — no build step needed, since both files are plain static HTML.

## Verify it yourself

```
python bionic-test-project/fizzbuzz.py
```
