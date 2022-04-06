import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { useToast } from "vue-toastification";
import Extent from "@arcgis/core/geometry/Extent";
import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { convert2EsriExtent, convert2ExtentInfo } from "./utils/extentUtil";
import LayerInfo, { esriStatus2LayerStatus, LayerStatus } from "./types/LayerInfo";
import { InitializingInfo } from "./types/InitializingInfo";
import { getMediaSize } from "./utils/miscUtil";
import { setLayerVisibility } from "./utils/layerUtil";
import Layer from "@arcgis/core/layers/Layer";

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
    errors: string[]; // Shown in the toast.
    serviceAlerts: string[]; // Shown in the banner.
    serviceAlertsBannerVisible: boolean;
    isToastReady: boolean;
}
//
const toast = useToast();
let basemapWatchHandles: __esri.WatchHandle[];
let layerWatchHandles: __esri.WatchHandle[];

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
            isInitializing: false,
            isLoading: false,
            initiaizingMessage: "",
            leftPaneIsOpen: getMediaSize() !== "s",
            mediaSize: getMediaSize(),
            errors: [],
            serviceAlerts: [],
            serviceAlertsBannerVisible: false,
            isToastReady: false
        }
    },
    getters: {
        getLayerInfo: (state) => (id: string) => {
            return getLayerInfo(state, id);
        },
        layerInfoExists: (state) => (id: string) => {
            const result = state.layerList.filter((item) => item.id === id);
            return result.length === 1;
        },
        getLayerStatus: (state) => (id: string) => {
            const info = getLayerInfo(state, id);
            if (info) { return info.status; }
            else { return LayerStatus.NotLoaded; }
        },
        getLayerVisibility: (state) => (id: string) => {
            const info = getLayerInfo(state, id);
            if (info) { return info.visible; }
            else { return false; }
        },
        getLayerTitle: (state) => (id: string) => {
            const info = getLayerInfo(state, id);
            let title: string | undefined;
            if (info) {
                title = (info as LayerInfo).title;
            }
            return title;
        },
        lastError: state => {
            return state.errors[state.errors.length - 1];
        },
        getServiceAlerts: state => {
            return state.serviceAlerts
        }
    },
    mutations: {
        setBasemap(state, payload: string) {
            if (state.basemap != payload || !state.basemap) {
                const basemapInfo = getBasemapInfo(payload);
                state.basemap = basemapInfo.name;
                if (basemapInfo.basemap) {
                    if (basemapWatchHandles) {
                        basemapWatchHandles.forEach(eachHandle => eachHandle.remove());
                    }
                    basemapWatchHandles = [];
                    webmap.basemap = basemapInfo.basemap;
                    if (webmap.basemap.loadStatus === "failed") {
                        addServiceAlert(state, webmap.basemap.title);
                    }
                    webmap.basemap.baseLayers.forEach(eachLyr => {
                        const handle = eachLyr.watch("loadStatus", (newValue, oldValue, propertyName, target) => {
                            const lyr = target as Layer;
                            if (newValue === "failed") {
                                addServiceAlert(state, lyr.title);
                            }
                        });
                        basemapWatchHandles.push(handle);
                    });
                } else {
                    addServiceAlert(state, payload);
                }
            }
        },
        toggleBasemap(state) {
            const basemapInfo = toggleBasemapInfo(state.basemap);
            state.basemap = basemapInfo.name;
            if (basemapInfo.basemap) {
                webmap.basemap = basemapInfo.basemap;
                if (webmap.basemap.loadStatus === "failed") {
                    addServiceAlert(state, webmap.basemap.title);
                }
            } else {
                addServiceAlert(state, webmap.basemap.title);
            }
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
         * Add LayerInfos if not exist already, or update the existing ones.
         *
         * @param state 
         * @param payload 
         */
        setLayerInfos(state, payload: LayerInfo[]) {
            payload.forEach(newInfo => {
                const info = getLayerInfo(state, newInfo.id);
                if (!info) {
                    state.layerList.push(newInfo);
                    if (newInfo.status === LayerStatus.Failed) {
                        addServiceAlert(state, newInfo);
                    }
                    else { removeServiceAlert(state, newInfo) }
                } else {
                    if (newInfo.title) { info.title = newInfo.title; }
                    if (newInfo.index) { info.index = newInfo.index; }
                    if (newInfo.url) { info.url = newInfo.url }
                    if (newInfo.visible !== undefined) { info.visible = newInfo.visible }
                    if (newInfo.status) {
                        if (info.status !== LayerStatus.Failed && newInfo.status === LayerStatus.Failed) {
                            addServiceAlert(state, info);
                        }
                        else {
                            removeServiceAlert(state, newInfo)
                        }
                        info.status = newInfo.status
                    }
                }
            })
        },
        /**
         * Update a layer info in the layer list
         *
         * @param state 
         * @param payload Set the properties that need to be updated, and leave others undefined. Undefined properties will not be updated. 
         * @param payload.id
         * @param payload.title
         * @param payload.index
         * @param payload.url
         * @param payload.visible
         * @param payload.status
         */
        updateLayerInfo(state, payload: {
            id: string, title?: string, index?: number, url?: string, visible?: boolean,
            status?: LayerStatus
        }) {
            let info = getLayerInfo(state, payload.id);
            if (!info) {
                info = new LayerInfo(payload.id);
                state.layerList.push(info);
            }
            if (payload.title) { info.title = payload.title }
            if (payload.index) { info.index = payload.index; }
            if (payload.url) { info.url = payload.url }
            if (payload.visible !== undefined) { info.visible = payload.visible }
            if (payload.status) {
                if (info.status !== LayerStatus.Failed && payload.status === LayerStatus.Failed) {
                    addServiceAlert(state, info);
                }
                else {
                    removeServiceAlert(state, info);
                }
                info.status = payload.status;
            }
            else if (info.status === LayerStatus.Failed && info.visible) {
                addServiceAlert(state, info);
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
        },
        addServiceAlert(state, msg: string) {
            addServiceAlert(state, msg);
        },
        removeServiceAlert(state, msg: string) {
            removeServiceAlert(state, msg);
        },
        setServiceAlertBannerVisibility(state, visible: boolean) {
            setServiceAlertBannerVisibility(state, visible)
        }
    },
    actions: {
        updateLayerVisibility({ commit, state }, payload?: { ids: string[], visible: boolean }) {
            if (payload) {
                payload.ids.forEach((eachId) => {
                    commit("updateLayerInfo", { id: eachId, visible: payload.visible });
                    const info = getLayerInfo(state, eachId);
                    if (info && webmap) {
                        const layer = webmap.findLayerById(eachId);
                        if (layer) {
                            setLayerVisibility(layer, info, payload.visible).then((newStatus) => {
                                if (info.status !== newStatus) {
                                    commit("updateLayerInfo", { id: eachId, status: newStatus });
                                }
                            })
                        }
                    }
                });
            } else {
                webmap.layers.forEach(mapLyr => {
                    commit("updateLayerInfo", { id: mapLyr.id, visible: mapLyr.visible });
                })
            }
        },
        updateLayerIndices({ commit }) {
            webmap.layers.forEach((mapLyr, idx) => {
                commit("updateLayerInfo", { id: mapLyr.id, index: idx });
            })
        },
        /** 
         * Setup layer watch handlers to keep track of layer status.
         * If it is JSON layer, only use the layer's loadStatus property if it is "Failed". Otherwise the status is updated when JSON is fetched.
         * If it is not a JSON layer, use the layer's loadStatus property.
         *
         * @param root0
         * @param root0.commit
         * @param root0.state
         */
        watchLayers({ commit, state }) {
            if (layerWatchHandles) {
                layerWatchHandles.forEach(handle => handle.remove());
            }
            layerWatchHandles = [];
            webmap.layers.forEach((mapLyr) => {
                const info = getLayerInfo(state, mapLyr.id);
                if (!info) { return; }
                const isJson = info.isJson();
                if (!isJson) {
                    commit("updateLayerInfo", { id: mapLyr.id, status: esriStatus2LayerStatus(mapLyr.loadStatus) })
                }
                else if (mapLyr.loadStatus === "failed") {
                    commit("updateLayerInfo", { id: mapLyr.id, status: LayerStatus.Failed })
                }
                const handle = mapLyr.watch("loadStatus", (newValue, oldValue, propertyName, target) => {
                    const lyr = target as Layer;
                    if (!isJson) {
                        commit("updateLayerInfo", { id: lyr.id, status: esriStatus2LayerStatus(newValue) })
                    }
                    else if (newValue === "failed") {
                        commit("updateLayerInfo", { id: lyr.id, status: LayerStatus.Failed })
                    }
                });
                layerWatchHandles.push(handle);
            })
        },
        updateLayerStatus({ commit }, payload: LayerInfo[]) {
            payload.forEach(info => commit("updateLayerInfo", { id: info.id, status: info.status }));
        },
        showError({ state }, message: string) {
            showError(state, message);
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

const getLayerInfo = (state: State, id: string): LayerInfo | undefined => {
    const info = state.layerList.find((item) => item.id === id);
    return info;
}

const showError = (state: State, message: string) => {
    if (state.isToastReady) {
        toast.error(message);
    }
    else { store.commit("saveError", message); }
}

const addServiceAlert = (state: State, alert: string | LayerInfo) => {
    let msg: string;
    if (alert instanceof LayerInfo) {
        msg = alert.title ? alert.title : alert.id;
    } else {
        msg = alert;
    }
    if (state.serviceAlerts.findIndex(each => each === msg) < 0) {
        state.serviceAlerts.push(msg);
    }
    // If the banner was closed, open it again...
    if (!state.serviceAlertsBannerVisible) {
        setServiceAlertBannerVisibility(state, true);
    }
}
const setServiceAlertBannerVisibility = (state: State, visible: boolean) => {
    state.serviceAlertsBannerVisible = visible
}
const removeServiceAlert = (state: State, alert: string | LayerInfo) => {
    let msg: string;
    if (alert instanceof LayerInfo) {
        msg = alert.title ? alert.title : alert.id;
    } else {
        msg = alert;
    }
    if (state.serviceAlerts.findIndex(each => each === msg) > -1) {
        const alertIndex = state.serviceAlerts.findIndex(each => each === msg)
        state.serviceAlerts.splice(alertIndex, 1);
    }
}
/**
 * Clone the target of proxy (i.e. removing the reactivity)
 *
 * @param proxy The reactive object
 * @returns Non-reactive copy of the object
 */
export const cloneProxyTarget = <T>(proxy: T): T => {
    const copy = JSON.parse(JSON.stringify(proxy));
    return copy;
}

/**
 * define custom useStore that supply key so do not have to do this in each component...
 */
export const useStore = (): Store<State> => {
    return baseUseStore(key);
}

