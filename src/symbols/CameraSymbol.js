define(["require", "exports", "tslib", "@arcgis/core/symbols/CIMSymbol"], function (require, exports, tslib_1, CIMSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clusterSymbol = void 0;
    CIMSymbol_1 = tslib_1.__importDefault(CIMSymbol_1);
    // import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
    // const symbol = new SimpleMarkerSymbol({
    //     size: "12px",
    //     color: "black",
    //     path: "M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
    // });
    var symbol = new CIMSymbol_1.default({
        data: {
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
    exports.clusterSymbol = new CIMSymbol_1.default({
        data: {
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
                ]
            }
        }
    });
    exports.default = symbol;
});
//# sourceMappingURL=CameraSymbol.js.map