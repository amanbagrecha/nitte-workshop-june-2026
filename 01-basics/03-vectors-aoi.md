# Step 3 — Vectors & your study area

Not all data is pixels. A **`FeatureCollection`** holds shapes — here, district
boundaries. Grab the district under Mangaluru by location (no spelling needed) and
use it as your **area of interest (AOI)**.

```js
var districts = ee.FeatureCollection('FAO/GAUL/2015/level2');
var aoi = districts.filterBounds(ee.Geometry.Point([74.856, 12.914]));
print(aoi);
Map.centerObject(aoi, 9);
Map.addLayer(aoi, {color: 'orange'}, 'District');
```

`filterBounds(point)` keeps only the shape that contains that point — Dakshina
Kannada. From now on `aoi` is *where* every analysis happens.

→ Next: [Step 4 — Filter an image collection](04-collections-filter.md)
