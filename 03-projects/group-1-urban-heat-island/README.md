# Group 1 — Urban Heat Island, Mangaluru

Built-up land soaks up sun and re-radiates it: city cores run hotter than their
green, watery surroundings. You'll map that temperature gap over Mangaluru from
Landsat's thermal band.

📑 One-page [reference sheet](reference.md) · ▶️ [`starter.js`](starter.js)

---

## 🎯 The deliverable

By end of day, hand in:

1. A **map** of Mangaluru's land surface temperature (LST) where the built-up core
   is visibly hotter than vegetation/water.
2. **One number**: how many **°C hotter** the built-up area is than the green area.
3. A **shareable output** — a *Get Link* URL, a published **App**, or a GeoTIFF in QGIS.

---

## ▶️ Run the starter

Paste [`starter.js`](starter.js) and Run. You should get a blue→red heat map of
Mangaluru. That proves your area, the Landsat dataset, and the °C conversion all
work. **It is deliberately incomplete** — no cloud masking, no comparison, no number.
That's your job.

---

## ✅ Your tasks

1. **Mask clouds properly.** The starter only drops *very cloudy scenes*; individual
   cloud pixels still sneak through and read as cold spots. Mask them per-pixel.
2. **Use more images.** Merge Landsat 8 **and** 9 so the composite is cleaner.
3. **Bring in vegetation.** Compute NDVI from the *same* Landsat image. Hot ↔ low NDVI
   is the heart of the story — show they move opposite.
4. **Define the "island".** Pick a rule for *hot zones* (e.g. above a high percentile,
   or above the area's mean) and draw them as a mask.
5. **Get the number.** Split the area into "built-up" vs "green" and compute mean LST
   in each. Report the **difference in °C** — that single number *is* your finding.
6. **Ship it.** Export the LST GeoTIFF for QGIS, or wrap it in an app.

---

## 💡 Hints (not the code)

- **Cloud mask:** Landsat C2 L2 carries a `QA_PIXEL` band. The cloud / cloud-shadow
  flags are individual *bits* — look up `bitwiseAnd` and `updateMask`. (Verify the bit
  numbers, see below.)
- **NDVI on Landsat:** the bands are named differently from Sentinel-2 — NIR is
  `SR_B5`, red is `SR_B4`. Same `normalizedDifference` trick. Optical bands need their
  own scale/offset (see reference sheet).
- **Built-up vs green split:** easiest path is NDVI itself (low NDVI ≈ built/bare, high
  NDVI ≈ vegetation). A cleaner path is the ESA **WorldCover** layer (`ESA/WorldCover/v200`,
  built-up = class `50`). Either is fine.
- **The number:** `reduceRegion` with `ee.Reducer.mean()` over each class. Subtract.
- **Hot-zone area:** threshold → `selfMask()` → `multiply(ee.Image.pixelArea())` →
  `reduceRegion(sum)` (same move as basics Step 7).
- **A nice extra:** `ui.Chart.image.byClass` or a scatter of LST vs NDVI shows the
  cooling effect of greenery in one picture.

You already used *every* one of these moves in the morning — this is reassembly, not new magic.

---

## 🤖 Ask the AI well

Good prompts name the **platform**, the **exact dataset**, and **one small step**:

> "In the Google Earth Engine **JavaScript** Code Editor, I have a `LANDSAT/LC09/C02/T1_L2`
> image. Show me only the few lines to mask clouds and cloud shadows using the
> `QA_PIXEL` band with `bitwiseAnd`. Don't rewrite my whole script."

> "Give me the lines to compute NDVI from a Landsat Collection-2 Level-2 image using
> `SR_B5` and `SR_B4`, including the correct scale and offset for the surface
> reflectance bands."

**Then verify — AIs invent Landsat details constantly:**

- Open the [LANDSAT/LC09/C02/T1_L2 catalog page](https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC09_C02_T1_L2)
  and confirm: is `ST_B10`'s scale really `0.00341802` and offset `149.0`? Which
  `QA_PIXEL` bit is "cloud"?
- Paste the AI's lines, press Run. Red error = not done.
- Use the **Inspector**: click a pixel you *know* is a rooftop vs a park — does the
  rooftop read hotter? If not, something's wrong.

> If you can't explain why a line is there, ask the AI to *explain* it, then decide
> whether you believe it.

---

## 🚀 Stretch goals

- **Then vs now:** compare a pre-monsoon composite from ~2014 (Landsat 8) with 2024.
  Did the hot area grow as the city did? (Tie-in with Group 7, night lights.)
- **Split-panel app:** LST on one side, true colour on the other, linked pan/zoom.
- **Per-ward stats:** load a boundary and rank neighbourhoods by mean LST.

---

## ⚠️ Watch out for

- **LST ≠ air temperature.** It's the *surface* (rooftops, roads) — say so in your writeup.
- Thermal data is coarse (~100 m, resampled to 30 m). Don't over-interpret tiny features.
- Pick the **dry pre-monsoon** window — monsoon cloud will leave you almost no pixels.
