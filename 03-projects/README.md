# Part 3 — Afternoon: Your Group Project

Each group picks one theme and builds it in the same spirit as the morning demo.
Instructors circulate to nudge when a group is stuck, but turning the starter into a
finished result is the group's own work.

> You are not starting from zero, and you are not getting the answer. Each theme
> comes with a working starter (a first result on screen), a clear deliverable, a
> task checklist, hints (not full code), questions to ask an AI assistant, and
> stretch goals. The middle — turning the starter into the deliverable — is yours to
> figure out.

---

## The themes

| # | Theme | Place (coastal Karnataka) | Core idea |
|---|-------|---------------------------|-----------|
| 1 | [Urban Heat Island](group-1-urban-heat-island/) | Mangaluru city | Landsat surface temperature (LST) |
| 2 | [Vegetation Health (NDVI)](group-2-vegetation-ndvi/) | Western Ghats vs Udupi crops | Builds on the live demo — a multi-year / crop-calendar comparison |
| 3 | [Flood Inundation](group-3-flood-sar/) | Netravati river (or Kerala 2018) | Sentinel-1 SAR before/after |
| 4 | [Land Use / Land Cover](group-4-lulc-classification/) | Mangaluru–Udupi belt | Supervised classification |
| 5 | [Water Body Extraction (NDWI)](group-5-water-ndwi/) | Linganamakki reservoir | Seasonal surface water from NDWI |
| 6 | [Air Quality (NO₂)](group-6-air-quality-no2/) | Mangaluru industrial belt | Sentinel-5P trends |
| 7 | [Night Lights & Urbanisation](group-7-night-lights/) | Mangaluru–Udupi over 2012→2023 | VIIRS DNB growth |

Each theme lives in its own folder (`group-1-urban-heat-island/`, and so on) with a
`README.md`, a `starter.js`, and a one-page `reference.md`.

> The live demo covers NDVI, so the vegetation group (Theme 2) takes a harder twist —
> comparing seasons or years, or a crop calendar — instead of repeating it. Every
> other theme starts fresh.

---

## How every group pack is structured

Each theme's `README.md` follows the same shape:

1. **The deliverable** — exactly what "done" looks like (a map, a number, and a shareable output).
2. **Run the starter** — paste `starter.js`, press Run, and confirm it produces a result. This proves the area, data, and access all work.
3. **Your tasks** — a checklist that takes the starter to the deliverable.
4. **Hints** — the concepts and function names needed (for example, "this is where `reduceRegion` belongs"), but not the assembled code.
5. **Ask the AI well** — copy-paste-ready prompts to get unstuck, plus how to check the AI did not invent something.
6. **Stretch goals** — for groups that finish early.
7. **reference.md** — the dataset IDs, bands, and key functions for the theme on one page.

---

## Using an AI assistant

AI assistants (ChatGPT, Gemini, Claude, and others) are genuinely useful for Earth
Engine, but they hallucinate GEE specifics constantly: they will confidently invent
dataset IDs, band names, and methods that do not exist. Treat the AI as a fast but
slightly unreliable senior student, not an oracle.

A good prompt names the platform, the exact dataset, and one small step:

> "I'm using the Google Earth Engine JavaScript Code Editor. I have an
> `ee.ImageCollection` of Sentinel-2 (`COPERNICUS/S2_SR_HARMONIZED`) filtered to my
> area. I want to compute NDWI and keep only pixels where NDWI > 0. Show me the few
> lines for that step only, using `normalizedDifference`. Don't rewrite my whole script."

It names the platform (JavaScript, not Python), the exact dataset, one small step,
and the method to use. Vague prompts get vague, wrong answers.

Always verify before trusting the output:

- Dataset or band exists? Check the [Data Catalog](https://developers.google.com/earth-engine/datasets). If the ID does not appear there, it was invented.
- Method exists? Search the Docs tab in the Code Editor.
- Does it run? Paste it and press Run. A red error means it is not done.
- Does the result make sense? Use the Inspector to click pixels — is "water" actually on the water?

If a line cannot be explained, the task is not finished: ask the AI to explain it,
then decide whether to believe it. The aim is to understand the pipeline, with the AI
as a helper rather than a substitute.

---

## What to hand in at the end of the day

- A map with the result layer or layers.
- One number or chart that quantifies it (area in km², a temperature, a trend).
- A shareable output: a Get Link URL, a published App, or a GeoTIFF exported for QGIS.
- Three sentences: what was found, where, and one caveat (for example, "clouds limited the analysis to the dry season").

---

Open the group's folder, read its `README.md`, run `starter.js`, then work through
the tasks with `reference.md` open alongside.
