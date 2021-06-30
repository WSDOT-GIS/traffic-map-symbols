// import { mapView} from "@/esri-stuff/esriMap";

// export const adjustPositionSize = (containerDiv: HTMLDivElement) => {
//     const h = containerDiv.offsetHeight;
//     const w = containerDiv.offsetWidth;
//     console.log("h:" + h + ", w:" + w);
//     // Adjust vertical position to make sure it fits in the map view.
//     maxHeight.value = mapView.height;
//     console.log("maxHeight:" + maxHeight.value);
//     let y: number;
//     console.log(
//         "maxHeight.value < screenY.value + h: " +
//         maxHeight.value +
//         " < " +
//         screenY.value +
//         " + " +
//         h
//     );
//     if (maxHeight.value < screenY.value + h) {
//         const h2 = h > mapView.height ? mapView.height : h;
//         console.log("h2: " + h2);
//         y = mapView.height - h2; // props.PositionY - ((h2 + props.PositionY) - mapDiv.clientHeight);
//     } else {
//         y = screenY.value;
//     }
//     console.log("y: " + y);
//     screenY_adjusted.value = y >= 0 ? y : 0;
//     console.log("screenY_adjusted:" + screenY_adjusted.value);
//     // Adjust horizontal position.
//     let x: number;
//     if (mapView.width < screenX.value) {
//         x = mapView.width - w - 10;
//     } else if (mapView.width < screenX.value + w) {
//         // Show it on the left side of the feature...
//         x = screenX.value - w;
//     } else {
//         x = screenX.value;
//     }
//     screenX_adjusted.value = x >= 0 ? x : 0;

//     console.log(
//         "Popup top: " +
//         screenY_adjusted.value +
//         ", left: " +
//         screenX_adjusted.value +
//         ", maxHeight: " +
//         maxHeight.value
//     );
    
// };