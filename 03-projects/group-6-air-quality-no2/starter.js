// STARTER - Tropospheric NO2 over Mangaluru (Sentinel-5P). Find the hotspots, then trend them.

var aoi = ee.Geometry.Rectangle([74.70, 12.80, 75.00, 13.10]);  // Mangaluru + industrial belt

var no2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterBounds(aoi).filterDate('2024-01-01', '2024-12-31')
  .mean().clip(aoi);

Map.centerObject(aoi, 10);
Map.addLayer(no2, {min: 0, max: 0.0001, palette: ['black', 'blue', 'green', 'yellow', 'red']}, 'NO2 (mol/m2)');
