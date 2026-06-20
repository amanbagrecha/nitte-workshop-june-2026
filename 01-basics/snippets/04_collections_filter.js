var start = '2024-01-01', end = '2024-03-31';
var aoi = ee.Geometry.Point([74.856, 12.914]);
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
print('Images:', s2.size());
print('First image:', s2.first());
