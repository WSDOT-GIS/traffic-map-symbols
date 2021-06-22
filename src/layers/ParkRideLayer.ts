import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Symbol from "@/symbols/ParkRideSymbol";
import Popup from "@/popup-templates/ParkRidePopup";
import { generateClusterConfig } from "@/utils/layerUtil";

const clusterConfig = generateClusterConfig("Park & Rides", "park & ride", "#065535");

const renderer = new SimpleRenderer({ symbol: Symbol });

const layer = new GeoJSONLayer({
    id: "park-ride-layer",
<<<<<<< HEAD
    url: "http://hqtob1webtmdev1/GISData/ParkAndRides.json",
=======
    url: "http://hqtob1webtmdev1/GISData/park-ride.json",
>>>>>>> 452929c767d7611a18ddf388b86f356325c892ce
    title: "Park and Rides",
    renderer: renderer,
    popupTemplate: Popup,
    // featureReduction: clusterConfig
});

export default layer