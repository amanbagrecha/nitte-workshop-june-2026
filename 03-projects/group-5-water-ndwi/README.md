# Group 5 — Water Body Extraction (NDWI)

The Linganamakki reservoir swells after the monsoon and shrinks through summer. Map
that surface water with **NDWI** and turn it into a story about water security.

[reference sheet](reference.md) · [`starter.js`](starter.js)

> This is the *same technique family* as the NDVI demo (a normalised-difference index
> + threshold), but nobody built it live — so it's all yours.

---

## The deliverable

1. A **map** of the reservoir's water at two times (e.g. driest vs fullest).
2. **One number**: how much the water area (km²) **changed** between them.
3. A **shareable output** — Get Link, App, or GeoTIFF.

---

## Run the starter

Paste [`starter.js`](starter.js) and Run — the post-monsoon reservoir in blue. It's a
single snapshot with no measurement. The project is making it **seasonal and quantified**.

---

## Your tasks

1. **Add the dry season.** Make a second composite for **April–May** (lowest water) and
   map it too. The shrinkage should be obvious.
2. **Measure both.** Water area in km² for each season → report the difference.
3. **Clean it up.** Cloud shadow fakes water — add the demo's SCL cloud mask. Try
   **MNDWI** (`B3`,`B11`) and see if it's cleaner than NDWI.
4. **Tell the year's story.** Chart water area month-by-month (like the demo's chart)
   to show the fill–draw cycle.
5. **Ship it** — export, or an app with a month slider.

---

## Hints (not the code)

- `normalizedDifference(['B3','B8'])` = NDWI; `['B3','B11']` = MNDWI (better vs built-up).
- Threshold ≈ **0** for water; tune it with the **Inspector** on a known shoreline.
- Area = `gt(0)` → `selfMask()` → `pixelArea()` → `reduceRegion(sum)` (basics Step 7).
- Monthly loop / chart: reuse the structure from `02-demo-ndvi` (swap NDVI → NDWI).
- Reality check: compare your max extent to JRC `JRC/GSW1_4/GlobalSurfaceWater`.

---

## Ask the AI well

> "In the GEE **JavaScript** Code Editor I have a Sentinel-2 composite. Show me only
> the lines to compute MNDWI from `B3` and `B11`, threshold to a water mask, and
> measure the water area in km² over my `aoi`. Don't rewrite my script."

**Verify:** `normalizedDifference(['B3','B11'])` outputs a band called `nd` unless you
`rename` it — make sure your `reduceRegion` reads the right key. Run it; click a known
water vs land pixel with the Inspector.

---

## Stretch goals

- **Multi-year drought:** compare a normal year vs a drought year (e.g. 2023) — was the
  reservoir lower?
- Shoreline change: outline water extent for several dates on one map.
- Estimate days of low storage by counting months below a chosen area.

---

## Watch out for

- **Cloud shadows read as water** — mask clouds or you'll over-count.
- Terrain shadow in the Ghats can also mimic water; check suspicious dark patches.
- NDWI (B3,B8) flags wet built-up too; MNDWI (B3,B11) is usually cleaner near towns.
