import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {layerListIcons} from "@/symbols/IconDefinitions"
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
const symbol = new CIMSymbol({
    data:{
        type:"CIMSymbolReference",
        symbol:{
            "type": "CIMPointSymbol",
            "symbolLayers": [
              {
                "type": "CIMVectorMarker",
                "enable": true,
                "anchorPointUnits": "Relative",
                "dominantSizeAxis3D": "Y",
                "size": 10,
                "billboardMode3D": "FaceNearPlane",
                "frame": {
                  "xmin": 0,
                  "ymin": 0,
                  "xmax": 300,
                  "ymax": 300
                },
                "markerGraphics": [
                  {
                    "type": "CIMMarkerGraphic",
                    "geometry": {
                      "rings": [
                        [
                          [
                            298.8,
                            15.6
                          ],
                          [
                            298.8,
                            25.2
                          ],
                          [
                            270,
                            25.2
                          ],
                          [
                            270,
                            226.8
                          ],
                          [
                            295.7,
                            226.8
                          ],
                          [
                            278.4,
                            284.4
                          ],
                          [
                            21.6,
                            284.4
                          ],
                          [
                            4.3,
                            226.8
                          ],
                          [
                            30,
                            226.8
                          ],
                          [
                            30,
                            25.2
                          ],
                          [
                            1.2,
                            25.2
                          ],
                          [
                            1.2,
                            15.6
                          ],
                          [
                            298.8,
                            15.6
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
                            170,
                            0,
                            0,
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
                            282.8,
                            236.4
                          ],
                          [
                            271.3,
                            274.8
                          ],
                          [
                            28.8,
                            274.8
                          ],
                          [
                            17.2,
                            236.4
                          ],
                          [
                            282.8,
                            236.4
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
                            172,
                            147,
                            147,
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
                            49.2,
                            25.2
                          ],
                          [
                            49.2,
                            159.6
                          ],
                          [
                            145.2,
                            159.6
                          ],
                          [
                            145.2,
                            25.2
                          ],
                          [
                            260.4,
                            25.2
                          ],
                          [
                            260.4,
                            226.8
                          ],
                          [
                            39.6,
                            226.8
                          ],
                          [
                            39.6,
                            25.2
                          ],
                          [
                            49.2,
                            25.2
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
                            219,
                            227,
                            219,
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
                            135.6,
                            25.2
                          ],
                          [
                            135.6,
                            150
                          ],
                          [
                            58.8,
                            150
                          ],
                          [
                            58.8,
                            25.2
                          ],
                          [
                            135.6,
                            25.2
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
                            83,
                            108,
                            83,
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
                            28.8,
                            274.8
                          ],
                          [
                            271.3,
                            274.8
                          ],
                          [
                            282.8,
                            236.4
                          ],
                          [
                            17.2,
                            236.4
                          ],
                          [
                            28.8,
                            274.8
                          ]
                        ],
                        [
                          [
                            58.8,
                            150
                          ],
                          [
                            135.6,
                            150
                          ],
                          [
                            135.6,
                            25.2
                          ],
                          [
                            58.8,
                            25.2
                          ],
                          [
                            58.8,
                            150
                          ]
                        ],
                        [
                          [
                            39.6,
                            226.8
                          ],
                          [
                            260.4,
                            226.8
                          ],
                          [
                            260.4,
                            25.2
                          ],
                          [
                            145.2,
                            25.2
                          ],
                          [
                            145.2,
                            159.6
                          ],
                          [
                            49.2,
                            159.6
                          ],
                          [
                            49.2,
                            25.2
                          ],
                          [
                            39.6,
                            25.2
                          ],
                          [
                            39.6,
                            226.8
                          ]
                        ],
                        [
                          [
                            298.8,
                            15.6
                          ],
                          [
                            298.8,
                            25.2
                          ],
                          [
                            270,
                            25.2
                          ],
                          [
                            270,
                            226.8
                          ],
                          [
                            295.7,
                            226.8
                          ],
                          [
                            278.4,
                            284.4
                          ],
                          [
                            21.6,
                            284.4
                          ],
                          [
                            4.3,
                            226.8
                          ],
                          [
                            30,
                            226.8
                          ],
                          [
                            30,
                            25.2
                          ],
                          [
                            1.2,
                            25.2
                          ],
                          [
                            1.2,
                            15.6
                          ],
                          [
                            298.8,
                            15.6
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
                            0,
                            0,
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
                            174,
                            116.4
                          ],
                          [
                            241.2,
                            116.4
                          ],
                          [
                            241.2,
                            58.8
                          ],
                          [
                            174,
                            58.8
                          ],
                          [
                            174,
                            116.4
                          ]
                        ],
                        [
                          [
                            250.8,
                            49.2
                          ],
                          [
                            250.8,
                            126
                          ],
                          [
                            164.4,
                            126
                          ],
                          [
                            164.4,
                            49.2
                          ],
                          [
                            250.8,
                            49.2
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
                            0,
                            0,
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
                            145.2,
                            250.84
                          ],
                          [
                            154.8,
                            250.84
                          ],
                          [
                            154.8,
                            260.45
                          ],
                          [
                            145.2,
                            260.45
                          ],
                          [
                            145.2,
                            250.84
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
                            0,
                            0,
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
                            125.98,
                            250.84
                          ],
                          [
                            135.59,
                            250.84
                          ],
                          [
                            135.59,
                            260.45
                          ],
                          [
                            125.98,
                            260.45
                          ],
                          [
                            125.98,
                            250.84
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
                            0,
                            0,
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
                            164.41,
                            250.84
                          ],
                          [
                            174.02,
                            250.84
                          ],
                          [
                            174.02,
                            260.45
                          ],
                          [
                            164.41,
                            260.45
                          ],
                          [
                            164.41,
                            250.84
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
                            0,
                            0,
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
                            241.2,
                            58.8
                          ],
                          [
                            241.2,
                            116.4
                          ],
                          [
                            174,
                            116.4
                          ],
                          [
                            174,
                            58.8
                          ],
                          [
                            241.2,
                            58.8
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
                            111,
                            145,
                            111,
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
                          300,
                          0
                        ],
                        [
                          300,
                          300
                        ],
                        [
                          0,
                          300
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