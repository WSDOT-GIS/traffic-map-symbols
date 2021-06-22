define(["require", "exports", "tslib", "vuex", "@arcgis/core/geometry/Extent", "./esri-stuff/esriMap", "./layers/Basemaps", "./utils/extentUtil"], function (require, exports, tslib_1, vuex_1, Extent_1, esriMap_1, Basemaps_1, extentUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useStore = exports.cloneProxyTarget = exports.store = exports.key = void 0;
    Extent_1 = tslib_1.__importDefault(Extent_1);
    // define injection key...
    exports.key = Symbol();
    exports.store = vuex_1.createStore({
        state: function () {
            // const layerList = [
            //     { index: 0, title: "Traffic", visible: true },
            //     { index: 1, title: "Park and Rides", visible: false },
            //     { index: 2, title: "Traffic Cameras", visible: false },
            //     { index: 3, title: "test1", visible: true },
            //     { index: 4, title: "test2", visible: false }
            // ]
            // setLayerFromUrl(layerList);
            return {
                basemap: "",
                pointerX: 0,
                pointerY: 0,
                currentExtent: {
                    xmin: 0,
                    xmax: 0,
                    ymin: 0,
                    ymax: 0
                },
                layerList: [],
                userLocation: null
            };
        },
        getters: {
            completeLayerList: function (state) {
                return state.layerList;
            },
        },
        mutations: {
            setBasemap: function (state, payload) {
                if (state.basemap != payload || !state.basemap) {
                    var basemapInfo = Basemaps_1.getBasemapInfo(payload);
                    state.basemap = basemapInfo.name;
                    esriMap_1.webmap.basemap = basemapInfo.basemap;
                }
            },
            toggleBasemap: function (state) {
                var basemapInfo = Basemaps_1.toggleBasemapInfo(state.basemap); //Look at this with masao
                state.basemap = basemapInfo.name;
                esriMap_1.webmap.basemap = basemapInfo.basemap;
            },
            setPointerX: function (state, payload) {
                state.pointerX = payload.toFixed(6);
            },
            setPointerY: function (state, payload) {
                state.pointerY = payload.toFixed(6);
            },
            setUserLocation: function (state, payload) {
                state.userLocation = payload;
            },
            setLayerList: function (state, payload) {
                state.layerList = payload;
                esriMap_1.webmap.layers.map(function (layer, index) {
                    if (layer.title && state.layerList[index] && layer.title == state.layerList[index].title) {
                        layer.visible = state.layerList[index].visible;
                    }
                });
            },
            setCurrentExtent: function (state, payload) {
                if (payload instanceof Extent_1.default) {
                    // If the payload is ESRI extent, then update the state only.
                    var extentInfo = extentUtil_1.convert2ExtentInfo(payload);
                    state.currentExtent = extentInfo;
                    //console.log(JSON.stringify(state.currentExtent));
                }
                else {
                    // If the payload is ExtentInfo, actually zoom the map. Once the map extent 
                    // is changed, ESRI extent will be sent to this again and set the state.
                    var extent = extentUtil_1.convert2EsriExtent(payload);
                    esriMap_1.mapView.extent = extent;
                }
            },
        },
    });
    // Clone the target of proxy (i.e. removing the reactivity)
    var cloneProxyTarget = function (proxy) {
        var copy = JSON.parse(JSON.stringify(proxy));
        return copy;
    };
    exports.cloneProxyTarget = cloneProxyTarget;
    // define custom useStore that supply key so do not have to do this in each component...
    var useStore = function () {
        return vuex_1.useStore(exports.key);
    };
    exports.useStore = useStore;
});
//# sourceMappingURL=store.js.map