# Step 2 — Visualise an image

`Map.addLayer(image, visParams, name)`. For a **single band**, the look is set by
`min`, `max`, and a `palette` of colours from low to high.

```js
var lights = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
  .filterDate('2023-01-01', '2023-12-31').select('avg_rad').median();
Map.setCenter(74.85, 13.0, 8);
Map.addLayer(lights, {min: 0, max: 60, palette: ['black', 'purple', 'yellow', 'white']}, 'Night lights 2023');
```

Mangaluru and Udupi glow against the dark Western Ghats. Change `max` to `20`, then
`100` — that's the *stretch* controlling contrast.

→ Next: [Step 3 — Vectors & your study area](03-vectors-aoi.md)
