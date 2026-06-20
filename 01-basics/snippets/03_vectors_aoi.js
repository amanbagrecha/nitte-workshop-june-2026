var districts = ee.FeatureCollection('FAO/GAUL/2015/level2');
var aoi = districts.filterBounds(ee.Geometry.Point([74.856, 12.914]));
print(aoi);
Map.centerObject(aoi, 9);
Map.addLayer(aoi, {color: 'orange'}, 'District');
