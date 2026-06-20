# Step 6 — Band math (NDVI)

Combine two bands into an index. **NDVI = (NIR − Red) / (NIR + Red)** — high over
healthy plants, low over roads, water, bare soil.

```js
var aoi = ee.Geometry.Point([74.742, 13.341]);
var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2024-01-01', '2024-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)).median();
var ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
Map.centerObject(aoi, 11);
Map.addLayer(ndvi, {min: 0, max: 0.8, palette: ['white', 'yellow', 'green']}, 'NDVI');
```

`normalizedDifference(['a', 'b'])` *always* means `(a − b) / (a + b)`. Learn it once
and you get NDWI (water, `['B3','B8']`), NDSI (snow), NBR (burns)...

→ Next: [Step 7 — Mask & measure](07-mask-measure.md)
