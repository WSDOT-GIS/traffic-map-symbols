import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { useToast } from "vue-toastification";
import Extent from "@arcgis/core/geometry/Extent";
import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { convert2EsriExtent, convert2ExtentInfo } from "./utils/extentUtil";
import LayerInfo from "./types/LayerInfo";
import { InitializingInfo } from "./types/InitializingInfo";
import { getMediaSize } from "./utils/miscUtil";

// Reference - https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
    basemap: string;
    pointerX: number;
    pointerY: number;
    mapSize: { width: number; height: number };
    center: { x: number, y: number };
    scale: number;
    layerList: LayerInfo[];
    currentExtent: ExtentInfo;
    userLocation: number[] | null;
    isMobileMenuOpen: boolean;
    isInitializing: boolean;
    isLoading: boolean;
    initiaizingMessage: string;
    leftPaneIsOpen: boolean;
    /** s: small, l:large */
    mediaSize: "s" | "l"; // TODO: add more as needed
    errors: string[];
    isToastReady: boolean;
}
//
const toast = useToast();

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            basemap: "",
            pointerX: 0,
            pointerY: 0,
            mapSize: { width: 0, height: 0 },
            scale: 0,
            center: { x: 0, y: 0 },
            currentExtent: {
                xmin: 0,
                xmax: 0,
                ymin: 0,
                ymax: 0
            },
            layerList: [
                { id: "alert-area-layer" },
                { id: "border-crossings-layer" },
                { id: "boundaries-places-reference-layer" },
                { id: "traffic-camera-layer" },
                { id: "esri-reference-layer" },
                { id: "ferry-routes-reference-layer" },
                { id: "fire-incidents-layer" },
                { id: "fire-perimeters-layer" },
                { id: "ferry-routes-lines-layer" },
                { id: "line-restrictions-layer" },
                { id: "mile-markers" },
                { id: "mountain-passes-layer" },
                { id: "park-ride-layer" },
                { id: "ferry-routes-points-layer" },
                { id: "point-restrictions-layer" },
                { id: "regional-alert-layer" },
                { id: "rest-areas-layer" },
                { id: "road-alerts-layer" },
                { id: "roads-reference-layer" },
                { id: "state-route-shields-layer" },
                { id: "traffic-flow-layer" },
                { id: "weather-stations-layer" },
            ],
            userLocation: null,
            isMobileMenuOpen: false,
            isInitializing: false,
            isLoading: false,
            initiaizingMessage: "",
            leftPaneIsOpen: getMediaSize() !== "s",
            mediaSize: getMediaSize(),
            errors: [],
            isToastReady: false
        }
    },
    getters: {
        completeLayerList: state => {
            return state.layerList;
        },
        lastError: state => {
            return state.errors[state.errors.length - 1];
        }
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
            state.mapSize = payload;
            state.mediaSize = getMediaSize();
        },
        setCenter(state, payload) {
            state.center = payload;
        },
        setScale(state, payload) {
            state.scale = payload;
        },
        setUserLocation(state, payload) {
            state.userLocation = payload;
        },
        /**
         * Update the layer info in the layer list
         * @param state 
         * @param payload Set the properties that need to be updated, and leave others undefined. Undefined properties will not be updated. 
         */
        updateLayerInfo(state, payload: LayerInfo) {
            const idx = state.layerList.findIndex((item) => item.id === payload.id);
            if (idx < 0) {
                throw "The layer specified does not exist in the state store.";
            }
            const info = state.layerList[idx];
            if (payload.title) { info.title = payload.title }
            if (payload.index) {
                info.index = payload.index;
                info.isLoaded = payload.index >= 0;
            }
            if (payload.url) { info.url = payload.url }
            if (payload.visible !== undefined) { info.visible = payload.visible }
        },
        // setLayerList(state, payload: LayerInfo[]) {
        //     let layerList: LayerInfo[];
        //     if (!payload) {
        //         layerList = [];
        //         webmap.layers.forEach((layer, index) => {
        //             layerList.push({
        //                 id: layer.id,
        //                 index: index,
        //                 title: layer.title,
        //                 visible: layer.visible,
        //             });
        //         });
        //     }
        //     else {
        //         layerList = payload;
        //     }
        //     state.layerList = layerList;
        //     if (payload) {
        //         webmap.layers.forEach((layer, index) => {
        //             if (state.layerList[index] && layer.id == state.layerList[index].id) {
        //                 layer.visible = state.layerList[index].visible
        //             }
        //         })
        //     }
        // },
        setCurrentExtent(state, payload) {
            if (payload instanceof Extent) {
                // If the payload is ESRI extent, then update the state only.
                const extentInfo = convert2ExtentInfo(payload);
                state.currentExtent = extentInfo;
            } else {
                // If the payload is ExtentInfo, actually zoom the map. Once the map extent 
                // is changed, ESRI extent will be sent to this again and set the state.
                const extent = convert2EsriExtent(payload);
                mapView.extent = extent;
            }
        },
        toggleIsMobileMenuOpen(state) {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setInitializing(state, payload: InitializingInfo) {
            payload.isInitializing != undefined ? state.isInitializing = payload.isInitializing : null
            payload.isLoading != undefined ? state.isLoading = payload.isLoading : null
            payload.initializingMessage ? state.initiaizingMessage = payload.initializingMessage : null
        },
        setLeftPaneIsOpen(state, payload) {
            state.leftPaneIsOpen = payload;
        },
        // If the error happens before toast message can be displayed, save it in the array to show later.
        saveError(state, message: string) {
            state.errors.push(message);
        },
        // The toast cannot be displayed until the page and its content are ready.
        setIsToastReady(state) {
            state.isToastReady = true;
        }
    },
    actions: {
        updateLayerList({ commit }) {
            webmap.layers.forEach((layer, index) => {
                const info: LayerInfo = {
                    id: layer.id,
                    index: index,
                    title: layer.title,
                    visible: layer.visible
                };
                commit("updateLayerInfo", info);
            });
        },
        /**
         * Update LayerInfo and map layer visibility
         * @param param0 
         * @param payload Layer IDs and visibility 
         */
        modifyLayerVisibility({ commit, state }, payload: { ids: string[], visible: boolean }) {
            payload.ids.forEach((eachId) => {
                const updateInfo: LayerInfo = { id: eachId, visible: payload.visible };
                commit("updateLayerInfo", updateInfo);
                const info = state.layerList.find((eachInfo) => eachInfo.id === eachId);
                if (!info) { throw "Invalid layer ID was passed." }
                if (!info.isLoaded) {
                    console.warn("Failed to modify layer visibility because the specified layer is not available: " + eachId);
                    return;
                }
                const layer = webmap.layers.find((lyr) => {
                    return lyr.id === eachId;
                });
                layer.visible = payload.visible;
            });
        },
        showError({ state, commit }, message: string) {
            if (state.isToastReady) {
                toast.error(message);
            }
            else { commit("saveError", message); }
        },
        // Set the flag to indicate the toast message is ready to be shown.
        // If there are errors happened earlier, show them now.
        setIsToastReady({ state, commit }) {
            if (!state.isToastReady) {
                commit("setIsToastReady");
                state.errors.forEach((item) => {
                    toast.error(item);
                });
                state.errors = [];
            }
        }
    }
})

/**
 * Clone the target of proxy (i.e. removing the reactivity)
 * @param proxy The reactive object
 * @returns Non-reactive copy of the object
 */
export const cloneProxyTarget = <T>(proxy: T): T => {
    const copy = JSON.parse(JSON.stringify(proxy));
    return copy;
}

/**
 * define custom useStore that supply key so do not have to do this in each component...
 * */
export const useStore = (): Store<State> => {
    return baseUseStore(key);
}

