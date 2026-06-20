# Reference — Urban Heat Island (Landsat)

## Datasets

| ID | Use |
|----|-----|
| `LANDSAT/LC09/C02/T1_L2` | Landsat 9 surface reflectance + temperature (2021→) |
| `LANDSAT/LC08/C02/T1_L2` | Landsat 8, same bands (2013→) — `merge()` both for more scenes |
| `ESA/WorldCover/v200` | 10 m land cover, built-up class = `50` (for the built-vs-green split) |

## Bands & scaling (Collection 2, Level 2)

| Band | Meaning | To real units |
|------|---------|---------------|
| `ST_B10` | Surface temperature | `× 0.00341802 + 149.0` → Kelvin; then `− 273.15` → °C |
| `SR_B5` | NIR (for NDVI) | `× 0.0000275 − 0.2` → reflectance |
| `SR_B4` | Red (for NDVI) | `× 0.0000275 − 0.2` → reflectance |
| `QA_PIXEL` | Quality bitmask | bit 3 = cloud, bit 4 = cloud shadow, bit 1 = dilated cloud, bit 2 = cirrus |

> ⚠️ Always confirm these on the dataset's catalog page — don't trust an AI's numbers.

## Cloud mask pattern (fill in the bits)

```js
function maskL2(img) {
  var qa = img.select('QA_PIXEL');
  var clear = qa.bitwiseAnd(1 << 3).eq(0)        // not cloud
            .and(qa.bitwiseAnd(1 << 4).eq(0));   // not cloud shadow
  return img.updateMask(clear);
}
```

## Key functions you'll reach for

```js
.merge(otherCollection)                 // combine L8 + L9
.normalizedDifference(['SR_B5','SR_B4'])// NDVI on Landsat
img.bitwiseAnd(1 << n).eq(0)            // read a QA bit
ee.Reducer.mean()  /  ee.Reducer.percentile([90])
reduceRegion({reducer, geometry, scale: 30, maxPixels: 1e13})
mask.multiply(ee.Image.pixelArea()).divide(1e6)   // km^2
```

## Suggested settings

- **Area:** Mangaluru `ee.Geometry.Rectangle([74.78, 12.80, 74.92, 12.97])`
- **Season:** Feb–May (pre-monsoon: hot, clear)
- **Scale for reduceRegion:** `30`
- **LST palette:** `['blue','cyan','yellow','orange','red']`, min `24`, max `42`
