import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
export const MyLocationSymbol = {
    type: "simple-marker",
    color: [100, 100, 255], // Orange
    outline: {
      color: [255, 255, 255], // White
      width: 1,
    },
  };