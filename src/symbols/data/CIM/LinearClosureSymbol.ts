
const linearCIMClosureSymbol: __esri.CIMSymbolProperties = {
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
              dashTemplate: [30, 30], // width of dashes and spacing between the dashes
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
}
const linearCIMClosureIncreasing: __esri.CIMSymbolProperties = {
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
              dashTemplate: [30, 30], // width of dashes and spacing between the dashes
              lineDashEnding: "NoConstraint",
              offsetAlongLine: 0
            },
          ],
          enable: true, // must be set to true in order for the symbol layer to be visible
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 7,
          color: [255, 255, 255, 255]
        },
        {
          type: "CIMVectorMarker",
          enable: true,
          size: 5,
          markerPlacement: {
            type: "CIMMarkerPlacementAlongLineSameSize", // places same size markers along the line
            offsetAlongLine: 10,
            placementTemplate: [30], // determines space between each arrow
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
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 7,
          color: [0,0, 0, 255]
        },
        {
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
}
const linearCIMClosureDecreasing: __esri.CIMSymbolProperties = {
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
              dashTemplate: [30, 30], // width of dashes and spacing between the dashes
              lineDashEnding: "NoConstraint",
              offsetAlongLine: 0
            },
          ],
          enable: true, // must be set to true in order for the symbol layer to be visible
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 7,
          color: [255, 255, 255, 255]
        },
        {
          type: "CIMVectorMarker",
          enable: true,
          size: 5,
          markerPlacement: {
            type: "CIMMarkerPlacementAlongLineSameSize", // places same size markers along the line
            offsetAlongLine: 10,
            placementTemplate: [30], // determines space between each arrow
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
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 7,
          color: [0,0, 0, 255]
        },
        {
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
}
const linearCIMClosureBoth: __esri.CIMSymbolProperties = {
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
              dashTemplate: [30, 30], // width of dashes and spacing between the dashes
              lineDashEnding: "NoConstraint",
              offsetAlongLine: 0
            },
          ],
          enable: true, // must be set to true in order for the symbol layer to be visible
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 7,
          color: [255, 255, 255, 255]
        },
        /*{
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
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 7,
          color: [0,0, 0, 255]
        },
        {
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
}
export { linearCIMClosureSymbol, linearCIMClosureIncreasing, linearCIMClosureDecreasing, linearCIMClosureBoth}
