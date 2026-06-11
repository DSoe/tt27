# TT27 React Web

The new React/Vite interface for TT27. The original `../index.html` remains
unchanged as the working reference implementation.

## Run locally

```sh
npm install
npm run dev
```

## Verify

```sh
npm run lint
npm test
npm run build
```

## Structure

- `src/domain/data.ts` contains bilingual nakshatra, Tara, special-position,
  city, and remedy content.
- `src/domain/engine.ts` contains framework-independent astronomy and scoring.
- `src/App.tsx` contains onboarding, Today, Best Days, and Profile workflows.
- `src/styles.css` contains the responsive visual system.

Birth data and language preferences are stored in browser `localStorage`.
