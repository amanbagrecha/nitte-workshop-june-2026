# Reference — Land Use / Land Cover

## Datasets

| ID | Use |
|----|-----|
| `COPERNICUS/S2_SR_HARMONIZED` | Sentinel-2 input bands, 10 m |
| `ESA/WorldCover/v200` | Ready-made 10 m land cover — use to *validate* your map |

## Bands to feed the classifier

`B2 B3 B4 B8 B11 B12` — and consider adding derived bands:

```js
var withIdx = img.addBands(img.normalizedDifference(['B8','B4']).rename('NDVI'))
                 .addBands(img.normalizedDifference(['B3','B8']).rename('NDWI'));
```

## Supervised classification pattern

```js
var sample = img.sampleRegions({collection: training, properties: ['lc'], scale: 10});
var split  = sample.randomColumn();
var train  = split.filter(ee.Filter.lt('random', 0.7));
var test   = split.filter(ee.Filter.gte('random', 0.7));

var clf = ee.Classifier.smileRandomForest(50).train(train, 'lc', img.bandNames());
var classified = img.classify(clf);

var acc = test.classify(clf).errorMatrix('lc', 'classification');
print('Accuracy:', acc.accuracy());
```

## Classifiers

`ee.Classifier.smileRandomForest(n)` · `ee.Classifier.smileCart()` · `ee.Classifier.smileGradientTreeBoost(n)`

## Suggested settings

- **Area:** Mangaluru `ee.Geometry.Rectangle([74.74, 12.80, 74.95, 13.05])`
- **Classes:** 0 water · 1 vegetation · 2 built-up · 3 bare/sand
- **Training size:** 20–50 examples **per class**, well spread
- **Palette:** `['blue','green','red','yellow']`
