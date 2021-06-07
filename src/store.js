define(["require", "exports", "vuex", "./esri-stuff/esriMap", "./layers/Basemaps"], function (require, exports, vuex_1, esriMap_1, Basemaps_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useStore = exports.store = exports.key = void 0;
    // define injection key...
    exports.key = Symbol();
    exports.store = vuex_1.createStore({
        state: function () {
            return {
                basemap: "wsdot",
                pointerX: 0,
                pointerY: 0,
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
        },
    });
    // define custom useStore that supply key so do not have to do this in each component...
    function useStore() {
        return vuex_1.useStore(exports.key);
    }
    exports.useStore = useStore;
});
//# sourceMappingURL=store.js.map