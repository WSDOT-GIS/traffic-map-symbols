import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import mountainPassSymbol from "@/symbols/MountainPassSymbol"
import MountainPassesInfo from "@/types/MountainPassesInfo";
import Graphic from "@arcgis/core/Graphic";
const mountainPassRenderer = new simpleRenderer({
    symbol: mountainPassSymbol
})
const MountainPassesLayer = new GeoJSONLayer({
    id: "mountain-passes-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/MountainPasses.json",
    title: "Mountain Passes",
    renderer: mountainPassRenderer,
    visible: false
})

export const getMountainPassesInfoById = async (id: number) => {
    console.log(id)
    const query = MountainPassesLayer.createQuery();
    query.where = "MountainPassId = " + id;
    query.outFields = ["*"];
    const response = await MountainPassesLayer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
}

const convert2Info = (g: Graphic): MountainPassesInfo => {
    const info: MountainPassesInfo = {
        MountainPassId: g.attributes.MountainPassId,
        PassName: g.attributes.PassName,
        Elevation: g.attributes.Elevation,
        ElevationUnit: g.attributes.ElevationUnit,
        TravelAdvisoryAvailable: g.attributes.TravelAdvisoryAvailable,
        Latitude: g.attributes.Latitude,
        Longitude: g.attributes.Longitude,
        Temperature: g.attributes.Temperature,
        TemperatureUnit: g.attributes.TemperatureUnit,
        Weather: g.attributes.Weather,
        RoadCondition: g.attributes.RoadCondition,
        DisplayDate: g.attributes.DisplayDate,
        TravelAdvisoryFlag: g.attributes.TravelAdvisoryFlag,
        TravelDirection1: g.attributes.TravelDirection1,
        PublicMessage1: g.attributes.PublicMessage1,
        TravelDirection2: g.attributes.TravelDirection2,
        PublicMessage2: g.attributes.PublicMessage2
    };
    return info;
}

export default MountainPassesLayer