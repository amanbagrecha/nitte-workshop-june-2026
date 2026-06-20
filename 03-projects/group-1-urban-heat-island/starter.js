// STARTER - Surface temperature over Mangaluru (Landsat 9). Get it on screen, then make it yours.

var aoi   = ee.Geometry.Rectangle([74.78, 12.80, 74.92, 12.97]);  // Mangaluru
var start = '2024-02-01';
var end   = '2024-05-31';   // dry, hot, clear pre-monsoon

var lst = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(aoi).filterDate(start, end)
  .filter(ee.Filter.lt('CLOUD_COVER', 20))
  .median()
  .select('ST_B10')
  .multiply(0.00341802).add(149.0).subtract(273.15)   // raw -> degrees Celsius
  .clip(aoi);

Map.centerObject(aoi, 12);
Map.addLayer(lst, {min: 24, max: 42, palette: ['blue', 'cyan', 'yellow', 'orange', 'red']}, 'LST (C)');
