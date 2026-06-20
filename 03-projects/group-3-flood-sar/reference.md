# Reference — Flood Inundation (Sentinel-1 SAR)

## Datasets

| ID | Use |
|----|-----|
| `COPERNICUS/S1_GRD` | Sentinel-1 C-band radar backscatter (dB), all-weather, 10 m |
| `JRC/GSW1_4/GlobalSurfaceWater` | Permanent water (`occurrence`) — subtract it |

## Sentinel-1 filtering (always do these)

```js
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))   // pick ONE pass
.select('VH')   // VH usually separates water best; VV also available
```

## Backscatter (dB) intuition

| Surface | VH backscatter |
|---------|----------------|
| Calm open water / flood | very low (dark), ~ < −20 dB |
| Bare soil / fields | medium |
| Buildings / forest | high (bright) |

## Key functions

```js
img.focal_median(50, 'circle', 'meters')   // speckle smoothing
flood.divide(before)                        // change ratio (big drop = new water)
permanentWater = gsw.select('occurrence').gt(50)
floodMask = newWater.and(permanentWater.not())
mask.multiply(ee.Image.pixelArea()).divide(1e6).reduceRegion(...)   // km^2
```

## Suggested settings

- **Area:** Netravati `ee.Geometry.Rectangle([74.95, 12.85, 75.15, 13.05])`
- **Event windows:** Karnataka floods ~**Aug 2019**, or Kerala ~**Aug 2018**
- **Threshold:** VH ≈ −18 to −20 dB · **Scale:** 10–30 m
