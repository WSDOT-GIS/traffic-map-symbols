import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import mountainPassSymbol from "@/symbols/MountainPassSymbol"
import Field from "@arcgis/core/layers/support/Field"

const mountainPassRenderer = new simpleRenderer({
    symbol: mountainPassSymbol
})

const fields = [
    new Field({ name: "MountainPassId", type: "integer", alias: "MountainPassId" }),
    new Field({ name: "PassName", type: "string", alias: "PassName", length: 50 }),
    new Field({
        name: "Elevation", type: "integer", alias: "Elevation"
    }),
    new Field({ name: "ElevationUnit", type: "string", alias: "ElevationUnit", length: 20 }),
    new Field({
        name: "TravelAdvisoryAvailable", type: "integer", alias: "TravelAdvisoryAvailable"
    }),
    new Field({
        name: "Latitude", type: "double", alias: "Latitude"
    }),
    new Field({
        name: "Longitude", type: "double", alias: "Longitude"
    }),
    new Field({
        name: "Location", type: "geometry", alias: "Location"
    }),
    new Field({
        name: "Temperature", type: "integer", alias: "Temperature"
    }),
    new Field({ name: "TemperatureUnit", type: "string", alias: "TemperatureUnit", length: 10 }),
    new Field({ name: "Weather", type: "string", alias: "Weather", length: 500 }),
    new Field({ name: "RoadCondition", type: "string", alias: "RoadCondition", length: 500 }),
    new Field({ name: "DisplayDate", type: "date", alias: "DisplayDate", length: 8 }),
    new Field({
        name: "TravelAdvisoryFlag", type: "integer", alias: "TravelAdvisoryFlag"
    }),
    new Field({ name: "TravelDirection1", type: "string", alias: "TravelDirection1", length: 20 }),
    new Field({ name: "PublicMessage1", type: "string", alias: "PublicMessage1", length: 300 }),
    new Field({ name: "TravelDirection2", type: "string", alias: "TravelDirection2", length: 20 }),
    new Field({ name: "PublicMessage2", type: "string", alias: "PublicMessage2", length: 300 }),
]


let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "mountain-passes-layer",
        url: url,
        title: "Mountain Passes",
        renderer: mountainPassRenderer,
        visible: false,
        fields: fields,
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "MountainPassLayer is not ready yet!";
    }
    return layer;
}

// const FeatureLayer = new GeoJSONLayer({
//     id: "mountain-passes-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/MountainPasses.json",
//     title: "Mountain Passes",
//     renderer: mountainPassRenderer,
//     visible: false
// })

export default getLayer