// LIVE DEMO - Vegetation health with NDVI (Udupi). Change aoi + dates to reuse.

// 2.1 Area + dates
var aoi   = ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50]);
var start = '2024-01-01';
var end   = '2024-12-31';
Map.centerObject(aoi, 10);

// 2.2 Clean Sentinel-2 (SCL cloud mask)
function maskS2(img) {
  var scl = img.select('SCL');
  var clear = scl.neq(3).and(scl.neq(8)).and(scl.neq(9)).and(scl.neq(10));
  return img.updateMask(clear).divide(10000).copyProperties(img, ['system:time_start']);
}
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
  .map(maskS2);

// 2.3 NDVI on every image, then median
function addNDVI(img) { return img.addBands(img.normalizedDifference(['B8', 'B4']).rename('NDVI')); }
var withNdvi = s2.map(addNDVI);
var ndvi = withNdvi.select('NDVI').median().clip(aoi);
Map.addLayer(ndvi, {min: 0, max: 0.8, palette: ['white', 'yellow', 'green']}, 'NDVI');

// 2.4 Threshold -> healthy vegetation
var veg = ndvi.gt(0.5).selfMask();
Map.addLayer(veg, {palette: ['darkgreen']}, 'Healthy vegetation');

// 2.5 Measure vegetated area (km^2)
var km2 = veg.multiply(ee.Image.pixelArea()).divide(1e6)
  .reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 20, maxPixels: 1e13});
print('Healthy vegetation km2:', km2.get('NDVI'));

// 2.6 Chart NDVI through the year - keep only scenes that actually cover the AOI
var aoiArea = aoi.area(100);
var covered = withNdvi.map(function (img) {
  var valid = img.select('NDVI').mask().multiply(ee.Image.pixelArea())
    .reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 100, maxPixels: 1e13})
    .getNumber('NDVI');
  return img.set('cover', valid.divide(aoiArea));   // fraction of AOI with valid data
}).filter(ee.Filter.gt('cover', 0.9));              // drop partial-coverage scenes

print(ui.Chart.image.series(covered.select('NDVI'), aoi, ee.Reducer.mean(), 200)
  .setOptions({title: 'Mean NDVI over time - Udupi (well-covered scenes)', vAxis: {title: 'NDVI'}, hAxis: {title: 'Date'}}));

// 2.7 Export for QGIS  (then Tasks tab -> Run)
Export.image.toDrive({image: ndvi, description: 'Udupi_NDVI', region: aoi, scale: 20, maxPixels: 1e13});
