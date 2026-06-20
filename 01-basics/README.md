# Part 1 — Morning: GEE Basics

Eight tiny steps. **One idea each.** Read the line, run the snippet, move on. By
step 8 you've touched every skill the afternoon projects need.

| Step | Topic | Dataset shown | Snippet |
|------|-------|---------------|---------|
| [1](01-data-catalog.md) | Load data from the catalog | SRTM elevation | [`01_catalog.js`](snippets/01_catalog.js) |
| [2](02-visualize.md) | Visualise an image | VIIRS night lights | [`02_visualize.js`](snippets/02_visualize.js) |
| [3](03-vectors-aoi.md) | Vectors & your study area | FAO district boundaries | [`03_vectors_aoi.js`](snippets/03_vectors_aoi.js) |
| [4](04-collections-filter.md) | Filter an image collection | Sentinel-2 | [`04_collections_filter.js`](snippets/04_collections_filter.js) |
| [5](05-composite-colour.md) | Composite & true/false colour | Sentinel-2 | [`05_composite_colour.js`](snippets/05_composite_colour.js) |
| [6](06-band-math.md) | Band math (NDVI) | Sentinel-2 | [`06_band_math.js`](snippets/06_band_math.js) |
| [7](07-mask-measure.md) | Mask & measure | Sentinel-2 | [`07_mask_measure.js`](snippets/07_mask_measure.js) |
| [8](08-export-share.md) | Export & share | (your result) | [`08_export_share.js`](snippets/08_export_share.js) |

Keep the **[cheatsheet](cheatsheet.md)** open in a tab.

**One rule to avoid confusion:** anything starting with `ee.` lives on Google's
servers — talk to it with *methods* (`.add`, `.gt`, `.filterDate`), not plain `+`
or `>`. It's a *recipe* until you `print`, `Map.addLayer`, or `Export` it.

→ Start: [Step 1 — Load data from the catalog](01-data-catalog.md)
