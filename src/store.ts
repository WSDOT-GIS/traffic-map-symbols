import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import Extent from "@arcgis/core/geometry/Extent";
import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { convert2EsriExtent, convert2ExtentInfo } from "./utils/extentUtil";
import LayerInfo from "./types/LayerInfo";

// Reference - https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
    basemap: string;
    pointerX: number;
    pointerY: number;
    mapSize: { width: number; height: number };
    layerList: LayerInfo[];
    currentExtent: ExtentInfo;
    userLocation: number[] | null;
    isMobile: boolean;
}

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

const isMobile = (): boolean => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    }
    else { return false; }
}

export const store = createStore<State>({
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
            isMobile: isMobile(),
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
            console.log(webmap.findLayerById("esri-reference-layer").loaded)
            webmap.basemap.title=="Imagery"? webmap.findLayerById("esri-reference-layer").visible=true:webmap.findLayerById("esri-reference-layer").visible=false
            
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
                if (layer.title && state.layerList[index] && layer.title == state.layerList[index].title) {
                    layer.visible = state.layerList[index].visible
                }
            })
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
    },
})
// Clone the target of proxy (i.e. removing the reactivity)
export const cloneProxyTarget = <T>(proxy: T): T => {
    const copy = JSON.parse(JSON.stringify(proxy));
    //console.log(JSON.stringify(proxy) + "\n" + JSON.stringify(copy));
    return copy;
}

// define custom useStore that supply key so do not have to do this in each component...
export const useStore = (): Store<State> => {
    return baseUseStore(key);
}
