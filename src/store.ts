import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import Extent from "@arcgis/core/geometry/Extent";
import { webmap, mapView } from "./esri-stuff/esriMap";
import { getBasemapInfo, toggleBasemapInfo } from "./layers/Basemaps";
import ExtentInfo from "./types/ExtentInfo";
import { convert2EsriExtent, convert2ExtentInfo } from "./utils/extentUtil";
import { setLayerFromUrl } from "./utils/urlParamUtil";
import LayerInfo from "./types/LayerInfo";


// Reference - https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
<<<<<<< HEAD
    basemap: string,
    pointerX: number,
    pointerY: number,
    layerList: LayerInfo[],//{ index: number, title: string, visible: boolean }[],
    currentExtent: ExtentInfo,
    userLocation: number[]|null
=======
    basemap: string;
    pointerX: number;
    pointerY: number;
    layerList: LayerInfo[];//{ index: number, title: string, visible: boolean }[],
    currentExtent: ExtentInfo;
>>>>>>> 073e1d03a32392513c2dc4c7c6d259ccd444225c
}

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {//ask masao about this
        const layerList = [
            { index: 0, title: "Traffic", visible: true },
            { index: 1, title: "Park and Rides", visible: false },
            { index: 2, title: "Traffic Cameras", visible: false },
<<<<<<< HEAD
            { index: 3, title:"test1", visible: true},
            { index: 4, title: "test2", visible:false}

=======
>>>>>>> 073e1d03a32392513c2dc4c7c6d259ccd444225c
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
            layerList: layerList,
<<<<<<< HEAD
            userLocation:null
=======
            // layerList: [
            //     { index: 0, title: "Traffic", visible: true },
            //     { index: 1, title: "Park and Rides", visible: false },
            //     { index: 2, title: "Traffic Cameras", visible: false }
            // ]
>>>>>>> 073e1d03a32392513c2dc4c7c6d259ccd444225c
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
            const basemapInfo = toggleBasemapInfo(state.basemap);//Look at this with masao
            state.basemap = basemapInfo.name;
            webmap.basemap = basemapInfo.basemap;
        },
        setPointerX(state, payload) {
            state.pointerX = payload.toFixed(6);
        },
        setPointerY(state, payload) {
            state.pointerY = payload.toFixed(6);
        },
        setUserLocation(state, payload) {
            state.userLocation = payload;
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
                // If the payload is ESRI extent, then update the state only.
                const extentInfo = convert2ExtentInfo(payload);
                state.currentExtent = extentInfo;
                //console.log(JSON.stringify(state.currentExtent));
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
export const cloneProxyTarget = (proxy: any): any => {
    const copy = JSON.parse(JSON.stringify(proxy));
    console.log(JSON.stringify(copy));
    return copy;
}

// define custom useStore that supply key so do not have to do this in each component...
export const useStore = (): Store<State> => {
    return baseUseStore(key);
}
