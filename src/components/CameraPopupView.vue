<template>
  <PopupView :MapX="mapX" :MapY="mapY" ref="popupRef" @close="close">
    <template v-slot:title>
      Camera{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
      <div v-for="eachInfo in infos" :key="eachInfo.id">
        <p>{{ eachInfo.title }}</p>
        <img
          class="camera-popup-img"
          :src="eachInfo.imageURL"
          :alt="eachInfo.id"
          @load="onImageLoaded"
        />
      </div>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PopupView from "./PopupView.vue";
import CameraInfo from "@/types/CameraInfo";
import { mapView, tryZoomToPoint } from "@/esri-stuff/esriMap";
import CameraLayer from "@/layers/CameraLayer";
import {
  getCameraInfosFromCluster,
  getCameraInfoById,
} from "@/layers/CameraLayer";

import Point from "@arcgis/core/geometry/Point";

export default defineComponent({
  components: { PopupView },
  setup() {
    // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const mapX = ref(0);
    const mapY = ref(0);
    const infos = ref<CameraInfo[]>([]);

    const show = (pt: Point, cameraInfos: CameraInfo[]) => {
      mapX.value = pt.x;
      mapY.value = pt.y;
      infos.value = cameraInfos;
    };
    // Setting XY to 0 closes the popup...
    const close = () => {
      mapX.value = 0;
      mapY.value = 0;
      infos.value = [];
    };

    const onImageLoaded = () => {
      popupRef.value?.adjustPositionSize();
    };
    // MapView click event handler...
    mapView.on("click", (event) => {
      // Check if pointer is over one of the zoom extents...
      const opts = {
        include: [CameraLayer],
      };
      mapView.hitTest(event, opts).then((response) => {
        // check if a feature is returned from the zoom layer...
        if (response.results.length) {
          // Show custom popup...
          const g = response.results[0].graphic;
          const pt = g.geometry as Point;
          if (g.isAggregate) {
            if (g.attributes.cluster_count < 10) {
              // Try to get camera infos from the cluster...
              getCameraInfosFromCluster(g, mapView, 3).then((results) => {
                // Show multiple pictures if infos are returned...
                // infos.value = results ? results : [];
                results ? show(pt, results) : close();
                if (!results) {
                  // Zoom-in more...
                  const zoomResult = tryZoomToPoint(g.geometry as Point);
                  if (!zoomResult) {
                    getCameraInfosFromCluster(g, mapView).then((results) => {
                      results ? show(pt, results) : close();
                    });
                  }
                }
              });
            } else {
              // Too many in a cluster, so click to zoom-in...
              close();
              infos.value = [];
              tryZoomToPoint(g.geometry as Point);
            }
          } else {
            //show(pt.x, pt.y);
            const cameraId = g.getObjectId();
            getCameraInfoById(cameraId).then((response) => {
              //infos.value = [];
              if (response) {
                //infos.value.push(response);
                show(pt, [response]);
              }
            });
          }
        } else {
          close();
        }
      });
    });
    return {
      popupRef,
      mapX,
      mapY,
      infos,
      close,
      onImageLoaded,
    };
  },
});
</script>

<style scoped>
.camera-popup-img {
  max-width: 100%;
}
</style>
