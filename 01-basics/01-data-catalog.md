# Step 1 — Load data from the catalog

Earth Engine already holds the data. You just call a dataset by its **ID** and
`print` it to see the **bands** inside.

```js
var dem = ee.Image('USGS/SRTMGL1_003');
print(dem);
Map.setCenter(75.0, 13.5, 8);
Map.addLayer(dem, {min: 0, max: 1500, palette: ['006633', 'E5FFCC', '662A00', 'D8D8D8', 'F5F5F5']}, 'Elevation');
```

The Western Ghats light up east of the coast. Open the **Console** (right) and
expand the printed image to read its bands.

Find more IDs in the [Data Catalog](https://developers.google.com/earth-engine/datasets).

→ Next: [Step 2 — Visualise an image](02-visualize.md)
