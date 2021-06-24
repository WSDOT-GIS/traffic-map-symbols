<template>
  <div
    id="camera-popup-container"
    v-if="Visible"
    :style="{
      marginTop: top + 'px',
      marginLeft: left + 'px',
      maxHeight: maxHeight + 'px',
    }"
    @click="onClick"
  >
    <div v-for="eachInfo in CameraInfos" :key="eachInfo.id">
      <p>{{ eachInfo.title }}</p>
      <img
        class="camera-popup-img"
        :src="eachInfo.imageURL"
        :alt="eachInfo.id"
        @load="fixPositionSize"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import CameraInfo from "@/types/CameraInfo";

export default defineComponent({
  props: {
    Visible: {
      type: Boolean,
      requied: true,
    },
    PositionX: {
      type: Number,
      required: true,
    },
    PositionY: {
      type: Number,
      required: true,
    },
    CameraInfos: {
      type: Array as PropType<CameraInfo[]>,
      required: true,
    },
  },
  setup(props) {
    const maxHeight = ref(1000);
    const left = ref(0);
    const top = ref(0);
    // Adjust popup position when the props change...
    watch(
      () => [props.PositionX, props.PositionY],
      () => fixPositionSize()
    );
    // Make sure the popup is displayed in the map view area by adjusting position and height...
    const fixPositionSize = () => {
      const div = document.getElementById("camera-popup-container");
      if (div) {
        const h = div.offsetHeight;
        const w = div.offsetWidth;
        const mapDiv = document.getElementById("map_view");
        if (mapDiv) {
          // Adjust vertical position to make sure it fits in the map view.
          maxHeight.value = mapDiv.clientHeight - 22; // 22 = padding top + bottom + border top + bottom
          if (maxHeight.value < props.PositionY + h) {
            const h2 = h > mapDiv.clientHeight ? mapDiv.clientHeight : h;
            top.value = mapDiv.clientHeight - h2; // props.PositionY - ((h2 + props.PositionY) - mapDiv.clientHeight);
          } else {
            top.value = Number(props.PositionY.toString());
          }
          // Adjust horizontal position.
          if (mapDiv.clientWidth < props.PositionX + w) {
            left.value = props.PositionX - w;
          } else {
            left.value = Number(props.PositionX.toString());
          }
        }
        console.log("Popup top: " + top.value + ", left: " + left.value);
      }
    };
    return {
      left,
      top,
      maxHeight,
      fixPositionSize,
    };
  },

  methods: {
    onClick() {
      this.$emit("clicked");
    },
  },
});
</script>

<style scoped>
#camera-popup-container {
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  z-index: 99;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #808080;
  padding: 10px;
  width: 200px;
  overflow-y: auto;
}
.camera-popup-img {
  max-width: 100%;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
