# Part 3 — Afternoon: Your Group Project

This is the part where **you** drive. Each group picks one theme and builds it in
the same spirit as the morning demo. We (instructors) will circulate and nudge —
but the goal is for *your group* to make it work.

> 🧭 **You are not starting from zero, and you are not getting the answer.**
> Each theme below comes with: a **working starter** (gets a first result on screen),
> a clear **deliverable**, a **task checklist**, **hints** (not full code), good
> **questions to ask an AI assistant**, and **stretch goals**. The middle — turning
> the starter into the deliverable — is yours to figure out.

---

## The themes

| # | Theme | Place (coastal Karnataka) | Core idea | Status |
|---|-------|---------------------------|-----------|--------|
| 1 | **Urban Heat Island** | Mangaluru city | Landsat surface temperature (LST) | ✅ [ready](group-1-urban-heat-island/) |
| 2 | **Vegetation Health (NDVI)** | Western Ghats vs Udupi crops | _Builds on the live demo_ → harder twist: a **multi-year / crop-calendar** comparison | ✅ [ready](group-2-vegetation-ndvi/) |
| 3 | **Flood Inundation** | Netravati river (or Kerala 2018) | Sentinel-1 SAR before/after | ✅ [ready](group-3-flood-sar/) |
| 4 | **Land Use / Land Cover** | Mangaluru–Udupi belt | Supervised classification | ✅ [ready](group-4-lulc-classification/) |
| 5 | **Water Body Extraction (NDWI)** | Linganamakki reservoir | Seasonal surface water from NDWI | ✅ [ready](group-5-water-ndwi/) |
| 6 | **Air Quality (NO₂)** | Mangaluru industrial belt | Sentinel-5P trends | ✅ [ready](group-6-air-quality-no2/) |
| 7 | **Night Lights & Urbanisation** | Mangaluru–Udupi over 2012→2023 | VIIRS DNB growth | ✅ [ready](group-7-night-lights/) |

Each theme will live in its own folder (`group-1-urban-heat-island/`, etc.) with a
`README.md`, a `starter.js`, and a one-page `reference.md`.

> Theme 2 (NDVI) is the one we built live in the demo, so that group gets a harder
> twist — comparing seasons/years or a crop calendar — instead of repeating it.
> Everyone else starts fresh.

---

## How every group pack is structured

So you know what to expect, each theme's `README.md` follows the same shape:

1. **🎯 The deliverable** — exactly what "done" looks like (a map + a number + a shareable output).
2. **▶️ Run the starter** — paste `starter.js`, press Run, confirm you get *a* result. This proves your area + data + access all work.
3. **✅ Your tasks** — a checklist that takes the starter to the deliverable.
4. **💡 Hints** — the concepts and function *names* you'll need (e.g. "you'll want
   `reduceRegion` here"), but not the assembled code.
5. **🤖 Ask the AI well** — copy-paste-ready prompts to get unstuck, **plus how to
   check the AI didn't make something up** (see below — this matters a lot in GEE).
6. **🚀 Stretch goals** — if you finish early.
7. **📑 reference.md** — the dataset IDs, bands, and key functions for *this* theme on one page.

---

## 🤖 Using an AI assistant (the honest guide)

AI assistants (ChatGPT, Gemini, Claude...) are genuinely useful for Earth Engine —
**but they hallucinate GEE specifics constantly.** They will confidently invent
dataset IDs, band names, and methods that don't exist. Treat the AI as a *fast,
slightly unreliable senior student*, not an oracle.

**Good prompting pattern:**

> "I'm using the Google Earth Engine **JavaScript** Code Editor. I have an
> `ee.ImageCollection` of Sentinel-2 (`COPERNICUS/S2_SR_HARMONIZED`) filtered to my
> area. I want to compute NDWI and keep only pixels where NDWI > 0. Show me the few
> lines for that step only, using `normalizedDifference`. Don't rewrite my whole script."

Notice: it names the **platform** (JS, not Python), the **exact dataset**, **one
small step**, and the **method to use**. Vague prompts get vague, wrong answers.

**Always verify before trusting:**

- **Dataset / band exists?** → check the [Data Catalog](https://developers.google.com/earth-engine/datasets).
  If the AI's ID doesn't appear there, it's made up.
- **Method exists?** → search the **Docs** tab (left panel of the Code Editor).
- **Does it actually run?** → paste it, press Run. Red error = not done.
- **Does the result make sense?** → use the **Inspector** to click pixels. Is "water"
  actually on the water?

> 🧪 **Rule:** if you can't explain *why* a line is there, you're not done — ask the
> AI to *explain* it, then decide if you believe it. The point of today is that
> **you** understand the pipeline, with the AI as a helper, not a substitute.

---

## What to hand in at the end of the day

- A **map** with your result layer(s).
- One **number or chart** that quantifies it (area in km², a temperature, a trend).
- A **shareable output**: either a **Get Link** URL, a published **App**, or a
  **GeoTIFF** exported for QGIS.
- 3 sentences: *what you found, where, and one caveat* (e.g. "clouds limited us to
  the dry season").

---

*All seven theme folders are ready — open yours (`group-N-.../`) and go: read the
`README.md`, run `starter.js`, then work the tasks with the `reference.md` beside you.*
