# Reference — Night Lights (VIIRS DNB)

## Datasets

| ID | Band | Note |
|----|------|------|
| `NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG` | `avg_rad` | Monthly, stray-light corrected, from 2014 |
| `NOAA/VIIRS/DNB/ANNUAL_V22` | `average` / `maximum` | Cleaner yearly composites (great for trends) |

`avg_rad` units: nanoWatts/cm²/sr. Background ≈ 0; cities reach tens–hundreds.

## Key functions

```js
.select('avg_rad').filterDate(y+'-01-01', y+'-12-31').median()   // one clean year
img.gt(1).selfMask()                                             // "lit" mask
// Sum of Lights (total brightness):
img.reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 500, maxPixels: 1e13});
// Lit area km^2:
lit.multiply(ee.Image.pixelArea()).divide(1e6).reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 500, maxPixels: 1e13});
lit2023.and(lit2014.not())                                       // newly lit pixels
```

## Suggested settings

- **Area:** coastal strip `ee.Geometry.Rectangle([74.65, 12.75, 74.95, 13.45])`
- **Years:** 2014 vs 2023 (or full 2014→2023 series)
- **Scale:** ~500 m (native ~463 m) · **"Lit" threshold:** `avg_rad > 1`
- **Change palette:** `['blue','white','red']`, min −5, max 15
