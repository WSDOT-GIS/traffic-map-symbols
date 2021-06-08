import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import Extent from "@arcgis/core/geometry/Extent";

import { webmap, mapView } from "./esri-stuff/esriMap";
import { wsdotBasemap, satelliteBasemap } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { Convert2EsriExtent, Convert2ExtentInfo } from "./utils/extentUtil";


// Reference - https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
    basemap: string,
    pointerX: number,
    pointerY: number,
    layerList: { index: number, title: string, visible: boolean }[],
    currentExtent: ExtentInfo,
}

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
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
        }
    },
    getters: {
        completeLayerList: state => {
            return state.layerList
        }

    },
    mutations: {
        toggleBasemap(state) {

            if (state.basemap == "wsdot") {
                state.basemap = "satellite"
            } else {
                state.basemap = "wsdot"
            }

            if (state.basemap == "wsdot") {
                webmap.basemap = wsdotBasemap
            }
            else {
                webmap.basemap = satelliteBasemap
            }
            console.log(state.basemap)
            console.log(webmap.basemap)
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

// define custom useStore that supply key so do not have to do this in each component...
export const useStore = (): Store<State> => {
    return baseUseStore(key);
}
