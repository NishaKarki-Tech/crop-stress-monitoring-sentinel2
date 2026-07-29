# Seasonal Vegetation Analysis of Changunarayan Municipality Using Sentinel-2 Imagery

## Project Overview

This project evaluates seasonal vegetation dynamics and crop stress in Changunarayan Municipality, Bhaktapur, Nepal, using Sentinel-2 Surface Reflectance imagery processed in Google Earth Engine (GEE). Multiple vegetation indices, including NDVI, GNDVI, NDRE, and SAVI, were calculated for four seasons of 2025 to assess vegetation health.

A threshold-based crop stress classification was developed using monsoon NDVI values to identify healthy vegetation, moderate stress, and high stress areas. The final crop stress map was designed in ArcGIS Pro, and summary statistics were analyzed using Python.

This project demonstrates a complete remote sensing workflow for agricultural monitoring, integrating cloud-based satellite processing, GIS visualization, and data analysis.

---

## Objectives

- Analyze seasonal vegetation dynamics using Sentinel-2 imagery.
- Calculate NDVI, GNDVI, NDRE, and SAVI for four seasons.
- Classify crop stress during the monsoon season.
- Quantify healthy and stressed vegetation areas.
- Produce GIS-ready maps and summary statistics.

---

## Study Area

- **Location:** Changunarayan Municipality, Bhaktapur District, Nepal
- **Satellite:** Sentinel-2 Surface Reflectance (2025)
- **Spatial Resolution:** 10 m

---

## Software and Tools

- Google Earth Engine
- ArcGIS Pro
- Python
- Sentinel-2 Surface Reflectance Imagery

---

## Methodology

1. Import study area boundary.
2. Acquire Sentinel-2 imagery.
3. Apply cloud masking.
4. Generate seasonal composites.
5. Calculate NDVI, GNDVI, NDRE, and SAVI.
6. Compute seasonal statistics.
7. Classify crop stress using NDVI thresholds.
8. Create the final crop stress map in ArcGIS Pro.

---

## Results

### Seasonal Vegetation Statistics

See:

- `data/Seasonal_Vegetation_Indices_2025.csv`

### Crop Stress Assessment

| Crop Condition | Area (ha) | Percentage (%) |
|---------------|----------:|---------------:|
| Healthy | 4610.11 | 73.22 |
| Moderate Stress | 867.84 | 13.78 |
| High Stress | 818.15 | 13.00 |

---

## Repository Structure

```text
GEE/
Figures/
Maps/
data/
README.md
```

---

## Author

**Nisha Karki**

Research interests:
- Precision Agriculture
- Remote Sensing
- GIS
