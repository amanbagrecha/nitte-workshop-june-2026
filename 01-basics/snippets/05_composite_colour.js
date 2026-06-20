var start = '2024-01-01', end = '2024-04-30';
var aoi = ee.Geometry.Point([74.742, 13.341]);
var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)).median();
Map.centerObject(aoi, 11);
Map.addLayer(img, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'True colour');
Map.addLayer(img, {bands: ['B8', 'B4', 'B3'], min: 0, max: 4000}, 'False colour');
