# Step 8 — Export & share

Get results *out* of Earth Engine. Export a GeoTIFF to Google Drive, then open it in
QGIS. (To bring your *own* data in, use **Assets** → *New* → upload a Shapefile/GeoTIFF.)

```js
var aoi = ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50]);
var ndvi = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2024-01-01', '2024-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).median()
  .normalizedDifference(['B8', 'B4']).rename('NDVI').clip(aoi);
Export.image.toDrive({image: ndvi, description: 'Udupi_NDVI', region: aoi, scale: 20, crs: 'EPSG:4326', maxPixels: 1e13});
```

Run it, then open the **Tasks** tab (right) and click **Run**. The `.tif` lands in
your Drive — drag it into QGIS.

**Share code:** *Get Link* (top bar). **Share a tool:** *Apps* → publish. You'll do
both in the live demo next.

✅ That's all 8 basics. → [Part 2 — Live Demo (NDVI)](../02-demo-ndvi/)
