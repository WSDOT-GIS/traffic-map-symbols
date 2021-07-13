<template>
  <PopupView :MapX="mapX" :MapY="mapY" Width="w" ref="popupRef" @close="close">
    <template v-slot:title>
      Camera{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
      <Carousel :items-to-show="1" :wrapAround="true">
        <Slide v-for="eachInfo in infos" :key="eachInfo.id">
          <div class="carousel-item-container">
            <h3 class="camera-popup-img-title">{{ eachInfo.title }}</h3>
            <img
              class="camera-popup-img"
              :src="eachInfo.imageURL"
              :alt="eachInfo.id"
              @load="onImageLoaded"
            />
          </div>
        </Slide>
        <template #addons="{ slidesCount }">
          <navigation v-if="slidesCount > 1" />
          <pagination v-if="slidesCount > 1" />
        </template>
      </Carousel>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import PopupView from "./PopupView.vue";
import CameraInfo from "@/types/CameraInfo";
import { mapView, tryZoomToPoint } from "@/esri-stuff/esriMap";
import CameraLayer from "@/layers/CameraLayer";
import {
  getCameraInfosFromCluster,
  getCameraInfoById,
} from "@/layers/CameraLayer";

import Point from "@arcgis/core/geometry/Point";
// import Graphic from "@arcgis/core/Graphic";

export default defineComponent({
  components: { PopupView, Carousel, Slide, Pagination, Navigation },
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
      // mapView.whenLayerView(CameraLayer).then((layerView) => {
      //   layerView.highlight(g);
      // })
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
            const cameraId = g.getObjectId();
            getCameraInfoById(cameraId).then((response) => {
              if (response) {
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
.camera-popup-img-title {
  margin: 5px 0;
}
.camera-popup-img {
  width: 100%;
  height: auto;
}
.carousel-item-container {
  width: 100%;
}
</style>
<style>
.carousel__prev, .carousel__next {
  background-color: transparent !important;
}
.carousel__prev {
  left: 5%;
}
.carousel__next {
  right: 5%;
}
svg.carousel__icon {
  width: 2em;
  height: 2em;
}
.carousel__pagination-button {
  width: 10px;
  height: 10px;
  border-radius: 10px;
}
.carousel__pagination {
  margin: 5px;
}
:root {
    --carousel-color-primary: #007b5f;
    --carousel-color-secondary:#97dccc;
}
</style>
