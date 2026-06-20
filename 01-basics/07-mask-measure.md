# Step 7 — Mask & measure

Turn an index into an *answer*: threshold it to a 1/0 mask, then sum pixel areas to
get **km²**. This single move powers every afternoon project.

```js
var aoi = ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50]);
var ndvi = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2024-01-01', '2024-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).median()
  .normalizedDifference(['B8', 'B4']).rename('NDVI').clip(aoi);
var veg = ndvi.gt(0.5).selfMask();
Map.centerObject(aoi, 10);
Map.addLayer(veg, {palette: ['darkgreen']}, 'Dense vegetation');
var km2 = veg.multiply(ee.Image.pixelArea()).divide(1e6)
  .reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 20, maxPixels: 1e13});
print('Dense vegetation km²:', km2.get('NDVI'));
```

`.gt(0.5)` → mask · `.selfMask()` → hide the 0s · `reduceRegion` → one number.

→ Next: [Step 8 — Export & share](08-export-share.md)
