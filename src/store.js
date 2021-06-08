define(["require", "exports", "tslib", "vuex", "@arcgis/core/geometry/Extent", "./esri-stuff/esriMap", "./layers/Basemaps", "./utils/extentUtil"], function (require, exports, tslib_1, vuex_1, Extent_1, esriMap_1, Basemaps_1, extentUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useStore = exports.store = exports.key = void 0;
    Extent_1 = tslib_1.__importDefault(Extent_1);
    // define injection key...
    exports.key = Symbol();
    exports.store = vuex_1.createStore({
        state: function () {
            return {
                basemap: "wsdot",
                pointerX: 0,
                pointerY: 0,
                currentExtent: {
                    xmin: 0,
                    xmax: 0,
                    ymin: 0,
                    ymax: 0
                },
                layerList: [
                    { index: 0, title: "Traffic", visible: true },
                    { index: 1, title: "Park and Rides", visible: false },
                    { index: 2, title: "Traffic Cameras", visible: false }
                ]
            };
        },
        getters: {
            completeLayerList: function (state) {
                return state.layerList;
            }
        },
        mutations: {
            toggleBasemap: function (state) {
                if (state.basemap == "wsdot") {
                    state.basemap = "satellite";
                }
                else {
                    state.basemap = "wsdot";
                }
                if (state.basemap == "wsdot") {
                    esriMap_1.webmap.basemap = Basemaps_1.wsdotBasemap;
                }
                else {
                    esriMap_1.webmap.basemap = Basemaps_1.satelliteBasemap;
                }
                console.log(state.basemap);
                console.log(esriMap_1.webmap.basemap);
            },
            setPointerX: function (state, payload) {
                state.pointerX = payload;
            },
            setPointerY: function (state, payload) {
                state.pointerY = payload;
            },
            setLayerList: function (state, payload) {
                state.layerList = payload;
                esriMap_1.webmap.layers.map(function (layer, index) {
                    layer.visible = state.layerList[index].visible;
                });
            },
            setCurrentExtent: function (state, payload) {
                if (payload instanceof Extent_1.default) {
                    var extentInfo = extentUtil_1.Convert2ExtentInfo(payload);
                    state.currentExtent = extentInfo;
                    console.log(JSON.stringify(state.currentExtent));
                }
                else {
                    var extent = extentUtil_1.Convert2EsriExtent(payload);
                    esriMap_1.mapView.extent = extent;
                }
            },
        },
    });
    // define custom useStore that supply key so do not have to do this in each component...
    var useStore = function () {
        return vuex_1.useStore(exports.key);
    };
    exports.useStore = useStore;
});
//# sourceMappingURL=store.js.map