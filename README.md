# Vibe Check — Call Vibe Overlay

Chrome Extension that detects when you're on a video call and overlays a live "vibe" card on the page. It reuses the project's React components and `useVibeDetection` hook (face-api.js with graceful simulation fallback) and runs inside a Shadow DOM for style isolation.

## Features

- Call detection: Scans the page for the largest visible/playing `<video>` element and treats common meeting hosts (Meet, Zoom, Teams, Slack, Discord, WhatsApp Web, Whereby, Workplace, Jitsi) as call environments.
- Vibe overlay: Animated card (bottom-right by default) showing detected vibe, confidence, and status; top-right toggle to enable/disable.
- Face detection with fallback: Loads face-api.js models from CDN; if blocked, automatically switches to simulation mode.

## Build the extension

```bash
npm install
npm run build:extension
```

Outputs to `dist-extension/` with `manifest.json`, `contentScript.js`, and `style.css`.

## Load in Chrome (unpacked)

1) Open `chrome://extensions` and enable Developer Mode.
2) Load unpacked → select the `dist-extension/` folder.
3) Join a meeting (e.g., Google Meet, Zoom, Teams). The overlay appears bottom-right; use the top-right button to toggle.


## App vs. extension

- The React app still runs via `npm run dev` if you want the original experience; the extension build is separate and lives in `dist-extension/`.

## Troubleshooting

- Overlay not showing: ensure the domain is allowed and the page has a visible/playing `<video>` element; reload after changing options. The content script logs `[VibeCheck] content script mounted` in DevTools console when injected.
- CSP blocks models: the hook switches to Simulation Mode automatically.
- Styles clashing: shadow DOM isolates the overlay; make sure `style.css` is present in `dist-extension/` and that the extension was reloaded after build.
