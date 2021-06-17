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
                        "xmax": 28,
                        "ymax": 17
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            23.36,
                                            0
                                        ],
                                        [
                                            2.64,
                                            0
                                        ],
                                        [
                                            1.63,
                                            0.19
                                        ],
                                        [
                                            0.77,
                                            0.74
                                        ],
                                        [
                                            0.2,
                                            1.56
                                        ],
                                        [
                                            0,
                                            2.52
                                        ],
                                        [
                                            0,
                                            14.48
                                        ],
                                        [
                                            0.2,
                                            15.44
                                        ],
                                        [
                                            0.77,
                                            16.26
                                        ],
                                        [
                                            1.63,
                                            16.81
                                        ],
                                        [
                                            2.64,
                                            17
                                        ],
                                        [
                                            23.36,
                                            17
                                        ],
                                        [
                                            24.37,
                                            16.81
                                        ],
                                        [
                                            25.23,
                                            16.26
                                        ],
                                        [
                                            25.8,
                                            15.44
                                        ],
                                        [
                                            26,
                                            14.48
                                        ],
                                        [
                                            26,
                                            2.52
                                        ],
                                        [
                                            25.8,
                                            1.56
                                        ],
                                        [
                                            25.23,
                                            0.74
                                        ],
                                        [
                                            24.37,
                                            0.19
                                        ],
                                        [
                                            23.36,
                                            0
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
                                            51,
                                            51,
                                            51,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": -2
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
                        "xmax": 17,
                        "ymax": 17
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            0,
                                            0.65
                                        ],
                                        [
                                            8.5,
                                            16.35
                                        ],
                                        [
                                            17,
                                            0.65
                                        ],
                                        [
                                            0,
                                            0.65
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
                                            51,
                                            51,
                                            51,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": 7,
                    "rotation": -28,
                    "offsetY": 1
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
                        "xmax": 28,
                        "ymax": 17
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            23.36,
                                            0
                                        ],
                                        [
                                            2.64,
                                            0
                                        ],
                                        [
                                            1.63,
                                            0.19
                                        ],
                                        [
                                            0.77,
                                            0.74
                                        ],
                                        [
                                            0.2,
                                            1.56
                                        ],
                                        [
                                            0,
                                            2.52
                                        ],
                                        [
                                            0,
                                            14.48
                                        ],
                                        [
                                            0.2,
                                            15.44
                                        ],
                                        [
                                            0.77,
                                            16.26
                                        ],
                                        [
                                            1.63,
                                            16.81
                                        ],
                                        [
                                            2.64,
                                            17
                                        ],
                                        [
                                            23.36,
                                            17
                                        ],
                                        [
                                            24.37,
                                            16.81
                                        ],
                                        [
                                            25.23,
                                            16.26
                                        ],
                                        [
                                            25.8,
                                            15.44
                                        ],
                                        [
                                            26,
                                            14.48
                                        ],
                                        [
                                            26,
                                            2.52
                                        ],
                                        [
                                            25.8,
                                            1.56
                                        ],
                                        [
                                            25.23,
                                            0.74
                                        ],
                                        [
                                            24.37,
                                            0.19
                                        ],
                                        [
                                            23.36,
                                            0
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
                                            41,
                                            72,
                                            135,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": -2
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
                        "xmax": 17,
                        "ymax": 17
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            0,
                                            0.65
                                        ],
                                        [
                                            8.5,
                                            16.35
                                        ],
                                        [
                                            17,
                                            0.65
                                        ],
                                        [
                                            0,
                                            0.65
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
                                            41,
                                            72,
                                            135,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true,
                    "offsetX": 7,
                    "rotation": -28,
                    "offsetY": 1
                },
                {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPoint": {
                        "x": 0,
                        "y": 0
                    },
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 21,
                    "billboardMode3D": "FaceNearPlane",
                    "frame": {
                        "xmin": 0,
                        "ymin": 0,
                        "xmax": 17,
                        "ymax": 17
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            8.5,
                                            0
                                        ],
                                        [
                                            7.02,
                                            0.13
                                        ],
                                        [
                                            5.59,
                                            0.51
                                        ],
                                        [
                                            4.25,
                                            1.14
                                        ],
                                        [
                                            3.04,
                                            1.99
                                        ],
                                        [
                                            1.99,
                                            3.04
                                        ],
                                        [
                                            1.14,
                                            4.25
                                        ],
                                        [
                                            0.51,
                                            5.59
                                        ],
                                        [
                                            0.13,
                                            7.02
                                        ],
                                        [
                                            0,
                                            8.5
                                        ],
                                        [
                                            0.13,
                                            9.98
                                        ],
                                        [
                                            0.51,
                                            11.41
                                        ],
                                        [
                                            1.14,
                                            12.75
                                        ],
                                        [
                                            1.99,
                                            13.96
                                        ],
                                        [
                                            3.04,
                                            15.01
                                        ],
                                        [
                                            4.25,
                                            15.86
                                        ],
                                        [
                                            5.59,
                                            16.49
                                        ],
                                        [
                                            7.02,
                                            16.87
                                        ],
                                        [
                                            8.5,
                                            17
                                        ],
                                        [
                                            9.98,
                                            16.87
                                        ],
                                        [
                                            11.41,
                                            16.49
                                        ],
                                        [
                                            12.75,
                                            15.86
                                        ],
                                        [
                                            13.96,
                                            15.01
                                        ],
                                        [
                                            15.01,
                                            13.96
                                        ],
                                        [
                                            15.86,
                                            12.75
                                        ],
                                        [
                                            16.49,
                                            11.41
                                        ],
                                        [
                                            16.87,
                                            9.98
                                        ],
                                        [
                                            17,
                                            8.5
                                        ],
                                        [
                                            16.87,
                                            7.02
                                        ],
                                        [
                                            16.49,
                                            5.59
                                        ],
                                        [
                                            15.86,
                                            4.25
                                        ],
                                        [
                                            15.01,
                                            3.04
                                        ],
                                        [
                                            13.96,
                                            1.99
                                        ],
                                        [
                                            12.75,
                                            1.14
                                        ],
                                        [
                                            11.41,
                                            0.51
                                        ],
                                        [
                                            9.98,
                                            0.13
                                        ],
                                        [
                                            8.5,
                                            0
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
                                            114,
                                            160,
                                            193,
                                            255
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true
                }
            ]
        }
    }
});
// const symbol2 = new CIMSymbol({
//     data: {
//         "type": "CIMSymbolReference",
//         "symbol": {
//             "type": "CIMPointSymbol",
//             "symbolLayers": [
//                 {
//                     "type": "CIMVectorMarker",
//                     "enable": true,
//                     "anchorPointUnits": "Relative",
//                     "dominantSizeAxis3D": "Y",
//                     "size": 19,
//                     "billboardMode3D": "FaceNearPlane",
//                     "frame": {
//                         "xmin": 0,
//                         "ymin": 0,
//                         "xmax": 21,
//                         "ymax": 21
//                     },
//                     "markerGraphics": [
//                         {
//                             "type": "CIMMarkerGraphic",
//                             "geometry": {
//                                 "rings": [
//                                     [
//                                         [
//                                             14,
//                                             17
//                                         ],
//                                         [
//                                             15,
//                                             14
//                                         ],
//                                         [
//                                             18,
//                                             14
//                                         ],
//                                         [
//                                             18,
//                                             5
//                                         ],
//                                         [
//                                             3,
//                                             5
//                                         ],
//                                         [
//                                             3,
//                                             14
//                                         ],
//                                         [
//                                             4,
//                                             14
//                                         ],
//                                         [
//                                             4,
//                                             15
//                                         ],
//                                         [
//                                             6,
//                                             15
//                                         ],
//                                         [
//                                             6,
//                                             14
//                                         ],
//                                         [
//                                             8,
//                                             14
//                                         ],
//                                         [
//                                             9,
//                                             17
//                                         ],
//                                         [
//                                             14,
//                                             17
//                                         ]
//                                     ],
//                                     [
//                                         [
//                                             10,
//                                             16
//                                         ],
//                                         [
//                                             10,
//                                             15
//                                         ],
//                                         [
//                                             13,
//                                             15
//                                         ],
//                                         [
//                                             13,
//                                             16
//                                         ],
//                                         [
//                                             10,
//                                             16
//                                         ]
//                                     ],
//                                     [
//                                         [
//                                             4,
//                                             13
//                                         ],
//                                         [
//                                             4,
//                                             12
//                                         ],
//                                         [
//                                             6,
//                                             12
//                                         ],
//                                         [
//                                             6,
//                                             13
//                                         ],
//                                         [
//                                             4,
//                                             13
//                                         ]
//                                     ],
//                                     [
//                                         [
//                                             8.1,
//                                             9.5
//                                         ],
//                                         [
//                                             8.16,
//                                             8.84
//                                         ],
//                                         [
//                                             8.36,
//                                             8.2
//                                         ],
//                                         [
//                                             8.67,
//                                             7.61
//                                         ],
//                                         [
//                                             9.09,
//                                             7.09
//                                         ],
//                                         [
//                                             9.61,
//                                             6.67
//                                         ],
//                                         [
//                                             10.2,
//                                             6.36
//                                         ],
//                                         [
//                                             10.84,
//                                             6.16
//                                         ],
//                                         [
//                                             11.5,
//                                             6.1
//                                         ],
//                                         [
//                                             12.16,
//                                             6.16
//                                         ],
//                                         [
//                                             12.8,
//                                             6.36
//                                         ],
//                                         [
//                                             13.39,
//                                             6.67
//                                         ],
//                                         [
//                                             13.91,
//                                             7.09
//                                         ],
//                                         [
//                                             14.33,
//                                             7.61
//                                         ],
//                                         [
//                                             14.64,
//                                             8.2
//                                         ],
//                                         [
//                                             14.84,
//                                             8.84
//                                         ],
//                                         [
//                                             14.9,
//                                             9.5
//                                         ],
//                                         [
//                                             14.84,
//                                             10.16
//                                         ],
//                                         [
//                                             14.64,
//                                             10.8
//                                         ],
//                                         [
//                                             14.33,
//                                             11.39
//                                         ],
//                                         [
//                                             13.91,
//                                             11.91
//                                         ],
//                                         [
//                                             13.39,
//                                             12.33
//                                         ],
//                                         [
//                                             12.8,
//                                             12.64
//                                         ],
//                                         [
//                                             12.16,
//                                             12.84
//                                         ],
//                                         [
//                                             11.5,
//                                             12.9
//                                         ],
//                                         [
//                                             10.84,
//                                             12.84
//                                         ],
//                                         [
//                                             10.2,
//                                             12.64
//                                         ],
//                                         [
//                                             9.61,
//                                             12.33
//                                         ],
//                                         [
//                                             9.09,
//                                             11.91
//                                         ],
//                                         [
//                                             8.67,
//                                             11.39
//                                         ],
//                                         [
//                                             8.36,
//                                             10.8
//                                         ],
//                                         [
//                                             8.16,
//                                             10.16
//                                         ],
//                                         [
//                                             8.1,
//                                             9.5
//                                         ]
//                                     ],
//                                     [
//                                         [
//                                             11.5,
//                                             7.15
//                                         ],
//                                         [
//                                             10.6,
//                                             7.33
//                                         ],
//                                         [
//                                             9.84,
//                                             7.84
//                                         ],
//                                         [
//                                             9.33,
//                                             8.6
//                                         ],
//                                         [
//                                             9.15,
//                                             9.5
//                                         ],
//                                         [
//                                             9.33,
//                                             10.4
//                                         ],
//                                         [
//                                             9.84,
//                                             11.16
//                                         ],
//                                         [
//                                             10.6,
//                                             11.67
//                                         ],
//                                         [
//                                             11.5,
//                                             11.85
//                                         ],
//                                         [
//                                             12.4,
//                                             11.67
//                                         ],
//                                         [
//                                             13.16,
//                                             11.16
//                                         ],
//                                         [
//                                             13.67,
//                                             10.4
//                                         ],
//                                         [
//                                             13.85,
//                                             9.5
//                                         ],
//                                         [
//                                             13.67,
//                                             8.6
//                                         ],
//                                         [
//                                             13.16,
//                                             7.84
//                                         ],
//                                         [
//                                             12.4,
//                                             7.33
//                                         ],
//                                         [
//                                             11.5,
//                                             7.15
//                                         ]
//                                     ]
//                                 ]
//                             },
//                             "symbol": {
//                                 "type": "CIMPolygonSymbol",
//                                 "symbolLayers": [
//                                     {
//                                         "type": "CIMSolidStroke",
//                                         "enable": true,
//                                         "capStyle": "Round",
//                                         "joinStyle": "Round",
//                                         "lineStyle3D": "Strip",
//                                         "miterLimit": 10,
//                                         "width": 0,
//                                         "color": [
//                                             110,
//                                             110,
//                                             110,
//                                             255
//                                         ]
//                                     },
//                                     {
//                                         "type": "CIMSolidFill",
//                                         "enable": true,
//                                         "color": [
//                                             51,
//                                             51,
//                                             51,
//                                             255
//                                         ]
//                                     }
//                                 ]
//                             }
//                         }
//                     ],
//                     "scaleSymbolsProportionally": true,
//                     "respectFrame": true
//                 },
//                 {
//                     "type": "CIMVectorMarker",
//                     "enable": true,
//                     "anchorPointUnits": "Relative",
//                     "dominantSizeAxis3D": "Y",
//                     "size": 16,
//                     "billboardMode3D": "FaceNearPlane",
//                     "frame": {
//                         "xmin": 0,
//                         "ymin": 0,
//                         "xmax": 17,
//                         "ymax": 17
//                     },
//                     "markerGraphics": [
//                         {
//                             "type": "CIMMarkerGraphic",
//                             "geometry": {
//                                 "rings": [
//                                     [
//                                         [
//                                             11.77,
//                                             0
//                                         ],
//                                         [
//                                             5.23,
//                                             0
//                                         ],
//                                         [
//                                             4.21,
//                                             0.1
//                                         ],
//                                         [
//                                             3.24,
//                                             0.4
//                                         ],
//                                         [
//                                             2.33,
//                                             0.88
//                                         ],
//                                         [
//                                             1.54,
//                                             1.54
//                                         ],
//                                         [
//                                             0.88,
//                                             2.33
//                                         ],
//                                         [
//                                             0.4,
//                                             3.24
//                                         ],
//                                         [
//                                             0.1,
//                                             4.21
//                                         ],
//                                         [
//                                             0,
//                                             5.23
//                                         ],
//                                         [
//                                             0,
//                                             11.77
//                                         ],
//                                         [
//                                             0.1,
//                                             12.79
//                                         ],
//                                         [
//                                             0.4,
//                                             13.77
//                                         ],
//                                         [
//                                             0.88,
//                                             14.67
//                                         ],
//                                         [
//                                             1.54,
//                                             15.46
//                                         ],
//                                         [
//                                             2.33,
//                                             16.12
//                                         ],
//                                         [
//                                             3.23,
//                                             16.6
//                                         ],
//                                         [
//                                             4.21,
//                                             16.9
//                                         ],
//                                         [
//                                             5.23,
//                                             17
//                                         ],
//                                         [
//                                             11.77,
//                                             17
//                                         ],
//                                         [
//                                             12.79,
//                                             16.9
//                                         ],
//                                         [
//                                             13.77,
//                                             16.6
//                                         ],
//                                         [
//                                             14.67,
//                                             16.12
//                                         ],
//                                         [
//                                             15.46,
//                                             15.46
//                                         ],
//                                         [
//                                             16.12,
//                                             14.67
//                                         ],
//                                         [
//                                             16.6,
//                                             13.77
//                                         ],
//                                         [
//                                             16.9,
//                                             12.79
//                                         ],
//                                         [
//                                             17,
//                                             11.77
//                                         ],
//                                         [
//                                             17,
//                                             5.23
//                                         ],
//                                         [
//                                             16.9,
//                                             4.21
//                                         ],
//                                         [
//                                             16.6,
//                                             3.24
//                                         ],
//                                         [
//                                             16.12,
//                                             2.33
//                                         ],
//                                         [
//                                             15.46,
//                                             1.54
//                                         ],
//                                         [
//                                             14.67,
//                                             0.88
//                                         ],
//                                         [
//                                             13.76,
//                                             0.4
//                                         ],
//                                         [
//                                             12.79,
//                                             0.1
//                                         ],
//                                         [
//                                             11.77,
//                                             0
//                                         ]
//                                     ]
//                                 ]
//                             },
//                             "symbol": {
//                                 "type": "CIMPolygonSymbol",
//                                 "symbolLayers": [
//                                     {
//                                         "type": "CIMSolidStroke",
//                                         "enable": true,
//                                         "capStyle": "Round",
//                                         "joinStyle": "Round",
//                                         "lineStyle3D": "Strip",
//                                         "miterLimit": 10,
//                                         "width": 1,
//                                         "color": [
//                                             176,
//                                             176,
//                                             176,
//                                             255
//                                         ]
//                                     },
//                                     {
//                                         "type": "CIMSolidFill",
//                                         "enable": true,
//                                         "color": [
//                                             255,
//                                             255,
//                                             255,
//                                             255
//                                         ]
//                                     }
//                                 ]
//                             }
//                         }
//                     ],
//                     "scaleSymbolsProportionally": true,
//                     "respectFrame": true
//                 }
//             ]
//         }
//     }
// })

export default symbol