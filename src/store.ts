import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { webmap } from "./esri-stuff/esriMap";
import { wsdotBasemap, satelliteBasemap } from "./layers/Basemaps";

// https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function
// define typings for the store state...
export interface State {
    basemap: string,
    pointerX: number,
    pointerY: number
}

// define injection key...
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            basemap: "wsdot",
            pointerX: 0,
            pointerY: 0

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
        },
        setPointerX(state, payload) {
            state.pointerX = payload;
        },
        setPointerY(state, payload) {
            state.pointerY = payload;
        }
    },

})

// define custom useStore method...
export function useStore() {
    return baseUseStore(key);
}
