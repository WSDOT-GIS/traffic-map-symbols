import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import Symbol from "@/symbols/CameraSymbol";
// import Graphic from "@arcgis/core/Graphic";
// import MapView from "@arcgis/core/views/MapView";
// import Point from "@arcgis/core/geometry/Point";
// import LayerView from "@arcgis/core/views/layers/GeoJSONLayerView";

// import { clusterSymbol } from "@/symbols/CameraSymbol";
import { clusterConfig } from "@/utils/clusterUtil";
// import CameraInfo from "@/types/CameraInfo";
// import FeatureInfo from "@/types/FeaturesetInfo";


// const clusterConfig = generateClusterConfig("Cameras", "camera", "#fff", clusterSymbol);

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
    id: "traffic-camera-layer",
    url: "http://hqtob1webtmdev1/GISData/Cameras.json",
    title: "Traffic Cameras",
    renderer: renderer,
    featureReduction: clusterConfig,
    fields: fields
});

export default layer

/*** Helper functions **************/
// Watch scale change...
export const toggleCluster = (newScale: number, oldScale: number, maxScale: number): void => {
    console.log("toggleCluster scale: " + newScale);
    // Turn off clustering at max scale...
    if (newScale > maxScale && oldScale < maxScale) {
        layer.featureReduction = clusterConfig;
        console.log("Turn on cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }
    else if (newScale < maxScale && oldScale > maxScale) {
        layer.set("featureReduction", undefined);
        console.log("Turn off cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }

}

// Query features...
// const outFields = ["CameraID", "CameraTitle", "ImageURL", "WSDOTSRID", "StateRouteMilepost",
//     "CompassDirection", "Location", "CameraOwnerName", "CameraOwnerURL",
//     "ImageWidth", "ImageHeight"];

// export const getCameraInfoById = async (id: number): Promise<CameraInfo | undefined> => {
//     const query = layer.createQuery();
//     query.where = "CameraID = " + id;
//     query.outFields = outFields;
//     const response = await layer.queryFeatures(query);
//     const g = response.features[0];
//     if (g) {
//         const info = convert2Info(g);
//         return info;
//     }
// }

/* 
NOTE: This function only returns each feature if one of the following coditions is met:
- maxCount is not set 
- The number of features is less than the maxCount.
- All the features are at the identical location.
*/
// export const getCameraInfosFromCluster = async (clusterGraphic: Graphic, mapView: MapView, maxCount?: number): Promise<CameraInfo[] | undefined> => {
//     const layerView = await mapView.whenLayerView(layer);
//     const query = layerView.createQuery();
//     query.aggregateIds = [clusterGraphic.getObjectId()];
//     query.outFields = outFields;
//     const result = await layerView.queryFeatures(query);
//     let doReturn = false;
//     if (!maxCount || result.features.length <= maxCount) {
//         doReturn = true;
//     }
//     else {
//         let identical = true;
//         const pt0 = result.features[0].geometry as Point;
//         for (let i = 1; i < result.features.length; i++) {
//             identical = pt0.equals(result.features[i].geometry as Point)
//             if (!identical) { break; }
//         }
//         if (identical) {
//             console.log("All points are located on the same spot!");
//             doReturn = true;
//         }
//         else { console.log("Points are not identical."); }
//     }
//     if (doReturn) {
//         const ids = result.features.map((feature) => { return feature.attributes.CameraID; })
//         const features = await getCameraInfosByIds(ids);
//         return features;
//     }
// }
// // Get Info objects...
// export const getCameraInfosByIds = async (ids: number[]): Promise<CameraInfo[]> => {
//     const query = layer.createQuery();
//     query.where = "CameraID IN (" + ids.join(",") + ")";
//     query.outFields = outFields;
//     const response = await layer.queryFeatures(query);
//     const infos = response.features.map(convert2Info);
//     return infos;
// }
// // Convert esri graphic object to a simple custom object since esri object is not compatible with Vue...
// const convert2Info = (g: Graphic): CameraInfo => {
//     const info: CameraInfo = {
//         id: g.attributes.CameraID,
//         title: g.getAttribute("CameraTitle"),
//         imageURL: g.attributes.ImageURL,
//         srid: g.attributes.WSDOTSRID,
//         milepost: g.attributes.StateRouteMilepost,
//         compassDirection: g.attributes.CompassDirection,
//         location: g.attributes.Location,
//         ownerName: g.attributes.CameraOwnerName,
//         ownerURL: g.attributes.CameraOwnerURL,
//         imageWidth: g.attributes.ImageWidth,
//         imageHeight: g.attributes.ImageHeight
//     };

//     return info;
// }

