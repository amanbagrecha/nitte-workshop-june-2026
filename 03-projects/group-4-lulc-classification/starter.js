// STARTER - Supervised LULC over Mangaluru. Toy training data on purpose -> improve it.
// Classes: 0 water, 1 vegetation, 2 built-up, 3 bare/sand

var aoi = ee.Geometry.Rectangle([74.74, 12.80, 74.95, 13.05]);

var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi).filterDate('2024-01-01', '2024-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)).median()
  .select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']).clip(aoi);

var training = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([74.79, 12.86]), {lc: 0}),  // sea
  ee.Feature(ee.Geometry.Point([74.83, 12.95]), {lc: 0}),  // river
  ee.Feature(ee.Geometry.Point([74.90, 12.93]), {lc: 1}),  // vegetation
  ee.Feature(ee.Geometry.Point([74.88, 12.83]), {lc: 1}),  // vegetation
  ee.Feature(ee.Geometry.Point([74.84, 12.87]), {lc: 2}),  // city core
  ee.Feature(ee.Geometry.Point([74.86, 12.90]), {lc: 2}),  // built-up
  ee.Feature(ee.Geometry.Point([74.81, 12.84]), {lc: 3})   // beach sand
]);

var sample = img.sampleRegions({collection: training, properties: ['lc'], scale: 10});
var classifier = ee.Classifier.smileRandomForest(30).train(sample, 'lc', img.bandNames());
var classified = img.classify(classifier);

Map.centerObject(aoi, 12);
Map.addLayer(img, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'True colour');
Map.addLayer(classified, {min: 0, max: 3, palette: ['blue', 'green', 'red', 'yellow']}, 'LULC (rough!)');
