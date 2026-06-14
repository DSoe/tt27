# TT27 — Triple Tara + 27 Marker Filter

သုံးထပ်တာရာ ၂၇ နက္ခတ် စစ်ထုတ်စနစ်

A small, offline-friendly web app for personal nakshatra timing, built on a
three-layer system:

| Layer | Start point | Output |
| --- | --- | --- |
| Moon Navatara | Moon Nakshatra | Emotional / luck suitability |
| Lagna Navatara | Lagna Nakshatra | Physical / action suitability |
| 27 Special Marker | Moon Nakshatra | Purpose-specific karmic role |

**Final Score = Moon Navatara Score + Lagna Navatara Score + TT27 Special Bonus**

The app is a React + TypeScript single-page app built with Vite. All source
lives in [`web/`](web/); that is what gets built and deployed.

## Features

- **Birth setup:** enter date, exact time, and place to compute the sidereal
  Moon, Lagna, and Venus nakshatra (Lahiri ayanamsa). Lunar longitude via a
  truncated Meeus series, Ascendant via sidereal-time geometry, Venus via
  `astronomy-engine`. Worldwide place search via the Open-Meteo geocoding API.
- **Today's verdict:** live transit Moon scored against your saved natal
  Moon/Lagna, with a custom moment picker for muhurta planning. "Today" reflects
  your *current* local context — the weekday, time, and all transits come from
  your device, and the transit Lagna uses your device's geolocation. The saved
  birth chart is the only thing tied to the selected birth city.
- **Best days:** the full 27-row scored table, color-coded by band (Excellent /
  Good / Usable / Neutral / Avoid), each row expandable for meaning and remedy.
- **Venus Wealth layer:** transit/natal Venus and Friday context add a
  restrained, Vedha-aware prosperity bonus with nakshatra-specific remedies.
- **Bilingual:** full English / Myanmar (မြန်မာ) UI.
- **Local-only by default:** natal data and language preference are stored in
  `localStorage` on your device. The one exception is worldwide place search,
  which sends the typed query to the Open-Meteo geocoding API.

## Develop

Prerequisites: Node 22+.

```sh
cd web
npm install
npm run dev      # start the Vite dev server
```

## Verify

```sh
cd web
npm run lint     # tsc -b type check
npm test         # vitest unit + component tests
npm run build    # production build into web/dist
```

## Project layout

| Path | Purpose |
| --- | --- |
| `web/src/domain/data.ts` | Bilingual nakshatra, Tara, special-position, city, and remedy content. |
| `web/src/domain/engine.ts` | Framework-independent astronomy + scoring (pure functions). |
| `web/src/App.tsx` | Onboarding, Today, Best Days, and Profile views. |
| `web/src/styles.css` | Responsive visual system. |
| `web/public/` | PWA manifest, icons, and the cache-retirement service worker. |
| `index.html` (repo root) | **Archived** original single-file prototype. Not built or deployed; kept for reference only. |

## Known limitations

- **Transit Lagna requires location permission.** The "Today" Ascendant needs a
  real latitude/longitude, so it is computed only from your device's geolocation
  — there is deliberately no birth-city fallback. If you deny location (or the
  browser has none), the Transit Lagna panel shows a "Current location required"
  notice with a retry button instead of a value. This does **not** affect the
  daily score or verdict: the TT27 score is driven by the transit Moon against
  your natal Moon and Lagna, and transit Moon/Sun/Venus are geocentric — they
  depend only on the instant, which always comes from your device clock.

## Deployment (GitHub Pages)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publishes TT27 to
GitHub Pages on every push to `main`. It installs dependencies, runs
`npm run lint` and `npm test`, builds `web/`, and uploads `web/dist`.

One-time setup:

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
3. Push to `main` (or run the workflow manually from the *Actions* tab).

Custom domain: add a `CNAME` file containing your domain and configure DNS per
GitHub's Pages docs.

## License

Copyright (c) 2026 **DSoe**.

Licensed under [Creative Commons Attribution-NonCommercial 4.0 International
(CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).
You may share and adapt this work for non-commercial purposes with attribution.
See [`LICENSE`](./LICENSE) for full terms.
