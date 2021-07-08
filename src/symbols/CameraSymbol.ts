import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

// const symbol = new SimpleMarkerSymbol({
//     size: "12px",
//     color: "black",
//     path: "M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"

// });
const symbol = new CIMSymbol({
    data:
    {
        "type": "CIMSymbolReference",
        "symbol": {
            "type": "CIMPointSymbol",
            "symbolLayers": [
                {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 8,
                    "billboardMode3D": "FaceNearPlane",
                    "frame": {
                        "xmin": 0,
                        "ymin": 0,
                        "xmax": 30,
                        "ymax": 20
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            21.36,
                                            1
                                        ],
                                        [
                                            2.64,
                                            1
                                        ],
                                        [
                                            1.63,
                                            1.19
                                        ],
                                        [
                                            0.77,
                                            1.74
                                        ],
                                        [
                                            0.2,
                                            2.56
                                        ],
                                        [
                                            0,
                                            3.52
                                        ],
                                        [
                                            0,
                                            13.48
                                        ],
                                        [
                                            0.2,
                                            14.44
                                        ],
                                        [
                                            0.77,
                                            15.26
                                        ],
                                        [
                                            1.63,
                                            15.81
                                        ],
                                        [
                                            2.64,
                                            16
                                        ],
                                        [
                                            16.36,
                                            16
                                        ],
                                        [
                                            17.37,
                                            15.81
                                        ],
                                        [
                                            18.23,
                                            15.26
                                        ],
                                        [
                                            18.8,
                                            14.44
                                        ],

                                        [
                                            19,
                                            13.48
                                        ],
                                        [
                                            19,
                                            3.52
                                        ],
                                        [
                                            18.8,
                                            2.56
                                        ],
                                        [
                                            18.23,
                                            1.74
                                        ],
                                        [
                                            17.37,
                                            1.19
                                        ],
                                        [
                                            16.36,
                                            1
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
                                        "joinStyle": "Round",
                                        "lineStyle3D": "Strip",
                                        "miterLimit": 10,
                                        "width": 2,
                                        "color": [
                                            255,
                                            255,
                                            255,
                                            255
                                        ]
                                    },
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
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": 0
                },
                {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 8,
                    "billboardMode3D": "FaceNearPlane",
                    "frame": {
                        "xmin": 0,
                        "ymin": 0,
                        "xmax": 30,
                        "ymax": 20
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            20,
                                            11
                                        ],
                                        [
                                            27,
                                            17
                                        ],
                                        [
                                            30,
                                            17
                                        ],
                                        [
                                            30,
                                            0
                                        ],
                                        [
                                            27,
                                            0
                                        ],
                                        [
                                            20,
                                            6
                                        ],
                                        [
                                            20,
                                            11
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
                                        "joinStyle": "Round",
                                        "lineStyle3D": "Strip",
                                        "miterLimit": 10,
                                        "width": 2,
                                        "color": [
                                            255,
                                            255,
                                            255,
                                            255
                                        ]
                                    },
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
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": 0,
                    "rotation": 0,
                    "offsetY": 0
                }
            ]
        }
    }
});


export const clusterSymbol = new CIMSymbol({
    data:
    {
        "type": "CIMSymbolReference",
        "symbol": {
            "type": "CIMPointSymbol",
            "symbolLayers": [
                {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 8,
                    "billboardMode3D": "FaceNearPlane",
                    "frame": {
                        "xmin": 0,
                        "ymin": 0,
                        "xmax": 30,
                        "ymax": 20
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            21.36,
                                            1
                                        ],
                                        [
                                            2.64,
                                            1
                                        ],
                                        [
                                            1.63,
                                            1.19
                                        ],
                                        [
                                            0.77,
                                            1.74
                                        ],
                                        [
                                            0.2,
                                            2.56
                                        ],
                                        [
                                            0,
                                            3.52
                                        ],
                                        [
                                            0,
                                            13.48
                                        ],
                                        [
                                            0.2,
                                            14.44
                                        ],
                                        [
                                            0.77,
                                            15.26
                                        ],
                                        [
                                            1.63,
                                            15.81
                                        ],
                                        [
                                            2.64,
                                            16
                                        ],
                                        [
                                            16.36,
                                            16
                                        ],
                                        [
                                            17.37,
                                            15.81
                                        ],
                                        [
                                            18.23,
                                            15.26
                                        ],
                                        [
                                            18.8,
                                            14.44
                                        ],

                                        [
                                            19,
                                            13.48
                                        ],
                                        [
                                            19,
                                            3.52
                                        ],
                                        [
                                            18.8,
                                            2.56
                                        ],
                                        [
                                            18.23,
                                            1.74
                                        ],
                                        [
                                            17.37,
                                            1.19
                                        ],
                                        [
                                            16.36,
                                            1
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
                                        "joinStyle": "Round",
                                        "lineStyle3D": "Strip",
                                        "miterLimit": 10,
                                        "width": 0,
                                        "color": [
                                            0,
                                            0,
                                            0,
                                            255
                                        ]
                                    },
                                    {
                                        "type": "CIMSolidFill",
                                        "enable": true,
                                        "color": [
                                            0,
                                            123,
                                            95,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": 0
                },
                {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 8,
                    "billboardMode3D": "FaceNearPlane",
                    "frame": {
                        "xmin": 0,
                        "ymin": 0,
                        "xmax": 30,
                        "ymax": 20
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            20,
                                            11
                                        ],
                                        [
                                            27,
                                            17
                                        ],
                                        [
                                            30,
                                            17
                                        ],
                                        [
                                            30,
                                            0
                                        ],
                                        [
                                            27,
                                            0
                                        ],
                                        [
                                            20,
                                            6
                                        ],
                                        [
                                            20,
                                            11
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
                                        "joinStyle": "Round",
                                        "lineStyle3D": "Strip",
                                        "miterLimit": 10,
                                        "width": 0,
                                        "color": [
                                            0,
                                            0,
                                            0,
                                            255
                                        ]
                                    },
                                    {
                                        "type": "CIMSolidFill",
                                        "enable": true,
                                        "color": [
                                            0,
                                            123,
                                            95,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": 0,
                    "rotation": 0,
                    "offsetY": 0
                },
                // {
                //     "type": "CIMVectorMarker",
                //     "enable": true,
                //     "anchorPoint": {
                //         "x": 0,
                //         "y": 0
                //     },
                //     "anchorPointUnits": "Relative",
                //     "dominantSizeAxis3D": "Y",
                //     "size": 16,
                //     "billboardMode3D": "FaceNearPlane",
                //     "frame": {
                //         "xmin": 0,
                //         "ymin": 0,
                //         "xmax": 17,
                //         "ymax": 17
                //     },
                //     "markerGraphics": [
                //         {
                //             "type": "CIMMarkerGraphic",
                //             "geometry": {
                //                 "rings": [
                //                     [
                //                         [
                //                             8.5,
                //                             0
                //                         ],
                //                         [
                //                             7.02,
                //                             0.13
                //                         ],
                //                         [
                //                             5.59,
                //                             0.51
                //                         ],
                //                         [
                //                             4.25,
                //                             1.14
                //                         ],
                //                         [
                //                             3.04,
                //                             1.99
                //                         ],
                //                         [
                //                             1.99,
                //                             3.04
                //                         ],
                //                         [
                //                             1.14,
                //                             4.25
                //                         ],
                //                         [
                //                             0.51,
                //                             5.59
                //                         ],
                //                         [
                //                             0.13,
                //                             7.02
                //                         ],
                //                         [
                //                             0,
                //                             8.5
                //                         ],
                //                         [
                //                             0.13,
                //                             9.98
                //                         ],
                //                         [
                //                             0.51,
                //                             11.41
                //                         ],
                //                         [
                //                             1.14,
                //                             12.75
                //                         ],
                //                         [
                //                             1.99,
                //                             13.96
                //                         ],
                //                         [
                //                             3.04,
                //                             15.01
                //                         ],
                //                         [
                //                             4.25,
                //                             15.86
                //                         ],
                //                         [
                //                             5.59,
                //                             16.49
                //                         ],
                //                         [
                //                             7.02,
                //                             16.87
                //                         ],
                //                         [
                //                             8.5,
                //                             17
                //                         ],
                //                         [
                //                             9.98,
                //                             16.87
                //                         ],
                //                         [
                //                             11.41,
                //                             16.49
                //                         ],
                //                         [
                //                             12.75,
                //                             15.86
                //                         ],
                //                         [
                //                             13.96,
                //                             15.01
                //                         ],
                //                         [
                //                             15.01,
                //                             13.96
                //                         ],
                //                         [
                //                             15.86,
                //                             12.75
                //                         ],
                //                         [
                //                             16.49,
                //                             11.41
                //                         ],
                //                         [
                //                             16.87,
                //                             9.98
                //                         ],
                //                         [
                //                             17,
                //                             8.5
                //                         ],
                //                         [
                //                             16.87,
                //                             7.02
                //                         ],
                //                         [
                //                             16.49,
                //                             5.59
                //                         ],
                //                         [
                //                             15.86,
                //                             4.25
                //                         ],
                //                         [
                //                             15.01,
                //                             3.04
                //                         ],
                //                         [
                //                             13.96,
                //                             1.99
                //                         ],
                //                         [
                //                             12.75,
                //                             1.14
                //                         ],
                //                         [
                //                             11.41,
                //                             0.51
                //                         ],
                //                         [
                //                             9.98,
                //                             0.13
                //                         ],
                //                         [
                //                             8.5,
                //                             0
                //                         ]
                //                     ]
                //                 ]
                //             },
                //             "symbol": {
                //                 "type": "CIMPolygonSymbol",
                //                 "symbolLayers": [
                //                     {
                //                         "type": "CIMSolidStroke",
                //                         "enable": true,
                //                         "capStyle": "Round",
                //                         "joinStyle": "Round",
                //                         "lineStyle3D": "Strip",
                //                         "miterLimit": 10,
                //                         "width": 0,
                //                         "color": [
                //                             0,
                //                             0,
                //                             0,
                //                             255
                //                         ]
                //                     },
                //                     {
                //                         "type": "CIMSolidFill",
                //                         "enable": true,
                //                         "color": [
                //                             114,
                //                             160,
                //                             193,
                //                             255
                //                         ]
                //                     }
                //                 ]
                //             }
                //         }
                //     ],
                //     "scaleSymbolsProportionally": true,
                //     "respectFrame": true
                // }
            ]
        }
    }
});


export default symbol