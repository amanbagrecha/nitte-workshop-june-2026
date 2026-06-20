# GEE Code Editor — Cheatsheet

```js
// LOAD
ee.Image('USGS/SRTMGL1_003')                          // one image
ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')     // a stack
ee.FeatureCollection('FAO/GAUL/2015/level2')          // vector shapes

// AREA  (longitude FIRST)
ee.Geometry.Point([74.856, 12.914])                   // Mangaluru
ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50])   // [W, S, E, N]
districts.filterBounds(ee.Geometry.Point([74.856, 12.914]))  // shape under a point

// FILTER -> ONE IMAGE
var img = col.filterBounds(aoi)
             .filterDate('2024-01-01', '2024-03-31')
             .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
             .median();           // .median .mean .first .min .max

// LOOK
print('label', obj);             // -> Console
Map.centerObject(aoi, 11);
Map.addLayer(img, vis, 'name');  // Inspector tab -> click map -> read values

// VISUALISE
{bands: ['B4','B3','B2'], min: 0, max: 3000}                  // true colour
{bands: ['B8','B4','B3'], min: 0, max: 4000}                  // false colour (veg red)
{min: 0, max: 0.8, palette: ['white','yellow','green']}      // 1 band + palette

// INDEX  (normalised difference = (a-b)/(a+b))
img.normalizedDifference(['B8','B4'])     // NDVI  veg   (>0.5 dense)
img.normalizedDifference(['B3','B8'])     // NDWI  water (>0)
img.normalizedDifference(['B3','B11'])    // MNDWI water vs built-up

// THRESHOLD + MASK
ndvi.gt(0.5).selfMask()          // .gt .gte .lt .lte .eq ; selfMask hides 0s

// MEASURE km^2
mask.multiply(ee.Image.pixelArea()).divide(1e6)
    .reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 20, maxPixels: 1e13});

// EXPORT (-> Drive -> QGIS)  then TASKS tab -> Run
Export.image.toDrive({image: img, description: 'out', region: aoi, scale: 20, maxPixels: 1e13});
```

**Bands (Sentinel-2):** B2 Blue · B3 Green · B4 Red · B8 NIR · B11 SWIR

**Survival:** `[lon, lat]` first · `ee.` = server, use `.methods()` · print new datasets · save often (`Ctrl/Cmd+S`) · stuck → **Docs** tab.
