# TT27 — Triple Tara + 27 Marker Filter

သုံးထပ်တာရာ ၂၇ နက္ခတ် စစ်ထုတ်စနစ်

A single-file, offline web app for nakshatra selection using a three-layer system:

| Layer | Start point | Output |
| --- | --- | --- |
| Moon Navatara | Moon Nakshatra | Emotional / luck suitability |
| Lagna Navatara | Lagna Nakshatra | Physical / action suitability |
| 27 Special Marker | Moon Nakshatra | Purpose-specific karmic role |

**Final Score = Moon Navatara Score + Lagna Navatara Score + TT27 Special Bonus**

## Features

- Pick Moon and Lagna nakshatra; instantly builds the full 27-row scored table.
- Color-coded classification (Excellent / Good / Usable / Neutral / Avoid), sortable columns.
- Tactical "Best Use" wording — a low score means *use for repair/closure*, not *never*.
- Offline birth-data calculator: enter date, local time, and place to compute the
  sidereal Moon and Lagna nakshatra (Lahiri ayanamsa). Lunar longitude via a truncated
  Meeus series, Ascendant via sidereal-time geometry. Verified against pyswisseph to ~0.01°.
- Save / Print to PDF with a clean print layout.

## Usage

Open `index.html` in any browser. No server, no build, works offline. Birth-time is
required for a reliable Lagna.

## Install as an app (PWA)

TT27 is a Progressive Web App. To install it on your device:

1. Serve the folder over `http(s)://` (a service worker can't run from `file://`).
   For local testing: `python3 -m http.server 8000` and visit
   `http://localhost:8000/`.
2. **Mobile (Chrome / Edge / Safari):** open the page → menu → *Add to Home Screen*.
3. **Desktop (Chrome / Edge):** click the install icon in the address bar.

Once installed it launches in its own window, offline, with a TT27 icon.

### Files

| File | Purpose |
| --- | --- |
| `index.html` | The app (UI + nakshatra logic + Meeus moon math). |
| `manifest.json` | PWA metadata (name, icon, theme color). |
| `sw.js` | Service worker — caches assets for offline use. |
| `icon.svg` | App icon. Replace with your own PNGs if you prefer. |
| `LICENSE` | CC BY-NC 4.0. |

When you change `index.html`, bump `CACHE_VERSION` in `sw.js` so installed
clients pick up the new version. (The GitHub Pages workflow does this
automatically using the commit SHA — see below.)

## Public deployment (GitHub Pages)

This repo ships with `.github/workflows/deploy.yml`, which publishes TT27
to GitHub Pages on every push to `main`.

One-time setup:

1. Push the repo to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source =
   "GitHub Actions"**.
3. Push to `main` (or run the workflow manually from the *Actions* tab).

The workflow:

- Copies `index.html`, `manifest.json`, `icon.svg`, `sw.js`, `LICENSE`,
  `README.md` into the published site.
- Rewrites `CACHE_VERSION` in `sw.js` to `tt27-<short-sha>` so installed
  PWAs auto-update on each release.
- Adds `.nojekyll` to disable Jekyll processing.

Custom domain: add a `CNAME` file at the repo root containing your
domain, then configure DNS per GitHub's Pages docs.

## Note

The TT27 formula uses only Moon and Lagna positions. Planet-specific nuances
(e.g. an Atmakaraka in a given nakshatra) are outside its scope.

## License

Copyright (c) 2026 **DSoe**.

Licensed under [Creative Commons Attribution-NonCommercial 4.0 International
(CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).
You may share and adapt this work for non-commercial purposes with attribution.
See [`LICENSE`](./LICENSE) for full terms.
