// NDVI EXPLORER app - drag the slider to see monthly NDVI. Apps -> New App to publish.

var aoi  = ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50]);
var YEAR = 2024;
var names = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function maskS2(img) {
  var scl = img.select('SCL');
  return img.updateMask(scl.neq(3).and(scl.neq(8)).and(scl.neq(9)).and(scl.neq(10))).divide(10000);
}
function ndviForMonth(m) {
  var s = ee.Date.fromYMD(YEAR, m, 1);
  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(aoi).filterDate(s, s.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 60))
    .map(maskS2).median().clip(aoi)
    .normalizedDifference(['B8', 'B4']);
}

var map = ui.Map();
map.centerObject(aoi, 10);

var label  = ui.Label('NDVI - May', {fontWeight: 'bold', margin: '4px 8px'});
var slider = ui.Slider({min: 1, max: 12, value: 5, step: 1, style: {width: '300px', margin: '4px 8px'}});

function update() {
  var m = slider.getValue();
  label.setValue('NDVI - ' + names[m]);
  map.layers().reset();
  map.addLayer(ndviForMonth(m), {min: 0, max: 0.8, palette: ['white', 'yellow', 'green']}, 'NDVI ' + names[m]);
}
slider.onChange(update);

map.add(ui.Panel({
  widgets: [ui.Label('Udupi Vegetation - NDVI by Month', {fontWeight: 'bold', fontSize: '18px', margin: '4px 8px'}), label, slider],
  style: {position: 'top-left', padding: '6px', width: '330px'}
}));

ui.root.clear();
ui.root.add(map);
update();
