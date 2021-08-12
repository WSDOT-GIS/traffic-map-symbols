import { createStore, useStore as baseUseStore } from "vuex";
import Extent from "@arcgis/core/geometry/Extent";
import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo } from "./layers/Basemaps";
import { convert2EsriExtent, convert2ExtentInfo } from "./utils/extentUtil";
// define injection key...
export const key = Symbol();
export const store = createStore({
    state() {
        return {
            basemap: "",
            pointerX: 0,
            pointerY: 0,
            mapSize: { width: 0, height: 0 },
            currentExtent: {
                xmin: 0,
                xmax: 0,
                ymin: 0,
                ymax: 0
            },
            layerList: [],
            userLocation: null,
            mapFeaturesExpanded: "block",
        };
    },
    getters: {
        completeLayerList: state => {
            return state.layerList;
        },
    },
    mutations: {
        setBasemap(state, payload) {
            if (state.basemap != payload || !state.basemap) {
                const basemapInfo = getBasemapInfo(payload);
                state.basemap = basemapInfo.name;
                webmap.basemap = basemapInfo.basemap;
            }
        },
        toggleBasemap(state) {
            const basemapInfo = toggleBasemapInfo(state.basemap);
            state.basemap = basemapInfo.name;
            webmap.basemap = basemapInfo.basemap;
        },
        setPointerX(state, payload) {
            state.pointerX = payload.toFixed(6);
        },
        setPointerY(state, payload) {
            state.pointerY = payload.toFixed(6);
        },
        setMapSize(state, payload) {
            //console.log("setMapSize: " + JSON.stringify(payload))
            state.mapSize = payload;
        },
        setUserLocation(state, payload) {
            state.userLocation = payload;
        },
        setLayerList(state, payload) {
            state.layerList = payload;
            webmap.layers.map((layer, index) => {
                if (layer.id && state.layerList[index] && layer.id === state.layerList[index].id) {
                    layer.visible = state.layerList[index].visible;
                }
            });
        },
        setCurrentExtent(state, payload) {
            if (payload instanceof Extent) {
                // If the payload is ESRI extent, then update the state only.
                const extentInfo = convert2ExtentInfo(payload);
                state.currentExtent = extentInfo;
            }
            else {
                // If the payload is ExtentInfo, actually zoom the map. Once the map extent 
                // is changed, ESRI extent will be sent to this again and set the state.
                const extent = convert2EsriExtent(payload);
                mapView.extent = extent;
            }
        },
        setMapFeaturesExpanded(state) {
            state.mapFeaturesExpanded == "block" ? state.mapFeaturesExpanded = "none" : state.mapFeaturesExpanded = "block";
        },
    },
});
// Clone the target of proxy (i.e. removing the reactivity)
export const cloneProxyTarget = (proxy) => {
    const copy = JSON.parse(JSON.stringify(proxy));
    return copy;
};
// define custom useStore that supply key so do not have to do this in each component...
export const useStore = () => {
    return baseUseStore(key);
};
//# sourceMappingURL=store.js.map