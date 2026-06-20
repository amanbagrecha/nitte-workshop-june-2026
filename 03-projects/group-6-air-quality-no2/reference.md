# Reference — Air Quality (Sentinel-5P)

## Datasets (all `COPERNICUS/S5P/OFFL/L3_*`)

| ID | Band | Pollutant |
|----|------|-----------|
| `COPERNICUS/S5P/OFFL/L3_NO2` | `tropospheric_NO2_column_number_density` | NO₂ (combustion) |
| `COPERNICUS/S5P/OFFL/L3_CO`  | `CO_column_number_density` | Carbon monoxide |
| `COPERNICUS/S5P/OFFL/L3_SO2` | `SO2_column_number_density` | SO₂ (industry) |
| `COPERNICUS/S5P/OFFL/L3_AER_AI` | `absorbing_aerosol_index` | Aerosol/dust/smoke |

Units are **mol/m²** (NO₂ ≈ 1e-5 to 2e-4). Resolution ~7 km.

## Key functions

```js
.select('tropospheric_NO2_column_number_density')
.filterDate(a, b).mean()                 // ALWAYS average — daily data is noisy
ui.Chart.image.series(coll, aoi, ee.Reducer.mean(), 1000)
ui.Chart.image.seriesByRegion(coll, regions, ee.Reducer.mean(), 'band', 1000, 'system:time_start', 'label')
meanA.subtract(meanB)                     // e.g. 2019 vs 2020 lockdown
```

## Suggested settings

- **Hotspot area:** Mangaluru `ee.Geometry.Rectangle([74.70, 12.80, 75.00, 13.10])`
- **Rural compare box:** a Western Ghats rectangle inland
- **NO₂ vis:** `min: 0, max: 0.0001, palette: ['black','blue','green','yellow','red']`
- **Story years:** 2019 vs 2020 (COVID dip)
