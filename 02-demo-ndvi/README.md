# Part 2 — Live Demo: Vegetation Health with NDVI

Watch one project built blank-script → published app. This is the **template** for
your afternoon group project: same skeleton, different index.

**Area:** farmland and forest around **Udupi**. **Question:** *how green is it, how
does that change through the year, and can I put it in a map anyone can open?*

Change two lines at the top — `aoi` and the dates — and it runs anywhere, any year.

| § | Step | Skill |
|---|------|-------|
| 2.1 | Area + dates (the only knobs) | `ee.Geometry`, variables |
| 2.2 | Clean Sentinel-2 (cloud mask) | `.map()` a mask function |
| 2.3 | NDVI on every image | `normalizedDifference` |
| 2.4 | Threshold → healthy vegetation | `.gt()`, `.selfMask()` |
| 2.5 | Measure vegetated area (km²) | `pixelArea` + `reduceRegion` |
| 2.6 | Chart NDVI through the year | `ui.Chart.image.series` |
| 2.7 | Export for QGIS | `Export.image.toDrive` |
| 2.8 | Publish an app | `ui.*` + Apps button |

▶️ [`scripts/full_demo.js`](scripts/full_demo.js) · [`scripts/ndvi_app.js`](scripts/ndvi_app.js)

---

## 2.1 Area + dates

```js
var aoi   = ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50]);  // Udupi
var start = '2024-01-01';
var end   = '2024-12-31';
Map.centerObject(aoi, 10);
```

These are the **only** things students change to make the project their own.

## 2.2 Clean imagery

Clouds read as "not vegetation" and wreck NDVI. Filter to low-cloud scenes, then
mask leftover cloud pixels with Sentinel-2's **SCL** band.

```js
function maskS2(img) {
  var scl = img.select('SCL');
  var clear = scl.neq(3).and(scl.neq(8)).and(scl.neq(9)).and(scl.neq(10));
  return img.updateMask(clear).divide(10000).copyProperties(img, ['system:time_start']);
}
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
  .map(maskS2);
```

`.map(maskS2)` runs the cleaner on every image. Our first custom function: one image in, one image out.

## 2.3 NDVI

```js
function addNDVI(img) { return img.addBands(img.normalizedDifference(['B8', 'B4']).rename('NDVI')); }
var withNdvi = s2.map(addNDVI);
var ndvi = withNdvi.select('NDVI').median().clip(aoi);
Map.addLayer(ndvi, {min: 0, max: 0.8, palette: ['white', 'yellow', 'green']}, 'NDVI');
```

The same `normalizedDifference` from the morning — kept on every image so we can chart it later (2.6).

## 2.4 Threshold → healthy vegetation

```js
var veg = ndvi.gt(0.5).selfMask();
Map.addLayer(veg, {palette: ['darkgreen']}, 'Healthy vegetation');
```

## 2.5 Measure it

```js
var km2 = veg.multiply(ee.Image.pixelArea()).divide(1e6)
  .reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 20, maxPixels: 1e13});
print('Healthy vegetation km²:', km2.get('NDVI'));
```

A map is nice; a number is publishable.

## 2.6 Chart through the year

```js
print(ui.Chart.image.series(withNdvi.select('NDVI'), aoi, ee.Reducer.mean(), 200)
  .setOptions({title: 'Mean NDVI over time — Udupi', vAxis: {title: 'NDVI'}}));
```

The green-up after the June monsoon is the whole story in one line.

## 2.7 Export for QGIS

```js
Export.image.toDrive({image: ndvi, description: 'Udupi_NDVI', region: aoi, scale: 20, maxPixels: 1e13});
```

Run → **Tasks** tab → **Run** → `.tif` in Drive → drag into QGIS.

## 2.8 Publish an app

Open [`scripts/ndvi_app.js`](scripts/ndvi_app.js), **Run** it (a month slider
appears), then **Apps → New App** to get a public URL.

---

**You just saw the whole pipeline:** area → clean imagery → index → threshold →
measure → chart → export → app. Your project is the same skeleton.
→ [Pick your theme](../03-projects/)
