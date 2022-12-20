import Point from "@arcgis/core/geometry/Point";
import { useStore } from "../store";
const store = useStore();
export const showPopup = (layerId: string, ids: number[], popupFeatureset:any, popupXY:any, pt?: Point) => {
    popupFeatureset.value = { layerId: layerId, ids: ids };
    if (pt) {
      popupXY.value = { x: pt.x, y: pt.y };
    } else {
      popupXY.value = undefined;
    }
    store.commit("setInitializing", { isInitializing: false });
};
export const closePopup = (popupFeatureset:any, popupXY:any) => {
    popupFeatureset.value = { layerId: "", ids: [] };
    popupXY.value = undefined;
}