import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

let layer: FeatureLayer | undefined;

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "mile-markers-layer",
        url: url,
        title: "Mile Markers",
        visible: true,
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "LineRestrictionLayer is not ready yet!";
    }
    return layer;
}

// const LineRestrictionsLayer = new GeoJSONLayer({
//     id: "line-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/LineRestrictions.json",
//     title: "Restriction Lines",
//     renderer: lineRestrictionsRenderer,
//     visible: false,
//     fields: fields
// });

export default getLayer