# WSDOT Travel Map Symbols

This repository is for symbology used by the [WSDOT Traveler Info Map][travel map].

Convert SVG to CIM JSON using ArcGIS REST API: [generate symbol]

[generate symbol]: https://developers.arcgis.com/rest/services-reference/enterprise/generate-symbol.htm
[travel map]: https://wsdot.com/Travel/Real-time/Map/

## ArcGIS Maps SDK unsupported JSON properties

When exporting CIM JSON, the following properties are not supported by the ArcGIS Maps SDK:

- angleAlignment
- dominantSizeAxis3D
- billboardMode3D
- clippingPath
- haloSize

## ArcGIS Style Classes

| ID | Name                     |
|---:|:-------------------------|
|  1 | Color                    |
|  2 | Color Scheme             |
|  3 | Point Symbol             |
|  4 | Line Symbol              |
|  5 | Polygon Symbol           |
|  6 | Text Symbol              |
|  7 | North Arrow              |
|  8 | Scale Bar                |
|  9 | Standard Label Placement |
| 10 | Maplex Label Placement   |
| 11 | Grid                     |
| 12 | Mesh Symbol              |
| 13 | Legend                   |
| 14 | Table Frame              |
| 15 | Map Surround             |
| 17 | Legend Item              |
| 18 | Table Frame Field        |
| 19 | Area Legend Patch        |
| 20 | Line Legend Patch        |
