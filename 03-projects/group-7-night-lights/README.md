# Group 7 — Night Lights & Urbanisation

Satellites photograph Earth at night. Brighter, spreading lights track urban growth,
new roads, and electrification. You'll measure how Mangaluru–Udupi lit up over a decade.

📑 [reference sheet](reference.md) · ▶️ [`starter.js`](starter.js)

---

## 🎯 The deliverable

1. A **map** of where night lights *grew* between two years.
2. **One number**: the rise in **total radiance** (sum of lights), or the growth in
   **lit area** (km²).
3. A **shareable output** — Get Link, App, or GeoTIFF.

---

## ▶️ Run the starter

Paste [`starter.js`](starter.js) and Run — a red/blue map of brightening (2014→2023).
Red = brighter now. It's just a difference image; your job is to **measure** the
growth and chart the trend.

---

## ✅ Your tasks

1. **Sum of Lights (SoL).** For each year, sum `avg_rad` over your area — the standard
   proxy for total economic/urban activity. Chart it year by year.
2. **Lit-area growth.** Define "lit" (e.g. `avg_rad > 1`), make the mask for 2014 and
   2023, and measure the **km²** increase.
3. **Where did it grow?** Map the new-lit pixels (lit in 2023, dark in 2014).
4. **Ship it** — export, or an app with a year slider.

---

## 💡 Hints (not the code)

- Band is `avg_rad` (monthly product `NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG`, from 2014).
- Sum: `reduceRegion` with `ee.Reducer.sum()` on `avg_rad` (no `pixelArea` needed for SoL).
- Lit area: `avg_rad.gt(1).selfMask()` → `pixelArea()` → `reduceRegion(sum)` (basics Step 7).
- New-lit: `lit2023.and(lit2014.not())`.
- Trend chart: build a `FeatureCollection` of yearly sums (loop a year list, like the
  demo's monthly chart) and `ui.Chart.feature.byFeature`.

---

## 🤖 Ask the AI well

> "In the GEE **JavaScript** Code Editor, using `NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG`
> band `avg_rad`, show me only the lines to compute the yearly Sum of Lights over my
> `aoi` for 2014–2023 and chart it. Don't rewrite my script."

**Verify:** confirm the dataset ID and that the band is `avg_rad` (not `DNB`) on the
catalog page. Negative/zero values exist (background) — check whether the AI handled them.

---

## 🚀 Stretch goals

- Correlate brightening with built-up growth (ESA WorldCover, or Group 4's classification).
- Compare lit-area growth vs NO₂ (Group 6) or LST (Group 1) — does growth come with heat/pollution?
- Use the **annual** VIIRS product for a cleaner long series.

---

## ⚠️ Watch out for

- **Blooming:** bright lights spill over; lit area is fuzzy — don't over-read edges.
- The monthly product has noise/stray light; **median over a year** or mask negatives.
- Lights ≠ population directly — they track *activity/electrification*, so phrase claims carefully.
