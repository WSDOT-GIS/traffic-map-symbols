import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";
import BasemapInfo from "@/types/BasemapInfo";

export const getDefaultBasemapInfo = (): BasemapInfo => { return basemaps[0] }
const urlBasemap =
    //"https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
    //"https://tiles.arcgis.com/tiles/IYrj3otxNjPsrTRD/arcgis/rest/services/TravelCenterBasemapTileTest/MapServer"
    "https://tiles.arcgis.com/tiles/IYrj3otxNjPsrTRD/arcgis/rest/services/Travel_Center_Basemap_Dev/MapServer"

// Array of basemaps. The first one is the default.
const basemaps: BasemapInfo[] = [
    {
        name: "wsdot",
        basemap: new Basemap({
            baseLayers: [
                new TileLayer({
                    url: urlBasemap,
                }),
            ],
            title: "WSDOT Basemap",
            id: "wsdot-basemap",
        })
    }, {
        name: "satellite",
        basemap: Basemap.fromId("arcgis-imagery")
    }]

export const getBasemapInfo = (name: string): BasemapInfo => {
    const results = basemaps.filter((x) => {
        return x.name == name;
    });
    if (results.length > 0) {
        return results[0];
    } else {
        return getDefaultBasemapInfo();
    }
}
// Select the next basemap info in the array.
export const toggleBasemapInfo = (currentName: string): BasemapInfo => {
    let idx = -1;
    for (let i = 0; i < basemaps.length; i++) {
        if (basemaps[i].name == currentName) {
            idx = i;
            break;
        }
    }

    if (idx >= -1 && idx < basemaps.length - 1) {
        return basemaps[idx + 1];
    }
    else {
        return basemaps[0];
    }
}
// Make sure the base map name is valid...
export const validateBasemapName = (name: string): boolean => {
    const result = basemaps.filter((item) => {
        return item.name === name;
    })
    return result.length > 0;
}
