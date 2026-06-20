var start = '2024-01-01', end = '2024-04-30';
var aoi = ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50]);
var ndvi = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).median()
  .normalizedDifference(['B8', 'B4']).rename('NDVI').clip(aoi);
Export.image.toDrive({image: ndvi, description: 'Udupi_NDVI', region: aoi, scale: 20, maxPixels: 1e13});
