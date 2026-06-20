// STARTER - Water at Linganamakki reservoir with NDWI. Now make it seasonal & measured.

var aoi = ee.Geometry.Rectangle([74.65, 14.00, 75.00, 14.30]);  // Linganamakki

var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2024-11-01', '2024-12-31')   // post-monsoon = fullest
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30)).median().clip(aoi);

var ndwi = img.normalizedDifference(['B3', 'B8']).rename('NDWI');   // water is bright
var water = ndwi.gt(0).selfMask();

Map.centerObject(aoi, 11);
Map.addLayer(water, {palette: ['blue']}, 'Water (post-monsoon)');
