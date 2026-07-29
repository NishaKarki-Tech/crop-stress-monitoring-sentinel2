// =====================================================
// Multi-Index Assessment of Seasonal Vegetation Dynamics
// Changunarayan Municipality, Nepal
// Sentinel-2 (2025)
// Author: Nisha Karki
// =====================================================


// =====================================================
// 1. Import Study Area
// =====================================================

var table = ee.FeatureCollection(
    "projects/nishaprecisionagriculture/assets/Changunarayan"
);

Map.centerObject(table, 12);

Map.addLayer(
    table.style({
        color: 'red',
        fillColor: '00000000',
        width: 2
    }),
    {},
    'Changunarayan Boundary'
);


// =====================================================
// 2. Load Sentinel-2 Collection
// =====================================================

var S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(table)
    .filterDate('2025-01-01', '2025-12-31');

print('Sentinel-2 Collection', S2);


// =====================================================
// 3. Cloud Masking
// =====================================================

// Your cloud masking function goes here...


// =====================================================
// 4. Seasonal Composites
// =====================================================

// Your seasonalComposite() function
// winter
// preMonsoon
// monsoon
// postMonsoon


// =====================================================
// 5. Vegetation Index Functions
// =====================================================

// NDVI()
// GNDVI()
// NDRE()
// SAVI()


// =====================================================
// 6. Calculate Vegetation Indices
// =====================================================

// winterNDVI
// winterGNDVI
// winterNDRE
// winterSAVI
// ...


// =====================================================
// 7. Visualization
// =====================================================

// vis parameters
// Map.addLayer(...)
Map.centerObject(table, 12);

Map.addLayer(
    table.style({
        color: 'red',
        fillColor: '00000000',
        width: 2
    }),
    {},
    'Changunarayan Boundary'
);
var S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(table)
    .filterDate('2025-01-01', '2025-12-31');

print('Sentinel-2 Collection', S2);
// Cloud masking using the Scene Classification Layer (SCL)

function maskS2(image) {

  var scl = image.select('SCL');

  var mask = scl.eq(4)   // Vegetation
      .or(scl.eq(5))     // Bare soil
      .or(scl.eq(6));    // Water

  return image.updateMask(mask);
}
// Apply cloud mask

var S2_masked = S2.map(maskS2);

print('Cloud Masked Collection', S2_masked);
// ==============================
// Seasonal Composite Function
// ==============================

function seasonalComposite(startDate, endDate) {

  return S2_masked
    .filterDate(startDate, endDate)
    .median()
    .clip(table);

}
// ==============================
// Seasonal Images
// ==============================

var winter = seasonalComposite(
  '2025-01-01',
  '2025-03-01'
);

var preMonsoon = seasonalComposite(
  '2025-03-01',
  '2025-06-01'
);

var monsoon = seasonalComposite(
  '2025-06-01',
  '2025-10-01'
);

var postMonsoon = seasonalComposite(
  '2025-10-01',
  '2026-01-01'
);
print("Winter", winter);
print("Pre-monsoon", preMonsoon);
print("Monsoon", monsoon);
print("Post-monsoon", postMonsoon);
// =====================================
// Vegetation Index Functions
// =====================================

// NDVI
function NDVI(image) {
  return image.normalizedDifference(['B8', 'B4'])
              .rename('NDVI');
}

// GNDVI
function GNDVI(image) {
  return image.normalizedDifference(['B8', 'B3'])
              .rename('GNDVI');
}

// NDRE
function NDRE(image) {
  return image.normalizedDifference(['B8', 'B5'])
              .rename('NDRE');
}

// SAVI
function SAVI(image) {

  var savi = image.expression(
    '((NIR - RED) / (NIR + RED + 0.5)) * 1.5',
    {
      'NIR': image.select('B8'),
      'RED': image.select('B4')
    });

  return savi.rename('SAVI');
}
// =====================================
// Vegetation Indices for Each Season
// =====================================

// Winter
var winterNDVI = NDVI(winter);
var winterGNDVI = GNDVI(winter);
var winterNDRE = NDRE(winter);
var winterSAVI = SAVI(winter);

// Pre-monsoon
var preNDVI = NDVI(preMonsoon);
var preGNDVI = GNDVI(preMonsoon);
var preNDRE = NDRE(preMonsoon);
var preSAVI = SAVI(preMonsoon);

// Monsoon
var monsoonNDVI = NDVI(monsoon);
var monsoonGNDVI = GNDVI(monsoon);
var monsoonNDRE = NDRE(monsoon);
var monsoonSAVI = SAVI(monsoon);

// Post-monsoon
var postNDVI = NDVI(postMonsoon);
var postGNDVI = GNDVI(postMonsoon);
var postNDRE = NDRE(postMonsoon);
var postSAVI = SAVI(postMonsoon);
print("Winter NDVI", winterNDVI);
print("Winter GNDVI", winterGNDVI);
print("Winter NDRE", winterNDRE);
print("Winter SAVI", winterSAVI);
// =====================================
// Visualization Parameters
// =====================================

var vis = {
  min: 0,
  max: 1,
  palette: [
    'brown',
    'yellow',
    'green',
    'darkgreen'
  ]
};

// =====================================
// Display Winter Vegetation Indices
// =====================================

Map.addLayer(winterNDVI, vis, 'Winter NDVI');

Map.addLayer(winterGNDVI, vis, 'Winter GNDVI');

Map.addLayer(winterNDRE, vis, 'Winter NDRE');

Map.addLayer(winterSAVI, vis, 'Winter SAVI');
var vis = {
  min: 0,
  max: 1,
  palette: ['brown','yellow','green','darkgreen']
};

Map.addLayer(winterNDVI, vis, 'Winter NDVI');
Map.addLayer(winterGNDVI, vis, 'Winter GNDVI');
Map.addLayer(winterNDRE, vis, 'Winter NDRE');
Map.addLayer(winterSAVI, vis, 'Winter SAVI');
// =====================================
// Mean Vegetation Index Function
// =====================================

function getMean(image, bandName) {

  var stats = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: table,
    scale: 10,
    maxPixels: 1e13
  });

  return stats.get(bandName);

}
// =====================================
// Winter Statistics
// =====================================

print("Winter NDVI Mean", getMean(winterNDVI, 'NDVI'));

print("Winter GNDVI Mean", getMean(winterGNDVI, 'GNDVI'));

print("Winter NDRE Mean", getMean(winterNDRE, 'NDRE'));

print("Winter SAVI Mean", getMean(winterSAVI, 'SAVI'));
// =====================================
// Seasonal Mean Statistics
// =====================================

var results = ee.FeatureCollection([

ee.Feature(null, {
Season: 'Winter',
NDVI: getMean(winterNDVI,'NDVI'),
GNDVI: getMean(winterGNDVI,'GNDVI'),
NDRE: getMean(winterNDRE,'NDRE'),
SAVI: getMean(winterSAVI,'SAVI')
}),

ee.Feature(null,{
Season:'Pre-monsoon',
NDVI:getMean(preNDVI,'NDVI'),
GNDVI:getMean(preGNDVI,'GNDVI'),
NDRE:getMean(preNDRE,'NDRE'),
SAVI:getMean(preSAVI,'SAVI')
}),

ee.Feature(null,{
Season:'Monsoon',
NDVI:getMean(monsoonNDVI,'NDVI'),
GNDVI:getMean(monsoonGNDVI,'GNDVI'),
NDRE:getMean(monsoonNDRE,'NDRE'),
SAVI:getMean(monsoonSAVI,'SAVI')
}),

ee.Feature(null,{
Season:'Post-monsoon',
NDVI:getMean(postNDVI,'NDVI'),
GNDVI:getMean(postGNDVI,'GNDVI'),
NDRE:getMean(postNDRE,'NDRE'),
SAVI:getMean(postSAVI,'SAVI')
})

]);

print(results);
// =====================================
// Export Seasonal Statistics
// =====================================

Export.table.toDrive({
  collection: results,
  description: 'Seasonal_Vegetation_Indices_2025',
  fileFormat: 'CSV'
});
// =====================================
// Crop Stress Classification - Monsoon
// =====================================

Map.addLayer(
  monsoonNDVI,
  {
    min: 0,
    max: 0.8,
    palette: ['brown', 'yellow', 'green']
  },
  'Monsoon NDVI'
);


// NDVI threshold classification

var monsoonStress = monsoonNDVI.expression(
  "(NDVI >= 0.60) ? 1" +
  ": (NDVI >= 0.45) ? 2" +
  ": 3",
  {
    'NDVI': monsoonNDVI
  }
).rename('Crop_Stress_Class');
// Display Crop Stress Classification

Map.addLayer(
  monsoonStress.clip(table),
  {
    min: 1,
    max: 3,
    palette: [
      'green',
      'orange',
      'red'
    ]
  },
  'Monsoon Crop Stress Map 2025'
);


// Check stress class distribution

print(
  'Stress Class Distribution',
  monsoonStress.reduceRegion({
    reducer: ee.Reducer.frequencyHistogram(),
    geometry: table.geometry(),
    scale: 10,
    maxPixels: 1e13
  })
);


// Export Crop Stress Map

Export.image.toDrive({
  image: monsoonStress.clip(table),
  description: 'Monsoon_Crop_Stress_Map_2025',
  folder: 'GEE_Crop_Stress_Maps',
  fileNamePrefix: 'Monsoon_Crop_Stress_Map_2025',
  scale: 10,
  region: table.geometry(),
  maxPixels: 1e13
});
// =====================================
// Area Statistics for Crop Stress Classes
// =====================================

// Pixel area in hectares
var areaImage = ee.Image.pixelArea().divide(10000)
                  .addBands(monsoonStress);

var areaStats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'Class'
  }),
  geometry: table,
  scale: 10,
  maxPixels: 1e13
});

print('Crop Stress Area (ha)', areaStats);