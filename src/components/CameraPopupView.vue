<template>
  <PopupView :MapX="MapX" :MapY="MapY" ref="popupRef">
    <template v-slot:header>
      Traffic Camera{{
        CameraInfos.length > 1 ? " (" + CameraInfos.length + ")" : ""
      }}
    </template>
    <template v-slot:default>
      <div v-for="eachInfo in CameraInfos" :key="eachInfo.id">
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
import { defineComponent, PropType, ref } from "vue";
import PopupView from "./PopupView.vue";
import CameraInfo from "@/types/CameraInfo";

export default defineComponent({
  components: { PopupView },
  props: {
    MapX: {
      type: Number,
      required: true,
    },
    MapY: {
      type: Number,
      required: true,
    },
    CameraInfos: {
      type: Array as PropType<CameraInfo[]>,
      required: true,
    },
  },
  setup() {
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const show = () => {
      popupRef.value?.show();
    };
    const close = () => {
      popupRef.value?.close();
    };
    const onImageLoaded = () => {
      console.log("Image is loaded");
      popupRef.value?.adjustPositionSize();
    };
    return {
      popupRef,
      show,
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
