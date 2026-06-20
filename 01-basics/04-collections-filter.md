# Step 4 — Filter an image collection

A collection over India has tens of thousands of images. Three filters cut it down
to the ones you want: **where**, **when**, **how cloudy**.

```js
var aoi = ee.Geometry.Point([74.856, 12.914]);
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2024-01-01', '2024-03-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
print('Images:', s2.size());
print('First image:', s2.first());
```

`.size()` is how many survived. `.first()` is one of them. Change the dates to the
monsoon (Jun–Sep) and watch the count rise but the clouds with it.

→ Next: [Step 5 — Composite & true/false colour](05-composite-colour.md)
