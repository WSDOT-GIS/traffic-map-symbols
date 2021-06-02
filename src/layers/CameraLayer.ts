import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Symbol from "@/symbols/CameraSymbol";
import Popup from "@/popup-templates/CameraPopup";

const renderer = new SimpleRenderer({ symbol: Symbol });

const layer = new GeoJSONLayer({
    url: "/data/camera.geojson",
    renderer: renderer,
    popupTemplate: Popup,
});

export default layer