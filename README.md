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
