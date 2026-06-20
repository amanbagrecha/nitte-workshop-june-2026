var dem = ee.Image('USGS/SRTMGL1_003');
print(dem);
Map.setCenter(75.0, 13.5, 8);
Map.addLayer(dem, {min: 0, max: 1500, palette: ['006633', 'E5FFCC', '662A00', 'D8D8D8', 'F5F5F5']}, 'Elevation');
