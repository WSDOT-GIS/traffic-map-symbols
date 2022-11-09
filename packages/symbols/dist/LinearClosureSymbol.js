import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
const linearCIMClosureSymbol = new CIMSymbol({
    data: {
        type: "CIMSymbolReference",
        symbol: {
            type: "CIMLineSymbol",
            symbolLayers: [
                {
                    type: "CIMSolidStroke",
                    effects: [
                        {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [30, 30],
                            lineDashEnding: "NoConstraint",
                            offsetAlongLine: 0
                        }
                    ],
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 5,
                    "color": [
                        0,
                        0,
                        0,
                        255
                    ]
                },
                {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "colorLocked": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 4,
                    "color": [
                        255,
                        255,
                        255,
                        255
                    ]
                },
                {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 5,
                    "color": [
                        0,
                        0,
                        0,
                        255
                    ]
                },
                {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 13.5,
                    "color": [
                        243,
                        245,
                        249,
                        255
                    ]
                    /*"color": [
                      243,
                      0,
                      0,
                      255
                    ]*/
                }
            ]
        }
    }
});
const linearCIMClosureIncreasing = new CIMSymbol({
    data: {
        type: "CIMSymbolReference",
        symbol: {
            type: "CIMLineSymbol",
            symbolLayers: [
                {
                    // white dashed layer at center of the line
                    type: "CIMSolidStroke",
                    effects: [
                        {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [30, 30],
                            lineDashEnding: "NoConstraint",
                            offsetAlongLine: 0
                        },
                    ],
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 7,
                    color: [255, 255, 255, 255]
                },
                {
                    // arrow symbol right
                    type: "CIMVectorMarker",
                    enable: true,
                    size: 5,
                    markerPlacement: {
                        type: "CIMMarkerPlacementAlongLineSameSize",
                        offsetAlongLine: 10,
                        placementTemplate: [30],
                        angleToLine: true // symbol will maintain its angle to the line when map is rotated
                    },
                    frame: {
                        xmin: -5,
                        ymin: -5,
                        xmax: 5,
                        ymax: 5
                    },
                    markerGraphics: [{
                            type: "CIMMarkerGraphic",
                            textString: "",
                            primitiveName: "",
                            geometry: {
                                rings: [
                                    [
                                        [
                                            -4,
                                            -5
                                        ],
                                        [
                                            -4,
                                            5
                                        ],
                                        [
                                            5,
                                            0
                                        ],
                                        [
                                            -4,
                                            -5
                                        ]
                                    ]
                                ]
                            },
                            symbol: {
                                // black fill for the arrow symbol
                                type: "CIMPolygonSymbol",
                                symbolLayers: [{
                                        type: "CIMSolidFill",
                                        enable: true,
                                        color: [
                                            0,
                                            0,
                                            0,
                                            255
                                        ]
                                    }]
                            }
                        }]
                },
                {
                    // black layer that surrounds the dashes
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 7,
                    color: [0, 0, 0, 255]
                },
                {
                    // black outline around the line symbol
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 8,
                    color: [0, 0, 0, 255]
                },
                {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 9,
                    "color": [
                        243,
                        245,
                        249,
                        255
                    ]
                    /*"color": [
                      243,
                      0,
                      0,
                      255
                    ]*/
                }
            ]
        }
    }
});
const linearCIMClosureDecreasing = new CIMSymbol({
    data: {
        type: "CIMSymbolReference",
        symbol: {
            type: "CIMLineSymbol",
            symbolLayers: [
                {
                    // white dashed layer at center of the line
                    type: "CIMSolidStroke",
                    effects: [
                        {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [30, 30],
                            lineDashEnding: "NoConstraint",
                            offsetAlongLine: 0
                        },
                    ],
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 7,
                    color: [255, 255, 255, 255]
                },
                {
                    // arrow symbol left
                    type: "CIMVectorMarker",
                    enable: true,
                    size: 5,
                    markerPlacement: {
                        type: "CIMMarkerPlacementAlongLineSameSize",
                        offsetAlongLine: 10,
                        placementTemplate: [30],
                        angleToLine: true // symbol will maintain its angle to the line when map is rotated
                    },
                    frame: {
                        xmin: -5,
                        ymin: -5,
                        xmax: 5,
                        ymax: 5
                    },
                    markerGraphics: [{
                            type: "CIMMarkerGraphic",
                            textString: "",
                            primitiveName: "",
                            geometry: {
                                rings: [
                                    [
                                        [
                                            -4,
                                            0
                                        ],
                                        [
                                            5,
                                            5
                                        ],
                                        [
                                            5,
                                            -5
                                        ],
                                        [
                                            -4,
                                            0
                                        ]
                                    ]
                                ]
                            },
                            symbol: {
                                // black fill for the arrow symbol
                                type: "CIMPolygonSymbol",
                                symbolLayers: [{
                                        type: "CIMSolidFill",
                                        enable: true,
                                        color: [
                                            0,
                                            0,
                                            0,
                                            255
                                        ]
                                    }]
                            }
                        }]
                },
                {
                    // black layer that surrounds the dashes
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 7,
                    color: [0, 0, 0, 255]
                },
                {
                    // black outline around the line symbol
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 9,
                    color: [0, 0, 0, 255]
                },
                {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 13,
                    "color": [
                        243,
                        245,
                        249,
                        255
                    ]
                    /*"color": [
                      243,
                      0,
                      0,
                      255
                    ]*/
                }
            ]
        }
    }
});
const linearCIMClosureBoth = new CIMSymbol({
    data: {
        type: "CIMSymbolReference",
        symbol: {
            type: "CIMLineSymbol",
            symbolLayers: [
                {
                    // white dashed layer at center of the line
                    type: "CIMSolidStroke",
                    effects: [
                        {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [30, 30],
                            lineDashEnding: "NoConstraint",
                            offsetAlongLine: 0
                        },
                    ],
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 7,
                    color: [255, 255, 255, 255]
                },
                /*{
                  // arrow symbol right
                  type: "CIMVectorMarker",
                  enable: true,
                  size: 5,
                  markerPlacement: {
                    type: "CIMMarkerPlacementAlongLineSameSize", // places same size markers along the line
                    offsetAlongLine: 10,
                    placementTemplate: [30, 30], // determines space between each arrow
                    angleToLine: true // symbol will maintain its angle to the line when map is rotated
                  },
                  frame: {
                    xmin: -5,
                    ymin: -5,
                    xmax: 5,
                    ymax: 5
                  },
                  markerGraphics: [{
                    type: "CIMMarkerGraphic",
                    textString:"",
                    primitiveName:"",
                    geometry: {
                      rings: [
                        [
                          [
                            3,
                            -5
                          ],
                          [
                            3,
                            5
                          ],
                          [
                            12,
                            0
                          ],
                          [
                            3,
                            -5
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      // black fill for the arrow symbol
                      type: "CIMPolygonSymbol",
                      symbolLayers: [{
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          0,
                          0,
                          0,
                          255
                        ]
                      }]
                    }
                  }]
                },
                {
                  // arrow symbol left
                  type: "CIMVectorMarker",
                  enable: true,
                  size: 5,
                  markerPlacement: {
                    type: "CIMMarkerPlacementAlongLineSameSize", // places same size markers along the line
                    offsetAlongLine: 10,
                    placementTemplate: [30, 30], // determines space between each arrow
                    angleToLine: true // symbol will maintain its angle to the line when map is rotated
                  },
                  frame: {
                    xmin: -5,
                    ymin: -5,
                    xmax: 5,
                    ymax: 5
                  },
                  markerGraphics: [{
                    type: "CIMMarkerGraphic",
                    textString:"",
                    primitiveName:"",
                    geometry: {
                      rings: [
                        [
                          [
                            -11,
                            0
                          ],
                          [
                            -2,
                            5
                          ],
                          [
                            -2,
                            -5
                          ],
                          [
                            -11,
                            0
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      // black fill for the arrow symbol
                      type: "CIMPolygonSymbol",
                      symbolLayers: [{
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          0,
                          0,
                          0,
                          255
                        ]
                      }]
                    }
                  }]
                },*/
                {
                    // black layer that surrounds the dashes
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 7,
                    color: [0, 0, 0, 255]
                },
                {
                    // black outline around the line symbol
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Miter",
                    width: 8,
                    color: [0, 0, 0, 255]
                },
                {
                    "type": "CIMSolidStroke",
                    "enable": true,
                    "capStyle": "Butt",
                    "joinStyle": "Round",
                    "width": 12,
                    "color": [
                        243,
                        245,
                        249,
                        255
                    ]
                    /*"color": [
                      243,
                      0,
                      0,
                      255
                    ]*/
                }
            ]
        }
    }
});
export { linearCIMClosureSymbol, linearCIMClosureIncreasing, linearCIMClosureDecreasing, linearCIMClosureBoth };
