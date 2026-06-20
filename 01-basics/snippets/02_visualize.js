var lights = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
  .filterDate('2023-01-01', '2023-12-31').select('avg_rad').median();
Map.setCenter(74.85, 13.0, 8);
Map.addLayer(lights, {min: 0, max: 60, palette: ['black', 'purple', 'yellow', 'white']}, 'Night lights 2023');
