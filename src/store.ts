import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import Extent from "@arcgis/core/geometry/Extent";

import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo, getDefaultBasemapInfo } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { Convert2EsriExtent, Convert2ExtentInfo } from "./utils/extentUtil";
import { setLayerFromUrl } from "./utils/urlParamUtil";
import LayerInfo from "./types/LayerInfo";


// Reference - https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
    basemap: string,
    pointerX: number,
    pointerY: number,
    layerList: LayerInfo[],//{ index: number, title: string, visible: boolean }[],
    currentExtent: ExtentInfo,
}

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        const layerList = [
            { index: 0, title: "Traffic", visible: true },
            { index: 1, title: "Park and Rides", visible: false },
            { index: 2, title: "Traffic Cameras", visible: false }
        ]
        setLayerFromUrl(layerList);

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
            // switch (state.basemap) {
            //     case "satellite":
            //         webmap.basemap = satelliteBasemap;
            //         break;
            //     default:
            //         webmap.basemap = wsdotBasemap;
            // }
        },
        toggleBasemap(state) {
            const basemapInfo = toggleBasemapInfo(state.basemap);
            state.basemap = basemapInfo.name;
            // if (state.basemap == "wsdot") {
            //     state.basemap = "satellite"
            // } else {
            //     state.basemap = "wsdot"
            // }
            webmap.basemap = basemapInfo.basemap;
            // switch (state.basemap) {
            //     case "satellite":
            //         webmap.basemap = satelliteBasemap;
            //         break;
            //     default:
            //         webmap.basemap = wsdotBasemap;
            // }
        },
        setPointerX(state, payload) {
            state.pointerX = payload;
        },
        setPointerY(state, payload) {
            state.pointerY = payload;
        },
        setLayerList(state, payload) {
            state.layerList = payload;
            webmap.layers.map((layer, index) => {
                layer.visible = state.layerList[index].visible
                console.log(index + " " + layer.title + " " + layer.visible)
            })
        },
        setCurrentExtent(state, payload) {
            if (payload instanceof Extent) {
                const extentInfo = Convert2ExtentInfo(payload);
                state.currentExtent = extentInfo;
                console.log(JSON.stringify(state.currentExtent));
            } else {
                const extent = Convert2EsriExtent(payload);
                mapView.extent = extent;
            }
        },

    },
})
// Clone the target of proxy (i.e. removing the reactivity)
export const cloneProxyTarget = (proxy: any): any => {
    const copy = JSON.parse(JSON.stringify(proxy));
    console.log(JSON.stringify(copy));
    return copy;
}

// define custom useStore that supply key so do not have to do this in each component...
export const useStore = (): Store<State> => {
    return baseUseStore(key);
}
