// STARTER - NDVI CHANGE over the Western Ghats (Agumbe). Extend the demo: years & seasons.

var aoi = ee.Geometry.Rectangle([74.95, 13.45, 75.20, 13.65]);  // Agumbe / Western Ghats

function maskS2(img) {
  var scl = img.select('SCL');
  return img.updateMask(scl.neq(3).and(scl.neq(8)).and(scl.neq(9)).and(scl.neq(10))).divide(10000);
}
function yearNDVI(y) {
  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(aoi).filterDate(y + '-01-01', y + '-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40)).map(maskS2)
    .map(function (i) { return i.normalizedDifference(['B8', 'B4']).rename('NDVI'); })
    .median().clip(aoi);
}

var change = yearNDVI('2024').subtract(yearNDVI('2019')).rename('dNDVI');
Map.centerObject(aoi, 11);
Map.addLayer(change, {min: -0.3, max: 0.3, palette: ['red', 'white', 'green']}, 'NDVI change 2019 -> 2024');
