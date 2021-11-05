import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";

const symbol = new CIMSymbol({
    data:
    {
        "type": "CIMSymbolReference",
        "symbol":
        {
            "type": "CIMPointSymbol",
            "symbolLayers": [
                {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 24,
                    "billboardMode3D": "FaceNearPlane",
                    "frame": {
                        "xmin": 0,
                        "ymin": 0,
                        "xmax": 30,
                        "ymax": 30
                    },
                    "markerGraphics": [
                        {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                                "rings": [
                                    [
                                        [
                                            15,
                                            0
                                        ],
                                        [
                                            17.3,
                                            0.2
                                        ],
                                        [
                                            19.6,
                                            0.7
                                        ],
                                        [
                                            21.8,
                                            1.6
                                        ],
                                        [
                                            23.8,
                                            2.9
                                        ],
                                        [
                                            25.6,
                                            4.4
                                        ],
                                        [
                                            27.1,
                                            6.2
                                        ],
                                        [
                                            28.4,
                                            8.2
                                        ],
                                        [
                                            29.3,
                                            10.4
                                        ],
                                        [
                                            29.8,
                                            12.7
                                        ],
                                        [
                                            30,
                                            15
                                        ],
                                        [
                                            29.8,
                                            17.3
                                        ],
                                        [
                                            29.3,
                                            19.6
                                        ],
                                        [
                                            28.4,
                                            21.8
                                        ],
                                        [
                                            27.1,
                                            23.8
                                        ],
                                        [
                                            25.6,
                                            25.6
                                        ],
                                        [
                                            23.8,
                                            27.1
                                        ],
                                        [
                                            21.8,
                                            28.4
                                        ],
                                        [
                                            19.6,
                                            29.3
                                        ],
                                        [
                                            17.3,
                                            29.8
                                        ],
                                        [
                                            15,
                                            30
                                        ],
                                        [
                                            12.7,
                                            29.8
                                        ],
                                        [
                                            10.4,
                                            29.3
                                        ],
                                        [
                                            8.2,
                                            28.4
                                        ],
                                        [
                                            6.2,
                                            27.1
                                        ],
                                        [
                                            4.4,
                                            25.6
                                        ],
                                        [
                                            2.9,
                                            23.8
                                        ],
                                        [
                                            1.6,
                                            21.8
                                        ],
                                        [
                                            0.7,
                                            19.6
                                        ],
                                        [
                                            0.2,
                                            17.3
                                        ],
                                        [
                                            0,
                                            15
                                        ],
                                        [
                                            0.2,
                                            12.7
                                        ],
                                        [
                                            0.7,
                                            10.4
                                        ],
                                        [
                                            1.6,
                                            8.2
                                        ],
                                        [
                                            2.9,
                                            6.2
                                        ],
                                        [
                                            4.4,
                                            4.4
                                        ],
                                        [
                                            6.2,
                                            2.9
                                        ],
                                        [
                                            8.2,
                                            1.6
                                        ],
                                        [
                                            10.4,
                                            0.7
                                        ],
                                        [
                                            12.7,
                                            0.2
                                        ],
                                        [
                                            15,
                                            0
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
                                            123,
                                            95,
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
                                            15,
                                            2.31
                                        ],
                                        [
                                            17.56,
                                            2.56
                                        ],
                                        [
                                            20,
                                            3.29
                                        ],
                                        [
                                            22.26,
                                            4.48
                                        ],
                                        [
                                            24.25,
                                            6.09
                                        ],
                                        [
                                            25.88,
                                            8.05
                                        ],
                                        [
                                            27.09,
                                            10.28
                                        ],
                                        [
                                            27.83,
                                            12.69
                                        ],
                                        [
                                            28.08,
                                            15.21
                                        ],
                                        [
                                            27.83,
                                            17.73
                                        ],
                                        [
                                            27.09,
                                            20.14
                                        ],
                                        [
                                            25.88,
                                            22.37
                                        ],
                                        [
                                            24.25,
                                            24.33
                                        ],
                                        [
                                            22.26,
                                            25.94
                                        ],
                                        [
                                            20,
                                            27.13
                                        ],
                                        [
                                            17.56,
                                            27.86
                                        ],
                                        [
                                            15,
                                            28.11
                                        ],
                                        [
                                            12.44,
                                            27.86
                                        ],
                                        [
                                            10,
                                            27.13
                                        ],
                                        [
                                            7.74,
                                            25.94
                                        ],
                                        [
                                            5.75,
                                            24.33
                                        ],
                                        [
                                            4.12,
                                            22.37
                                        ],
                                        [
                                            2.91,
                                            20.14
                                        ],
                                        [
                                            2.17,
                                            17.73
                                        ],
                                        [
                                            1.92,
                                            15.21
                                        ],
                                        [
                                            2.17,
                                            12.69
                                        ],
                                        [
                                            2.91,
                                            10.28
                                        ],
                                        [
                                            4.12,
                                            8.05
                                        ],
                                        [
                                            5.75,
                                            6.09
                                        ],
                                        [
                                            7.74,
                                            4.48
                                        ],
                                        [
                                            10,
                                            3.29
                                        ],
                                        [
                                            12.44,
                                            2.56
                                        ],
                                        [
                                            15,
                                            2.31
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
                                            123,
                                            95,
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
                                            28.08,
                                            15.21
                                        ],
                                        [
                                            27.83,
                                            12.69
                                        ],
                                        [
                                            27.09,
                                            10.28
                                        ],
                                        [
                                            25.88,
                                            8.05
                                        ],
                                        [
                                            24.25,
                                            6.09
                                        ],
                                        [
                                            22.26,
                                            4.48
                                        ],
                                        [
                                            20,
                                            3.29
                                        ],
                                        [
                                            17.56,
                                            2.56
                                        ],
                                        [
                                            15,
                                            2.31
                                        ],
                                        [
                                            12.44,
                                            2.56
                                        ],
                                        [
                                            10,
                                            3.29
                                        ],
                                        [
                                            7.74,
                                            4.48
                                        ],
                                        [
                                            5.75,
                                            6.09
                                        ],
                                        [
                                            4.12,
                                            8.05
                                        ],
                                        [
                                            2.91,
                                            10.28
                                        ],
                                        [
                                            2.17,
                                            12.69
                                        ],
                                        [
                                            1.92,
                                            15.21
                                        ],
                                        [
                                            2.17,
                                            17.73
                                        ],
                                        [
                                            2.91,
                                            20.14
                                        ],
                                        [
                                            4.12,
                                            22.37
                                        ],
                                        [
                                            5.75,
                                            24.33
                                        ],
                                        [
                                            7.74,
                                            25.94
                                        ],
                                        [
                                            10,
                                            27.13
                                        ],
                                        [
                                            12.44,
                                            27.86
                                        ],
                                        [
                                            15,
                                            28.11
                                        ],
                                        [
                                            17.56,
                                            27.86
                                        ],
                                        [
                                            20,
                                            27.13
                                        ],
                                        [
                                            22.26,
                                            25.94
                                        ],
                                        [
                                            24.25,
                                            24.33
                                        ],
                                        [
                                            25.88,
                                            22.37
                                        ],
                                        [
                                            27.09,
                                            20.14
                                        ],
                                        [
                                            27.83,
                                            17.73
                                        ],
                                        [
                                            28.08,
                                            15.21
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
                                            6,
                                            7
                                        ],
                                        [
                                            8,
                                            7
                                        ],
                                        [
                                            19,
                                            7
                                        ],
                                        [
                                            21,
                                            7
                                        ],
                                        [
                                            21,
                                            22
                                        ],
                                        [
                                            19,
                                            22
                                        ],
                                        [
                                            8,
                                            22
                                        ],
                                        [
                                            6,
                                            22
                                        ],
                                        [
                                            6,
                                            7
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
                                            25.5,
                                            10
                                        ],
                                        [
                                            26,
                                            10.5
                                        ],
                                        [
                                            26,
                                            19.5
                                        ],
                                        [
                                            25.5,
                                            20
                                        ],
                                        [
                                            24.78,
                                            20
                                        ],
                                        [
                                            24.42,
                                            19.85
                                        ],
                                        [
                                            21.15,
                                            16.57
                                        ],
                                        [
                                            21,
                                            16.22
                                        ],
                                        [
                                            21,
                                            13.78
                                        ],
                                        [
                                            21.15,
                                            13.42
                                        ],
                                        [
                                            24.42,
                                            10.15
                                        ],
                                        [
                                            24.78,
                                            10
                                        ],
                                        [
                                            25.5,
                                            10
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
                                        30,
                                        0
                                    ],
                                    [
                                        30,
                                        30
                                    ],
                                    [
                                        0,
                                        30
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
});

export default symbol;