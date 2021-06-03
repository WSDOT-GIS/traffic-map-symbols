import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { webmap } from "./esri-stuff/esriMap";
import { wsdotBasemap, satelliteBasemap } from "./layers/Basemaps";

// Reference - https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
    basemap: string,
    pointerX: number,
    pointerY: number,
    layerList: { index: number, title: string, visible: boolean }[]
}

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            basemap: "wsdot",
            pointerX: 0,
            pointerY: 0,
            layerList: []
        }
    },
    getters:{
        completeLayerList: state =>{
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
        }
    },
   /* actions:{
        toggleLayer (context, target) {
            context.commit('toggleLayer',target)
          }
    }*/
})

// define custom useStore that supply key so do not have to do this in each component...
export function useStore() {
    return baseUseStore(key);
}
