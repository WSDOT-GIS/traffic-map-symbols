// import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
// import {layerListIcons} from "@/symbols/IconDefinitions"
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
const symbol = new CIMSymbol({
  data: {
    type: "CIMSymbolReference",
    symbol: {
      "type": "CIMPointSymbol",
      "symbolLayers": [
        {
          "type": "CIMVectorMarker",
          "enable": true,
          "anchorPointUnits": "Relative",
          "dominantSizeAxis3D": "Y",
          "size": 24,
          "offsetY":12,
          "billboardMode3D": "FaceNearPlane",
          "frame": {
            "xmin": 0,
            "ymin": 0,
            "xmax": 18,
            "ymax": 24
          },
          "markerGraphics": [
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "rings": [
                  [
                    [
                      15.37,
                      8.43
                    ],
                    [
                      16.49,
                      9.81
                    ],
                    [
                      17.32,
                      11.38
                    ],
                    [
                      17.83,
                      13.09
                    ],
                    [
                      18,
                      14.87
                    ],
                    [
                      17.83,
                      16.65
                    ],
                    [
                      17.32,
                      18.36
                    ],
                    [
                      16.49,
                      19.94
                    ],
                    [
                      15.36,
                      21.33
                    ],
                    [
                      14,
                      22.46
                    ],
                    [
                      12.44,
                      23.31
                    ],
                    [
                      10.76,
                      23.83
                    ],
                    [
                      9,
                      24
                    ],
                    [
                      7.24,
                      23.83
                    ],
                    [
                      5.56,
                      23.31
                    ],
                    [
                      4,
                      22.46
                    ],
                    [
                      2.64,
                      21.33
                    ],
                    [
                      1.51,
                      19.94
                    ],
                    [
                      0.68,
                      18.36
                    ],
                    [
                      0.17,
                      16.65
                    ],
                    [
                      0,
                      14.87
                    ],
                    [
                      0.17,
                      13.09
                    ],
                    [
                      0.68,
                      11.39
                    ],
                    [
                      1.5,
                      9.81
                    ],
                    [
                      2.62,
                      8.43
                    ],
                    [
                      8.18,
                      0.45
                    ],
                    [
                      8.54,
                      0.13
                    ],
                    [
                      9,
                      0.01
                    ],
                    [
                      9.46,
                      0.13
                    ],
                    [
                      9.82,
                      0.45
                    ],
                    [
                      15.37,
                      8.43
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidFill",
                    "enable": true,
                    "color": [
                      150,
                      53,
                      159,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "rings": [
                  [
                    [
                      9,
                      7.25
                    ],
                    [
                      10.51,
                      7.4
                    ],
                    [
                      11.96,
                      7.84
                    ],
                    [
                      13.3,
                      8.55
                    ],
                    [
                      14.48,
                      9.52
                    ],
                    [
                      15.45,
                      10.7
                    ],
                    [
                      16.16,
                      12.04
                    ],
                    [
                      16.6,
                      13.49
                    ],
                    [
                      16.75,
                      15
                    ],
                    [
                      16.6,
                      16.51
                    ],
                    [
                      16.16,
                      17.96
                    ],
                    [
                      15.45,
                      19.3
                    ],
                    [
                      14.48,
                      20.48
                    ],
                    [
                      13.3,
                      21.45
                    ],
                    [
                      11.96,
                      22.16
                    ],
                    [
                      10.51,
                      22.6
                    ],
                    [
                      9,
                      22.75
                    ],
                    [
                      7.49,
                      22.6
                    ],
                    [
                      6.04,
                      22.16
                    ],
                    [
                      4.7,
                      21.45
                    ],
                    [
                      3.52,
                      20.48
                    ],
                    [
                      2.55,
                      19.3
                    ],
                    [
                      1.84,
                      17.96
                    ],
                    [
                      1.4,
                      16.51
                    ],
                    [
                      1.25,
                      15
                    ],
                    [
                      1.4,
                      13.49
                    ],
                    [
                      1.84,
                      12.04
                    ],
                    [
                      2.55,
                      10.7
                    ],
                    [
                      3.52,
                      9.52
                    ],
                    [
                      4.7,
                      8.55
                    ],
                    [
                      6.04,
                      7.84
                    ],
                    [
                      7.49,
                      7.4
                    ],
                    [
                      9,
                      7.25
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidFill",
                    "enable": true,
                    "color": [
                      150,
                      53,
                      159,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "rings": [
                  [
                    [
                      16.75,
                      15
                    ],
                    [
                      16.6,
                      13.49
                    ],
                    [
                      16.16,
                      12.04
                    ],
                    [
                      15.45,
                      10.7
                    ],
                    [
                      14.48,
                      9.52
                    ],
                    [
                      13.3,
                      8.55
                    ],
                    [
                      11.96,
                      7.84
                    ],
                    [
                      10.51,
                      7.4
                    ],
                    [
                      9,
                      7.25
                    ],
                    [
                      7.49,
                      7.4
                    ],
                    [
                      6.04,
                      7.84
                    ],
                    [
                      4.7,
                      8.55
                    ],
                    [
                      3.52,
                      9.52
                    ],
                    [
                      2.55,
                      10.7
                    ],
                    [
                      1.84,
                      12.04
                    ],
                    [
                      1.4,
                      13.49
                    ],
                    [
                      1.25,
                      15
                    ],
                    [
                      1.4,
                      16.51
                    ],
                    [
                      1.84,
                      17.96
                    ],
                    [
                      2.55,
                      19.3
                    ],
                    [
                      3.52,
                      20.48
                    ],
                    [
                      4.7,
                      21.45
                    ],
                    [
                      6.04,
                      22.16
                    ],
                    [
                      7.49,
                      22.6
                    ],
                    [
                      9,
                      22.75
                    ],
                    [
                      10.51,
                      22.6
                    ],
                    [
                      11.96,
                      22.16
                    ],
                    [
                      13.3,
                      21.45
                    ],
                    [
                      14.48,
                      20.48
                    ],
                    [
                      15.45,
                      19.3
                    ],
                    [
                      16.16,
                      17.96
                    ],
                    [
                      16.6,
                      16.51
                    ],
                    [
                      16.75,
                      15
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Miter",
                    "lineStyle3D": "Strip",
                    "miterLimit": 4,
                    "width": 0.5,
                    "color": [
                      255,
                      255,
                      255,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "paths": [
                  [
                    [
                      6.5,
                      21
                    ],
                    [
                      6.5,
                      9
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Miter",
                    "lineStyle3D": "Strip",
                    "miterLimit": 4,
                    "width": 1,
                    "color": [
                      255,
                      255,
                      255,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "paths": [
                  [
                    [
                      8.3,
                      20.7
                    ],
                    [
                      8.3,
                      9.3
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidStroke",
                    "effects": [
                      {
                        "type": "CIMGeometricEffectDashes",
                        "dashTemplate": [
                          3,
                          3
                        ],
                        "lineDashEnding": "NoConstraint",
                        "controlPointEnding": "NoConstraint"
                      }
                    ],
                    "enable": true,
                    "capStyle": "Round",
                    "joinStyle": "Miter",
                    "lineStyle3D": "Strip",
                    "miterLimit": 4,
                    "width": 0.6000000238418579,
                    "color": [
                      255,
                      255,
                      255,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "paths": [
                  [
                    [
                      10.5,
                      21
                    ],
                    [
                      10.5,
                      9
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Miter",
                    "lineStyle3D": "Strip",
                    "miterLimit": 4,
                    "width": 1,
                    "color": [
                      255,
                      255,
                      255,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "rings": [
                  [
                    [
                      11.5,
                      12.4
                    ],
                    [
                      11.86,
                      12.43
                    ],
                    [
                      12.22,
                      12.53
                    ],
                    [
                      12.55,
                      12.69
                    ],
                    [
                      12.85,
                      12.9
                    ],
                    [
                      13.1,
                      13.15
                    ],
                    [
                      13.31,
                      13.45
                    ],
                    [
                      13.47,
                      13.78
                    ],
                    [
                      13.57,
                      14.14
                    ],
                    [
                      13.6,
                      14.5
                    ],
                    [
                      13.57,
                      14.86
                    ],
                    [
                      13.47,
                      15.22
                    ],
                    [
                      13.31,
                      15.55
                    ],
                    [
                      13.1,
                      15.85
                    ],
                    [
                      12.85,
                      16.1
                    ],
                    [
                      12.55,
                      16.31
                    ],
                    [
                      12.22,
                      16.47
                    ],
                    [
                      11.86,
                      16.57
                    ],
                    [
                      11.5,
                      16.6
                    ],
                    [
                      11.14,
                      16.57
                    ],
                    [
                      10.78,
                      16.47
                    ],
                    [
                      10.45,
                      16.31
                    ],
                    [
                      10.15,
                      16.1
                    ],
                    [
                      9.9,
                      15.85
                    ],
                    [
                      9.69,
                      15.55
                    ],
                    [
                      9.53,
                      15.22
                    ],
                    [
                      9.43,
                      14.86
                    ],
                    [
                      9.4,
                      14.5
                    ],
                    [
                      9.43,
                      14.14
                    ],
                    [
                      9.53,
                      13.78
                    ],
                    [
                      9.69,
                      13.45
                    ],
                    [
                      9.9,
                      13.15
                    ],
                    [
                      10.15,
                      12.9
                    ],
                    [
                      10.45,
                      12.69
                    ],
                    [
                      10.78,
                      12.53
                    ],
                    [
                      11.14,
                      12.43
                    ],
                    [
                      11.5,
                      12.4
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidFill",
                    "enable": true,
                    "color": [
                      150,
                      53,
                      159,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "rings": [
                  [
                    [
                      11.5,
                      12.4
                    ],
                    [
                      11.86,
                      12.43
                    ],
                    [
                      12.22,
                      12.53
                    ],
                    [
                      12.55,
                      12.69
                    ],
                    [
                      12.85,
                      12.9
                    ],
                    [
                      13.1,
                      13.15
                    ],
                    [
                      13.31,
                      13.45
                    ],
                    [
                      13.47,
                      13.78
                    ],
                    [
                      13.57,
                      14.14
                    ],
                    [
                      13.6,
                      14.5
                    ],
                    [
                      13.57,
                      14.86
                    ],
                    [
                      13.47,
                      15.22
                    ],
                    [
                      13.31,
                      15.55
                    ],
                    [
                      13.1,
                      15.85
                    ],
                    [
                      12.85,
                      16.1
                    ],
                    [
                      12.55,
                      16.31
                    ],
                    [
                      12.22,
                      16.47
                    ],
                    [
                      11.86,
                      16.57
                    ],
                    [
                      11.5,
                      16.6
                    ],
                    [
                      11.14,
                      16.57
                    ],
                    [
                      10.78,
                      16.47
                    ],
                    [
                      10.45,
                      16.31
                    ],
                    [
                      10.15,
                      16.1
                    ],
                    [
                      9.9,
                      15.85
                    ],
                    [
                      9.69,
                      15.55
                    ],
                    [
                      9.53,
                      15.22
                    ],
                    [
                      9.43,
                      14.86
                    ],
                    [
                      9.4,
                      14.5
                    ],
                    [
                      9.43,
                      14.14
                    ],
                    [
                      9.53,
                      13.78
                    ],
                    [
                      9.69,
                      13.45
                    ],
                    [
                      9.9,
                      13.15
                    ],
                    [
                      10.15,
                      12.9
                    ],
                    [
                      10.45,
                      12.69
                    ],
                    [
                      10.78,
                      12.53
                    ],
                    [
                      11.14,
                      12.43
                    ],
                    [
                      11.5,
                      12.4
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Miter",
                    "lineStyle3D": "Strip",
                    "miterLimit": 4,
                    "width": 0.800000011920929,
                    "color": [
                      255,
                      255,
                      255,
                      255
                    ]
                  }
                ]
              }
            },
            {
              "type": "CIMMarkerGraphic",
              "geometry": {
                "paths": [
                  [
                    [
                      11.5,
                      15.75
                    ],
                    [
                      11.5,
                      14.467
                    ],
                    [
                      12.375,
                      13.75
                    ]
                  ]
                ]
              },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Round",
                    "joinStyle": "Miter",
                    "lineStyle3D": "Strip",
                    "miterLimit": 4,
                    "width": 0.800000011920929,
                    "color": [
                      255,
                      255,
                      255,
                      255
                    ]
                  }
                ]
              }
            }
          ],
          "scaleSymbolsProportionally": true,
          "respectFrame": true,
          "clippingPath": {
            "type": "CIMClippingPath",
            "clippingType": "Intersect",
            "path": {
              "rings": [
                [
                  [
                    0,
                    0
                  ],
                  [
                    18,
                    0
                  ],
                  [
                    18,
                    24
                  ],
                  [
                    0,
                    24
                  ],
                  [
                    0,
                    0
                  ]
                ]
              ]
            }
          }
        }
      ]
    }
  }
})

export default symbol