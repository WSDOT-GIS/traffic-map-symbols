import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import Extent from "@arcgis/core/geometry/Extent";
import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { convert2EsriExtent, convert2ExtentInfo } from "./utils/extentUtil";
import LayerInfo from "./types/LayerInfo";
import LoadingStateInfo from "./types/LoadingStateInfo";
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
    isLoading: boolean;
    loadingMessage: string;
    leftPaneIsOpen: boolean;
    /** s: small, l:large */
    mediaSize: "s" | "l"; // TODO: add more as needed
}

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
            layerList: [],
            userLocation: null,
            isMobileMenuOpen: false,
            isLoading: false,
            loadingMessage: "",
            leftPaneIsOpen: getMediaSize() !== "s",
            mediaSize: getMediaSize(),
        }
    },
    getters: {
        completeLayerList: state => {
            return state.layerList
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
        setLayerList(state, payload) {
            let layerList: LayerInfo[];
            if (!payload) {
                layerList = [];
                webmap.layers.forEach((layer, index) => {
                    layerList.push({
                        id: layer.id,
                        index: index,
                        title: layer.title,
                        visible: layer.visible,
                    });
                });
            }
            else {
                layerList = payload;
            }
            state.layerList = layerList;
            if (payload) {
                webmap.layers.forEach((layer, index) => {
                    if (state.layerList[index] && layer.id == state.layerList[index].id) {
                        layer.visible = state.layerList[index].visible
                    }
                })
            }
        },
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
        setIsLoading(state, payload: LoadingStateInfo) {
            state.isLoading = payload.loading
            state.loadingMessage = payload.message as string
        },
        setLeftPaneIsOpen(state, payload) {
            state.leftPaneIsOpen = payload;
        }
    },
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

