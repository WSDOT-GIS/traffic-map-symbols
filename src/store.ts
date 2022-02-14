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
                new LayerInfo("alert-area-layer"),
                new LayerInfo("border-crossings-layer"),
                new LayerInfo("boundaries-places-reference-layer"),
                new LayerInfo("traffic-camera-layer"),
                new LayerInfo("esri-reference-layer"),
                new LayerInfo("ferry-routes-reference-layer"),
                new LayerInfo("fire-incidents-layer"),
                new LayerInfo("fire-perimeters-layer"),
                new LayerInfo("ferry-routes-lines-layer"),
                new LayerInfo("line-restrictions-layer"),
                new LayerInfo("mile-markers"),
                new LayerInfo("mountain-passes-layer"),
                new LayerInfo("park-ride-layer"),
                new LayerInfo("ferry-routes-points-layer"),
                new LayerInfo("point-restrictions-layer"),
                new LayerInfo("regional-alert-layer"),
                new LayerInfo("rest-areas-layer"),
                new LayerInfo("road-alerts-layer"),
                new LayerInfo("roads-reference-layer"),
                new LayerInfo("state-route-shields-layer"),
                new LayerInfo("traffic-flow-layer"),
                new LayerInfo("weather-stations-layer"),
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
        getLayerInfoById: (state) => (id: string) => {
            return getLayerInfo(state, id);
        },
        layerInfoExists: (state) => (id: string) => {
            const result = state.layerList.filter((item) => item.id === id);
            return result.length === 1;
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
        updateLayerInfo(state, payload: { id: string, title?: string, index?: number, url?: string, visible?: boolean, status?: "loaded" | "failed" }) {
            // const info = state.layerList.find((item) => item.id === payload.id);
            // if (!info) {
            //     throw `The layer specified, ${payload.id}, does not exist in the state store.`;
            // }
            const info = getLayerInfo(state, payload.id);
            if (payload.title) { info.title = payload.title }
            if (payload.index) {
                info.index = payload.index;
                info.status = payload.index >= 0 ? "loaded" : "failed";
            }
            if (payload.url) { info.url = payload.url }
            if (payload.visible !== undefined) { info.visible = payload.visible }
            if (payload.status) { info.status = payload.status }
        },
        updateLayerInfoVisibility(state, payload: {id: string, visible: boolean}) {
            const info = getLayerInfo(state, payload.id);
            info.visible = payload.visible;
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
                const updateInfo = {
                    id: layer.id,
                    index: index,
                    title: layer.title,
                    visible: layer.visible
                }
                commit("updateLayerInfo", updateInfo);
            });
        },
        /**
         * Update LayerInfo and map layer visibility
         * @param param0 
         * @param payload Layer IDs and visibility 
         */
        modifyLayerVisibility({ commit, state }, payload: { ids: string[], visible: boolean }) {
            payload.ids.forEach((eachId) => {
                // const updateInfo: LayerInfo = { id: eachId, visible: payload.visible };
                commit("updateLayerInfoVisibility", {id: eachId, visible: payload.visible});
                const info = getLayerInfo(state, eachId);
                if (info.status !== "loaded") {
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

const getLayerInfo = (state: State, id: string): LayerInfo => {
    const info = state.layerList.find((item) => item.id === id);
    if (!info) { throw "Layer with specified ID, " + id + ", does not exist." }
    return info;
}

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

