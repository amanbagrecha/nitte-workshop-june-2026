# Step 5 — Composite & true/false colour

`.median()` squashes a stack into one clean image. Then pick 3 bands for the Red,
Green, Blue channels. Swap in **NIR (`B8`)** and vegetation glows red.

```js
var aoi = ee.Geometry.Point([74.742, 13.341]);
var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2024-01-01', '2024-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)).median();
Map.centerObject(aoi, 11);
Map.addLayer(img, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'True colour');
Map.addLayer(img, {bands: ['B8', 'B4', 'B3'], min: 0, max: 4000}, 'False colour');
```

That red is near-infrared bouncing off leaves — the intuition behind NDVI.

| B2 | B3 | B4 | B8 | B11 |
|----|----|----|----|-----|
| Blue | Green | Red | NIR | SWIR |

→ Next: [Step 6 — Band math (NDVI)](06-band-math.md)
