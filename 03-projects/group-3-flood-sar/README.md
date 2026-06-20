# Group 3 — Flood Inundation (Radar)

Monsoon floods hide under thick cloud — useless for optical satellites. **Radar
(Sentinel-1) sees straight through cloud**, and calm floodwater bounces the signal
away, so it shows up **dark**. You'll map a flood by comparing *before* vs *during*.

📑 [reference sheet](reference.md) · ▶️ [`starter.js`](starter.js)

---

## 🎯 The deliverable

1. A **map** of flooded land for a real event (new water that wasn't there before).
2. **One number**: flooded area in km².
3. A **shareable output** — Get Link, App, or GeoTIFF.

---

## ▶️ Run the starter

Paste [`starter.js`](starter.js) and Run — a grey SAR image where the Netravati
river reads dark. That confirms the radar data loads over your area. **There's no
flood in it yet** — the whole task is the before/after comparison.

---

## ✅ Your tasks

1. **Pick a real flood.** Find an event (e.g. the **August 2019** Karnataka monsoon
   floods, or **Kerala, August 2018**). You need a **before** window and a **during** window.
2. **Make two composites.** `before` = median VH just before the flood; `flood` = median
   VH during it. Keep the **same orbit pass** (ascending *or* descending) in both.
3. **Find the new water.** Where did backscatter *drop a lot*? Use a ratio
   (`flood`/`before`) or difference and threshold it.
4. **Remove permanent water.** Rivers/sea are dark *all the time* — subtract permanent
   water (JRC) so you keep only the *newly* flooded land.
5. **Measure & ship.** Flooded area in km²; export for QGIS.

---

## 💡 Hints (not the code)

- SAR is in **decibels (dB)**; water is roughly below **−18 to −20 dB** on VH.
- **Speckle** (radar grain) is noisy — smooth with `img.focal_median(...)` before thresholding.
- Ratio approach: `flood.divide(before)` — a big drop ≈ new water. Or `before.subtract(flood)`.
- Permanent water: `JRC/GSW1_4/GlobalSurfaceWater`, band `occurrence` (mask where occurrence
  is high), or its `seasonality`.
- Same-orbit filter: `ee.Filter.eq('orbitProperties_pass', 'DESCENDING')`.
- Area = mask → `pixelArea()` → `reduceRegion(sum)` (basics Step 7).

---

## 🤖 Ask the AI well

> "In the GEE **JavaScript** Code Editor I have two `COPERNICUS/S1_GRD` VH composites,
> `before` and `flood` (dB). Show me only the lines to flag new floodwater by ratio
> thresholding and to exclude permanent water using `JRC/GSW1_4/GlobalSurfaceWater`."

**Verify:** confirm `COPERNICUS/S1_GRD` and the `orbitProperties_pass` property on its
catalog page. Run it; toggle your flood mask over true-colour of a *known* flooded town
from news photos — does it line up?

---

## 🚀 Stretch goals

- Animate VH through a monsoon to watch water rise and recede.
- Cross-check your flood extent against a population or built-up layer: who was exposed?
- Compare VH vs VV polarisation — which separates water better here?

---

## ⚠️ Watch out for

- **Mix orbits and you get garbage** — ascending and descending look different; pick one.
- Wind-roughened water and wet soil also look dark → false positives. Be honest about it.
- Pick dates around an **actual** flood; a random monsoon week may show little.
