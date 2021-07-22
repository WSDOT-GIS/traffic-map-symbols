<template>
  <PopupView
    :MapX="mapX"
    :MapY="mapY"
    Width="w"
    TitleColor="#33957f"
    ref="popupRef"
    @close="close"
  >
    <template v-slot:title>
      Camera{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
      <h4 class="camera-popup-img-title">{{ infos[currentIdx].title }}</h4>
      <Carousel
        :items-to-show="1"
        :wrapAround="true"
        @update:modelValue="currentIdx = $event"
      >
        <Slide v-for="eachInfo in infos" :key="eachInfo.id">
          <div class="carousel-item-container">
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
      <table>
        <tr>
          <td class="popupKey">ID</td>
          <td class="popupValue">{{ infos[currentIdx].id }}</td>
        </tr>
        <tr>
          <td class="popupKey">SR</td>
          <td class="popupValue">{{ infos[currentIdx].srid }}</td>
        </tr>
        <tr>
          <td class="popupKey">Milepost</td>
          <td class="popupValue">{{ infos[currentIdx].milepost }}</td>
        </tr>
        <tr>
          <td class="popupKey">Direction</td>
          <td class="popupValue">{{ infos[currentIdx].compassDirection }}</td>
        </tr>
        <tr>
          <td class="popupKey">Owner Name</td>
          <td class="popupValue">{{ infos[currentIdx].ownerName }}</td>
        </tr>
        <tr>
          <td class="popupKey">Owner URL</td>
          <td class="popupValue">{{ infos[currentIdx].ownerURL }}</td>
        </tr>
      </table>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, toRefs, watch } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import PopupView from "./PopupView.vue";
import CameraInfo from "@/types/CameraInfo";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import CameraLayer, { getCameraInfosByIds } from "@/layers/CameraLayer";

export default defineComponent({
  components: { PopupView, Carousel, Slide, Pagination, Navigation },
  props: {
    Info: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
    MapX: {
      type: Number,
      required: true,
    },
    MapY: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const propsInfo = toRefs(props).Info;
    const propsMapX = toRefs(props).MapX;
    const propsMapY = toRefs(props).MapY;
    const infos = ref<CameraInfo[]>([]);
    const currentIdx = ref(0);
    const mapX = ref(0);
    const mapY = ref(0);

    watch([propsInfo, propsMapX, propsMapY], () => {
      if (props.Info.layerName === CameraLayer.title) {
        console.log("Camera Layer Popup!");
        show();
      } else {
        close();
      }
    });
    watch(currentIdx, () => {
      console.log("Test: " + currentIdx.value);
    });
    const show = () => {
      const setVal = () => {
        getCameraInfosByIds(props.Info.objectids).then((results) => {
          infos.value = results;
          mapX.value = props.MapX;
          mapY.value = props.MapY;
        });
      };
      if (mapX.value !== 0 || mapY.value !== 0 || infos.value.length > 0) {
        // console.log("Clean and set popup value");
        // Clean up the previous data...
        close();
        // Wait for the next update. Without doing this, scrolling won't work correctly.
        nextTick(() => {
          // console.log("nextTick callback...");
          setVal();
        });
      } else {
        // console.log("Set popup value.");
        setVal();
      }
    };
    // Setting XY to 0 closes the popup...
    const close = () => {
      // console.log("close CameraPopup");
      mapX.value = 0;
      mapY.value = 0;
      infos.value = [];
    };

    const onImageLoaded = () => {
      popupRef.value?.adjustPositionSize();
    };
    return {
      popupRef,
      mapX,
      mapY,
      infos,
      close,
      onImageLoaded,
      currentIdx,
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
.carousel__prev,
.carousel__next {
  background-color: transparent !important;
}
.carousel__prev {
  left: 5%;
  top: 40%;
}
.carousel__next {
  right: 5%;
  top: 40%;
}
svg.carousel__icon {
  width: 2em;
  height: 2em;
  filter: drop-shadow(3px 3px 2px rgb(0 0 0 / 1));
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
  --carousel-color-secondary: #97dccc;
}
.popupKey {
  font-weight: bold;
  text-align: left;
  background-color: lightgrey;
}
.popupValue {
  text-align: left;
  /* word-wrap: break-word; */
  word-break: break-all;
}
</style>
