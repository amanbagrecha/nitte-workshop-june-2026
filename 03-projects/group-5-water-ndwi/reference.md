# Reference — Water Body Extraction (NDWI)

## Datasets

| ID | Use |
|----|-----|
| `COPERNICUS/S2_SR_HARMONIZED` | Sentinel-2, 10 m |
| `JRC/GSW1_4/GlobalSurfaceWater` | Reference permanent/seasonal water to compare against |

## Indices

```js
NDWI  = normalizedDifference(['B3', 'B8'])    // McFeeters; water > 0
MNDWI = normalizedDifference(['B3', 'B11'])   // better separation from built-up
```

## Cloud mask (from the demo)

```js
function maskS2(img) {
  var scl = img.select('SCL');
  return img.updateMask(scl.neq(3).and(scl.neq(8)).and(scl.neq(9)).and(scl.neq(10))).divide(10000);
}
```

## Key functions

```js
ndwi.gt(0).selfMask()                                          // water mask
mask.multiply(ee.Image.pixelArea()).divide(1e6).reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 20, maxPixels: 1e13});
ui.Chart.image.series(monthlyWaterColl, aoi, ee.Reducer.sum(), 30)   // area over time
```

## Suggested settings

- **Area:** Linganamakki `ee.Geometry.Rectangle([74.65, 14.00, 75.00, 14.30])`
- **Seasons:** fullest **Nov–Dec**, lowest **Apr–May**
- **Threshold:** ~0 (tune with Inspector) · **Scale:** 10–20 m
- **Remember:** `normalizedDifference` band is named `nd` unless you `.rename(...)`.
