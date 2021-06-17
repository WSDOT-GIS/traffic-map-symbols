define(["require", "exports", "tslib", "vuex", "@arcgis/core/geometry/Extent", "./esri-stuff/esriMap", "./layers/Basemaps", "./utils/extentUtil", "./utils/urlParamUtil"], function (require, exports, tslib_1, vuex_1, Extent_1, esriMap_1, Basemaps_1, extentUtil_1, urlParamUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useStore = exports.cloneProxyTarget = exports.store = exports.key = void 0;
    Extent_1 = tslib_1.__importDefault(Extent_1);
    // define injection key...
    exports.key = Symbol();
    exports.store = vuex_1.createStore({
        state: function () {
            var layerList = [
                { index: 0, title: "Traffic", visible: true },
                { index: 1, title: "Park and Rides", visible: false },
                { index: 2, title: "Traffic Cameras", visible: false }
            ];
            urlParamUtil_1.setLayerFromUrl(layerList);
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
                layerList: layerList
                // layerList: [
                //     { index: 0, title: "Traffic", visible: true },
                //     { index: 1, title: "Park and Rides", visible: false },
                //     { index: 2, title: "Traffic Cameras", visible: false }
                // ]
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
<<<<<<< HEAD
                // switch (state.basemap) {
                //     case "satellite":
                //         webmap.basemap = satelliteBasemap;
                //         break;
                //     default:
                //         webmap.basemap = wsdotBasemap;
                // }
            },
            toggleBasemap: function (state) {
                var basemapInfo = Basemaps_1.toggleBasemapInfo(state.basemap);
                state.basemap = basemapInfo.name;
                // if (state.basemap == "wsdot") {
                //     state.basemap = "satellite"
                // } else {
                //     state.basemap = "wsdot"
                // }
                esriMap_1.webmap.basemap = basemapInfo.basemap;
                // switch (state.basemap) {
                //     case "satellite":
                //         webmap.basemap = satelliteBasemap;
                //         break;
                //     default:
                //         webmap.basemap = wsdotBasemap;
                // }
=======
            },
            toggleBasemap: function (state) {
                var basemapInfo = Basemaps_1.toggleBasemapInfo(state.basemap); //Look at this with masao
                state.basemap = basemapInfo.name;
                esriMap_1.webmap.basemap = basemapInfo.basemap;
>>>>>>> Develop-AddRestrictionLayers
            },
            setPointerX: function (state, payload) {
                state.pointerX = payload.toFixed(6);
            },
            setPointerY: function (state, payload) {
                state.pointerY = payload.toFixed(6);
            },
            setLayerList: function (state, payload) {
                state.layerList = payload;
                esriMap_1.webmap.layers.map(function (layer, index) {
                    layer.visible = state.layerList[index].visible;
                    console.log(index + " " + layer.title + " " + layer.visible);
                });
            },
            setCurrentExtent: function (state, payload) {
                if (payload instanceof Extent_1.default) {
                    var extentInfo = extentUtil_1.convert2ExtentInfo(payload);
                    state.currentExtent = extentInfo;
                    console.log(JSON.stringify(state.currentExtent));
                }
                else {
                    var extent = extentUtil_1.convert2EsriExtent(payload);
                    esriMap_1.mapView.extent = extent;
                }
            },
        },
    });
    // Clone the target of proxy (i.e. removing the reactivity)
    var cloneProxyTarget = function (proxy) {
        var copy = JSON.parse(JSON.stringify(proxy));
        console.log(JSON.stringify(copy));
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