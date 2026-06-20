# Reference — Vegetation Health (NDVI)

## Datasets

| ID | Use |
|----|-----|
| `COPERNICUS/S2_SR_HARMONIZED` | Sentinel-2 surface reflectance, 10 m (good coverage from ~2019) |
| `ESA/WorldCover/v200` | Mask to cropland (class `40`) or tree cover (class `10`) |

## Bands

`B2` Blue · `B3` Green · `B4` Red · `B8` NIR · `B11` SWIR · `SCL` scene classification (cloud mask)

```js
NDVI = normalizedDifference(['B8', 'B4'])     // -1..1 ; >0.5 dense, healthy
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
.filter(ee.Filter.calendarRange(6, 9, 'month'))   // keep only Jun-Sep across all years
imgA.subtract(imgB)                               // change map
ui.Chart.image.series(coll, region, ee.Reducer.mean(), scale)
ui.Chart.image.seriesByRegion(coll, regions, ee.Reducer.mean(), 'NDVI', scale, 'system:time_start', 'label')
mask.multiply(ee.Image.pixelArea()).divide(1e6).reduceRegion(...)   // km^2
```

## Suggested settings

- **Western Ghats:** `ee.Geometry.Rectangle([74.95, 13.45, 75.20, 13.65])` (Agumbe)
- **Udupi farmland:** `ee.Geometry.Rectangle([74.65, 13.20, 74.95, 13.50])`
- **Scale:** 10–30 m · **Years:** 2019 vs 2024 · **Palette:** `['red','white','green']` for change
