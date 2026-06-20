# Group 2 — Vegetation Health (NDVI), Western Ghats

You saw NDVI in the live demo. Your job is the **harder twist**: don't just map
greenness *once* — show how it **changes** between seasons or years, and quantify it.

📑 [reference sheet](reference.md) · ▶️ [`starter.js`](starter.js) ·
🧱 builds on [`../../02-demo-ndvi/`](../../02-demo-ndvi/)

---

## 🎯 The deliverable

1. A **map** of NDVI *change* (greening vs browning) over your area.
2. **One number**: the area (km²) that **lost** vegetation (or the crop-season NDVI swing).
3. A **shareable output** — Get Link, App, or GeoTIFF.

Pick **one** angle:
- **Years:** 2019 vs 2024 — has the forest/farm changed? (starter does this)
- **Seasons:** a *crop calendar* — kharif (post-monsoon) vs rabi vs summer over Udupi farmland.
- **Two places:** evergreen Western Ghats (steady NDVI) vs Udupi paddy (big seasonal swing) on one chart.

---

## ▶️ Run the starter

Paste [`starter.js`](starter.js) and Run — a red/green map of NDVI change 2019→2024.
Green = gained vegetation, red = lost. That's your starting point; it has no number
and no cloud-season control yet.

---

## ✅ Your tasks

1. **Quantify the browning.** Threshold the change (e.g. `dNDVI < -0.1`), mask, and
   measure the area in km².
2. **Control the season.** A full-year median hides crop cycles — restrict to specific
   months so you compare like with like.
3. **Add a chart.** Mean NDVI over time (the demo's `ui.Chart.image.series`) for your
   area — or two areas on the same chart.
4. **Explain a hotspot.** Use the **Inspector** + true-colour to check: is a red patch
   real change (a cleared plot) or just cloud/season noise?
5. **Ship it** — export the change map, or an app with a year slider.

---

## 💡 Hints (not the code)

- The starter's `yearNDVI(y)` already makes a clean yearly NDVI — call it twice with
  different years/seasons and `.subtract()`.
- Season control = tighter `filterDate`, or filter by month with
  `ee.Filter.calendarRange(startMonth, endMonth, 'month')`.
- Area of change = threshold → `selfMask()` → `pixelArea()` → `reduceRegion(sum)` (basics Step 7).
- Two-area chart: make a `FeatureCollection` of your regions and use
  `ui.Chart.image.seriesByRegion`.

---

## 🤖 Ask the AI well

> "In the GEE **JavaScript** Code Editor I have two NDVI images (`ee.Image`, band
> `NDVI`) for 2019 and 2024. Show me only the lines to flag pixels that dropped more
> than 0.1 and measure that area in km². Don't rewrite my script."

**Verify:** does the AI's band name match yours (`NDVI` vs `nd`)? Run it; use the
Inspector on a known cleared patch vs untouched forest — do the numbers make sense?

---

## 🚀 Stretch goals

- A proper **crop calendar**: monthly NDVI curve for one paddy field — spot sowing/harvest.
- Mask to *farmland only* using ESA WorldCover class `40` (cropland) before charting.
- Detect deforestation: largest contiguous browning patches (`connectedPixelCount`).

---

## ⚠️ Watch out for

- **Clouds masquerade as browning.** A bad composite in one year fakes "loss" — always
  sanity-check against true colour.
- Compare the **same season** across years, or you're just measuring monsoon vs summer.
- NDVI saturates over very dense forest — small changes there are hard to see.
