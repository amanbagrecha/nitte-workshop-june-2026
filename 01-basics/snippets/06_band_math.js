var start = '2024-01-01', end = '2024-04-30';
var aoi = ee.Geometry.Point([74.742, 13.341]);
var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)).median();
var ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
Map.centerObject(aoi, 11);
Map.addLayer(ndvi, {min: 0, max: 0.8, palette: ['white', 'yellow', 'green']}, 'NDVI');
