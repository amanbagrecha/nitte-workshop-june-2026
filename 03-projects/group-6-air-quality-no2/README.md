# Group 6 — Air Quality (NO₂)

Sentinel-5P measures gases in the atmosphere from space. **NO₂** traces combustion —
traffic, ports, refineries, power plants. You'll map where it concentrates around
Mangaluru and how it changes over time.

📑 [reference sheet](reference.md) · ▶️ [`starter.js`](starter.js)

---

## 🎯 The deliverable

1. A **map** of mean NO₂ showing the industrial/port hotspot vs cleaner surroundings.
2. **One number or chart**: a trend (e.g. NO₂ over the year, or hotspot vs rural mean).
3. A **shareable output** — Get Link, App, or GeoTIFF.

---

## ▶️ Run the starter

Paste [`starter.js`](starter.js) and Run — a yearly-mean NO₂ map. The port/industrial
belt should glow warmer than the Ghats. It's one static average; your job is to make
it *say something* over time and space.

---

## ✅ Your tasks

1. **Trend it.** Chart monthly mean NO₂ over your area across a year (or several) —
   any seasonal pattern? Any rising trend?
2. **Hotspot vs background.** Compare mean NO₂ over the industrial belt vs a rural Ghats
   box. Report the ratio/difference.
3. **Tell a real story.** Compare **2019 vs 2020** (the COVID lockdown dip is a famous,
   publishable signal) — did NO₂ fall?
4. **Ship it** — export, or an app with a year/month selector.

---

## 💡 Hints (not the code)

- The band is `tropospheric_NO2_column_number_density` (units **mol/m²** — tiny numbers,
  ~1e-5 to 2e-4).
- Time chart: `ui.Chart.image.series(collection, region, ee.Reducer.mean(), scale)`.
- Two-region compare: `ui.Chart.image.seriesByRegion`, or two `reduceRegion` calls.
- Use `L3_NO2` (offline, cleaner) for analysis; values vary day-to-day, so **average**.
- COVID comparison = two `filterDate` windows, `.mean()` each, `.subtract()`.

---

## 🤖 Ask the AI well

> "In the GEE **JavaScript** Code Editor, using `COPERNICUS/S5P/OFFL/L3_NO2` band
> `tropospheric_NO2_column_number_density`, show me only the lines to chart monthly
> mean NO₂ over my `aoi` for 2024. Don't rewrite my script."

**Verify:** confirm the exact band name on the
[S5P NO₂ catalog page](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_OFFL_L3_NO2)
— AIs often shorten it wrongly. Check your `min`/`max` against real values with the Inspector.

---

## 🚀 Stretch goals

- Swap in other S5P gases: **CO**, **SO₂**, **O₃**, or the **Aerosol Index** (AER_AI).
- Weekday vs weekend NO₂ (traffic signal).
- Overlay night lights (Group 7) — does brightness predict NO₂?

---

## ⚠️ Watch out for

- **Very coarse pixels (~7 km).** Mangaluru is only a few pixels — don't claim
  street-level detail.
- Clouds and retrieval gaps make single days patchy; always average over time.
- It's a *column density* (whole air column), not ground-level concentration — caveat it.
