const symbol = {
  data: {
    type: "CIMSymbolReference",
    symbol: {
      type: "CIMPointSymbol",
      symbolLayers: [
        {
          type: "CIMVectorMarker",
          enable: true,

          size: 24,
          offsetY: 12, //Half of symbol height

          frame: {
            xmin: 0,
            ymin: 0,
            xmax: 300,
            ymax: 300,
          },
          markerGraphics: [
            {
              type: "CIMMarkerGraphic",
              textString: "",
              primitiveName: "",
              geometry: {
                rings: [
                  [
                    [150, 0.7],
                    [299.3, 150],
                    [150, 299.3],
                    [0.7, 150],
                    [150, 0.7],
                  ],
                ],
              },
              symbol: {
                type: "CIMPolygonSymbol",
                symbolLayers: [
                  {
                    type: "CIMSolidFill",
                    enable: true,
                    color: [255, 255, 255, 255],
                  },
                ],
              },
            },
            {
              type: "CIMMarkerGraphic",
              textString: "",
              primitiveName: "",
              geometry: {
                rings: [
                  [
                    [150, 0.7],
                    [299.3, 150],
                    [150, 299.3],
                    [0.7, 150],
                    [150, 0.7],
                  ],
                ],
              },
              symbol: {
                type: "CIMPolygonSymbol",
                symbolLayers: [
                  {
                    type: "CIMSolidStroke",
                    enable: true,
                    capStyle: "Butt",
                    joinStyle: "Round",
                    width: 1.3179999589920046,
                    color: [0, 0, 0, 255],
                  },
                ],
              },
            },
            {
              type: "CIMMarkerGraphic",
              textString: "",
              primitiveName: "",
              geometry: {
                rings: [
                  [
                    [116.9, 114.2],
                    [119.9, 113.8],
                    [122.9, 114.2],
                    [125.6, 115.3],
                    [127.9, 117],
                    [129.4, 118.9],
                    [130.5, 121.4],
                    [130.9, 122.9],
                    [134.1, 123],
                    [137.3, 123.1],
                    [137.3, 125],
                    [137.8, 127.2],
                    [149.4, 127.5],
                    [159.6, 127.5],
                    [118.1, 168.9],
                    [116.9, 167.9],
                    [116, 166.5],
                    [113.1, 157.5],
                    [110.5, 149.1],
                    [105.2, 148.8],
                    [99.5, 148.3],
                    [98.9, 147.7],
                    [98.8, 137.5],
                    [98.6, 127.3],
                    [96.7, 127.2],
                    [94.8, 127],
                    [94.7, 125.2],
                    [94.6, 123.4],
                    [101.7, 123.3],
                    [108.7, 123.2],
                    [109.3, 121.4],
                    [110.5, 118.8],
                    [112.1, 116.7],
                    [114.2, 115.2],
                    [116.9, 114.2],
                  ],
                ],
              },
              symbol: {
                type: "CIMPolygonSymbol",
                symbolLayers: [
                  {
                    type: "CIMSolidFill",
                    enable: true,
                    color: [34, 30, 31, 255],
                  },
                ],
              },
            },
            {
              type: "CIMMarkerGraphic",
              textString: "",
              primitiveName: "",
              geometry: {
                rings: [
                  [
                    [109.8, 203.2],
                    [123.5, 215.9],
                    [177.5, 215.9],
                    [215.9, 177.5],
                    [215.9, 122.5],
                    [203.2, 109.8],
                    [109.8, 203.2],
                  ],
                  [
                    [84.1, 122.5],
                    [84.1, 177.5],
                    [96.8, 190.2],
                    [97.1, 189.9],
                    [190.2, 96.8],
                    [176.5, 84.1],
                    [122.5, 84.1],
                    [84.1, 122.5],
                  ],
                  [
                    [185.1, 65.8],
                    [234.2, 114.9],
                    [234.2, 185.1],
                    [185.1, 234.2],
                    [114.9, 234.2],
                    [65.8, 185.1],
                    [65.8, 114.9],
                    [114.9, 65.8],
                    [185.1, 65.8],
                  ],
                ],
              },
              symbol: {
                type: "CIMPolygonSymbol",
                symbolLayers: [
                  {
                    type: "CIMSolidFill",
                    enable: true,
                    color: [170, 0, 0, 255],
                  },
                ],
              },
            },
            {
              type: "CIMMarkerGraphic",
              textString: "",
              primitiveName: "",
              geometry: {
                rings: [
                  [
                    [196.3, 121.3],
                    [196.9, 125],
                    [197.5, 127.2],
                    [204.6, 127.5],
                    [211.2, 127.5],
                    [211.2, 152.7],
                    [211.2, 178],
                    [173.2, 178],
                    [135.2, 178],
                    [135.2, 177.8],
                    [194.7, 118.3],
                    [196.3, 121.3],
                  ],
                ],
              },
              symbol: {
                type: "CIMPolygonSymbol",
                symbolLayers: [
                  {
                    type: "CIMSolidFill",
                    enable: true,
                    color: [34, 30, 31, 255],
                  },
                ],
              },
            },
          ],
          scaleSymbolsProportionally: true,
          respectFrame: true,
        },
      ],
    },
  },
};

export default symbol;
