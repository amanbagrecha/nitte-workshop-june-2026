// STARTER - Sentinel-1 SAR over the Netravati floodplain. Radar sees through cloud; water is DARK.

var aoi = ee.Geometry.Rectangle([74.95, 12.85, 75.15, 13.05]);  // Netravati near Bantwal

var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(aoi)
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filterDate('2024-01-01', '2024-03-31')
  .select('VH');

var img = s1.mean().clip(aoi);
Map.centerObject(aoi, 11);
Map.addLayer(img, {min: -25, max: 0}, 'SAR VH (dB) - dry season');
