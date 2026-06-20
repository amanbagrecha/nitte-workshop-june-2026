// STARTER - Night-lights growth, Mangaluru-Udupi. Brightening = urban/electrification growth.

var aoi = ee.Geometry.Rectangle([74.65, 12.75, 74.95, 13.45]);  // coastal strip

function yearLights(y) {
  return ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
    .select('avg_rad')
    .filterDate(y + '-01-01', y + '-12-31').median().clip(aoi);
}

var change = yearLights('2023').subtract(yearLights('2014')).rename('d');
Map.centerObject(aoi, 9);
Map.addLayer(change, {min: -5, max: 15, palette: ['blue', 'white', 'red']}, 'Brightening 2014 -> 2023');
