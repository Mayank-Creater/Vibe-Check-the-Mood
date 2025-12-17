# Vibe Check — Call Vibe Overlay

Chrome Extension that detects when you're on a video call and overlays a live "vibe" card on the page. It reuses the project's React components and `useVibeDetection` hook (face-api.js with graceful simulation fallback).

## Build the extension

```bash
npm install
npm run build:extension
```

This outputs the unpacked extension into `dist-extension/` (including `manifest.json`, `contentScript.js`, and `style.css`).

## Load in Chrome

1. Open `chrome://extensions`.
2. Toggle on Developer Mode.
3. Click "Load unpacked" and select the `dist-extension/` folder.
4. Visit a video call (e.g., Google Meet, Zoom, Teams). A vibe card appears at bottom-right. Use the top-right button to toggle on/off.

## Notes

- Models are loaded from a CDN; if blocked, detection falls back to Simulation Mode automatically.
- The overlay analyzes the largest visible `<video>` element on the page when present.
- You can continue to run the original app locally via `npm run dev` if desired; it remains unchanged.
