
// import IconInfo from "@/types/IconInfo"
// import { layerListIcons } from "@/symbols/IconDefinitions"
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol"

const weatherStationSymbol = new CIMSymbol({
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
          "offsetY": 12,
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
                      15.38,
                      8.43
                    ],
                    [
                      16.5,
                      9.81
                    ],
                    [
                      17.32,
                      11.39
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
                      11.38
                    ],
                    [
                      1.51,
                      9.81
                    ],
                    [
                      2.63,
                      8.43
                    ],
                    [
                      8.18,
                      0.44
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
                      0.44
                    ],
                    [
                      15.38,
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
                      0,
                      81,
                      81,
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
                      10.35,
                      7.37
                    ],
                    [
                      11.65,
                      7.72
                    ],
                    [
                      12.87,
                      8.29
                    ],
                    [
                      13.98,
                      9.06
                    ],
                    [
                      14.94,
                      10.02
                    ],
                    [
                      15.71,
                      11.13
                    ],
                    [
                      16.28,
                      12.35
                    ],
                    [
                      16.63,
                      13.65
                    ],
                    [
                      16.75,
                      15
                    ],
                    [
                      16.63,
                      16.35
                    ],
                    [
                      16.28,
                      17.65
                    ],
                    [
                      15.71,
                      18.87
                    ],
                    [
                      14.94,
                      19.98
                    ],
                    [
                      13.98,
                      20.94
                    ],
                    [
                      12.87,
                      21.71
                    ],
                    [
                      11.65,
                      22.28
                    ],
                    [
                      10.35,
                      22.63
                    ],
                    [
                      9,
                      22.75
                    ],
                    [
                      7.65,
                      22.63
                    ],
                    [
                      6.35,
                      22.28
                    ],
                    [
                      5.13,
                      21.71
                    ],
                    [
                      4.02,
                      20.94
                    ],
                    [
                      3.06,
                      19.98
                    ],
                    [
                      2.29,
                      18.87
                    ],
                    [
                      1.72,
                      17.65
                    ],
                    [
                      1.37,
                      16.35
                    ],
                    [
                      1.25,
                      15
                    ],
                    [
                      1.37,
                      13.65
                    ],
                    [
                      1.72,
                      12.35
                    ],
                    [
                      2.29,
                      11.13
                    ],
                    [
                      3.06,
                      10.02
                    ],
                    [
                      4.02,
                      9.06
                    ],
                    [
                      5.13,
                      8.29
                    ],
                    [
                      6.35,
                      7.72
                    ],
                    [
                      7.65,
                      7.37
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
                      0,
                      81,
                      81,
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
                      10.35,
                      7.37
                    ],
                    [
                      11.65,
                      7.72
                    ],
                    [
                      12.87,
                      8.29
                    ],
                    [
                      13.98,
                      9.06
                    ],
                    [
                      14.94,
                      10.02
                    ],
                    [
                      15.71,
                      11.13
                    ],
                    [
                      16.28,
                      12.35
                    ],
                    [
                      16.63,
                      13.65
                    ],
                    [
                      16.75,
                      15
                    ],
                    [
                      16.63,
                      16.35
                    ],
                    [
                      16.28,
                      17.65
                    ],
                    [
                      15.71,
                      18.87
                    ],
                    [
                      14.94,
                      19.98
                    ],
                    [
                      13.98,
                      20.94
                    ],
                    [
                      12.87,
                      21.71
                    ],
                    [
                      11.65,
                      22.28
                    ],
                    [
                      10.35,
                      22.63
                    ],
                    [
                      9,
                      22.75
                    ],
                    [
                      7.65,
                      22.63
                    ],
                    [
                      6.35,
                      22.28
                    ],
                    [
                      5.13,
                      21.71
                    ],
                    [
                      4.02,
                      20.94
                    ],
                    [
                      3.06,
                      19.98
                    ],
                    [
                      2.29,
                      18.87
                    ],
                    [
                      1.72,
                      17.65
                    ],
                    [
                      1.37,
                      16.35
                    ],
                    [
                      1.25,
                      15
                    ],
                    [
                      1.37,
                      13.65
                    ],
                    [
                      1.72,
                      12.35
                    ],
                    [
                      2.29,
                      11.13
                    ],
                    [
                      3.06,
                      10.02
                    ],
                    [
                      4.02,
                      9.06
                    ],
                    [
                      5.13,
                      8.29
                    ],
                    [
                      6.35,
                      7.72
                    ],
                    [
                      7.65,
                      7.37
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
                "rings": [
                  [
                    [
                      5.91,
                      9.55
                    ],
                    [
                      6.11,
                      9.55
                    ],
                    [
                      6.31,
                      9.55
                    ],
                    [
                      6.31,
                      19.32
                    ],
                    [
                      6.11,
                      19.32
                    ],
                    [
                      5.91,
                      19.32
                    ],
                    [
                      5.91,
                      9.55
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
                      4.59,
                      19.32
                    ],
                    [
                      4.59,
                      19.19
                    ],
                    [
                      4.59,
                      19.07
                    ],
                    [
                      8.09,
                      19.07
                    ],
                    [
                      8.09,
                      19.19
                    ],
                    [
                      8.09,
                      19.32
                    ],
                    [
                      4.59,
                      19.32
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
                      14.57,
                      13.81
                    ],
                    [
                      14.9,
                      14.21
                    ],
                    [
                      14.9,
                      15.79
                    ],
                    [
                      14.57,
                      16.19
                    ],
                    [
                      5.57,
                      17.8
                    ],
                    [
                      5.1,
                      17.4
                    ],
                    [
                      5.1,
                      12.6
                    ],
                    [
                      5.57,
                      12.2
                    ],
                    [
                      14.57,
                      13.81
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
                      0,
                      81,
                      81,
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
                      5.1,
                      17.4
                    ],
                    [
                      5.14,
                      17.57
                    ],
                    [
                      5.24,
                      17.71
                    ],
                    [
                      5.4,
                      17.79
                    ],
                    [
                      5.57,
                      17.8
                    ],
                    [
                      14.57,
                      16.19
                    ],
                    [
                      14.81,
                      16.05
                    ],
                    [
                      14.9,
                      15.79
                    ],
                    [
                      14.9,
                      14.21
                    ],
                    [
                      14.81,
                      13.95
                    ],
                    [
                      14.57,
                      13.81
                    ],
                    [
                      5.57,
                      12.2
                    ],
                    [
                      5.4,
                      12.21
                    ],
                    [
                      5.24,
                      12.29
                    ],
                    [
                      5.14,
                      12.43
                    ],
                    [
                      5.1,
                      12.6
                    ],
                    [
                      5.1,
                      17.4
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
                    "width": 0.20000000298023224,
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
                      10.51,
                      16.96
                    ],
                    [
                      8.67,
                      17.33
                    ],
                    [
                      8.67,
                      12.76
                    ],
                    [
                      10.51,
                      13.13
                    ],
                    [
                      10.51,
                      16.96
                    ]
                  ],
                  [
                    [
                      12.35,
                      13.49
                    ],
                    [
                      13.76,
                      13.78
                    ],
                    [
                      13.93,
                      13.88
                    ],
                    [
                      14,
                      14.07
                    ],
                    [
                      14,
                      16.02
                    ],
                    [
                      13.93,
                      16.21
                    ],
                    [
                      13.76,
                      16.31
                    ],
                    [
                      12.35,
                      16.6
                    ],
                    [
                      12.35,
                      13.49
                    ]
                  ],
                  [
                    [
                      5.36,
                      17.99
                    ],
                    [
                      6.84,
                      17.7
                    ],
                    [
                      6.84,
                      12.52
                    ],
                    [
                      6.85,
                      12.39
                    ],
                    [
                      5.36,
                      12.1
                    ],
                    [
                      5.11,
                      12.16
                    ],
                    [
                      5,
                      12.39
                    ],
                    [
                      5,
                      17.7
                    ],
                    [
                      5.11,
                      17.93
                    ],
                    [
                      5.36,
                      17.99
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
                      8.85,
                      19.118
                    ],
                    [
                      8.85,
                      19.291
                    ],
                    [
                      7.957,
                      19.807
                    ],
                    [
                      7.807,
                      19.72
                    ],
                    [
                      7.807,
                      18.689
                    ],
                    [
                      7.957,
                      18.602
                    ],
                    [
                      8.85,
                      19.118
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
          },

        }
      ]
    }
  }
})
export { weatherStationSymbol }