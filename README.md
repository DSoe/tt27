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

Open `tt27.html` in any browser. No server, no build, works offline. Birth-time is
required for a reliable Lagna.

## Note

The TT27 formula uses only Moon and Lagna positions. Planet-specific nuances
(e.g. an Atmakaraka in a given nakshatra) are outside its scope.
