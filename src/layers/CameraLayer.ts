import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import Symbol from "@/symbols/CameraSymbol";
import Popup from "@/popup-templates/CameraPopup";
import { generateClusterConfig } from "@/utils/layerUtil"

const clusterConfig = generateClusterConfig("Cameras", "camera", "#000000")

const renderer = new SimpleRenderer({ symbol: Symbol });

const fields = [
    new Field({
        name: "CameraID",
        alias: "Camera ID",
        type: "oid"
    }),
    new Field({
        name: "CameraTitle",
        alias: "Camera Title",
        type: "string"
    }),
    new Field({
        name: "ImageURL",
        alias: "Image URL",
        type: "string"
    }),
    new Field({
        name: "WSDOTSRID",
        alias: "SR",
        type: "string"
    }),
    new Field({
        name: "StateRouteMilepost",
        alias: "Milepost",
        type: "single"
    }),
    new Field({
        name: "CompassDirection",
        alias: "Compass Direction",
        type: "string"
    }),
    new Field({
        name: "Location",
        alias: "Location",
        type: "string"
    }),
    new Field({
        name: "CameraOwnerName",
        alias: "Owner",
        type: "string"
    }),
    new Field({
        name: "CameraOwnerURL",
        alias: "Owner URL",
        type: "string"
    }),
    new Field({
        name: "ImageWidth",
        alias: "Image Width",
        type: "integer"
    }),
    new Field({
        name: "ImageHeight",
        alias: "Image Height",
        type: "integer"
    }),
]

const layer = new GeoJSONLayer({
    id: "weather-camera-layer",
    title: "Weather Camera",
    url: "/data/camera.geojson",
    title:"Traffic Cameras",
    renderer: renderer,
    popupTemplate: Popup,
    featureReduction: clusterConfig,
    fields: fields
});


export default layer