"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = exports.cloneProxyTarget = exports.store = exports.key = void 0;
const tslib_1 = require("tslib");
const vuex_1 = require("vuex");
const Extent_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Extent"));
const esriMap_1 = require("./esri-stuff/esriMap");
const Basemaps_1 = require("./layers/Basemaps");
const extentUtil_1 = require("./utils/extentUtil");
// define injection key...
exports.key = Symbol();
exports.store = vuex_1.createStore({
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
                const basemapInfo = Basemaps_1.getBasemapInfo(payload);
                state.basemap = basemapInfo.name;
                esriMap_1.webmap.basemap = basemapInfo.basemap;
            }
        },
        toggleBasemap(state) {
            const basemapInfo = Basemaps_1.toggleBasemapInfo(state.basemap);
            state.basemap = basemapInfo.name;
            esriMap_1.webmap.basemap = basemapInfo.basemap;
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
            esriMap_1.webmap.layers.map((layer, index) => {
                if (layer.title && state.layerList[index] && layer.title == state.layerList[index].title) {
                    layer.visible = state.layerList[index].visible;
                }
            });
        },
        setCurrentExtent(state, payload) {
            if (payload instanceof Extent_1.default) {
                // If the payload is ESRI extent, then update the state only.
                const extentInfo = extentUtil_1.convert2ExtentInfo(payload);
                state.currentExtent = extentInfo;
            }
            else {
                // If the payload is ExtentInfo, actually zoom the map. Once the map extent 
                // is changed, ESRI extent will be sent to this again and set the state.
                const extent = extentUtil_1.convert2EsriExtent(payload);
                esriMap_1.mapView.extent = extent;
            }
        },
    },
});
// Clone the target of proxy (i.e. removing the reactivity)
const cloneProxyTarget = (proxy) => {
    const copy = JSON.parse(JSON.stringify(proxy));
    //console.log(JSON.stringify(proxy) + "\n" + JSON.stringify(copy));
    return copy;
};
exports.cloneProxyTarget = cloneProxyTarget;
// define custom useStore that supply key so do not have to do this in each component...
const useStore = () => {
    return vuex_1.useStore(exports.key);
};
exports.useStore = useStore;
//# sourceMappingURL=store.js.map