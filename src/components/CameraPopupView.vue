<template>
  <div
    id="camera-popup-container"
    v-if="Visible"
    :style="{
      marginTop: top + 'px',
      marginLeft: left + 'px',
    }"
    @click="onClick"
  >
    <div class="popup-header">
      Traffic Camera{{
        CameraInfos.length > 1 ? " (" + CameraInfos.length + ")" : ""
      }}
    </div>
    <div
      class="popup-content"
      :style="{
        maxHeight: maxHeight + 'px',
      }"
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
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
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
          maxHeight.value = mapDiv.clientHeight - 25; // Map view height - header etc
          let y: number;
          if (maxHeight.value < props.PositionY + h) {
            const h2 = h > mapDiv.clientHeight ? mapDiv.clientHeight : h;
            y = mapDiv.clientHeight - h2; // props.PositionY - ((h2 + props.PositionY) - mapDiv.clientHeight);
          } else {
            y = Number(props.PositionY.toString());
          }
          top.value = y >= 0 ? y : 0;
          // Adjust horizontal position.
          let x: number;
          if (mapDiv.clientWidth < props.PositionX) {
            x = mapDiv.clientWidth - w - 10;
          } else if (mapDiv.clientWidth < props.PositionX + w) {
            // Show it on the left side of the feature...
            x = props.PositionX - w;
          } else {
            x = Number(props.PositionX.toString());
          }
          left.value = x >= 0 ? x : 0;
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
  padding: 0;
  width: 200px;
}
.popup-header {
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  padding: 3px 0;
  color: #fff;
  background-color: #808080;
}
.popup-content {
  padding: 0 10px 10px 10px;
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
  border-bottom-right-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-bottom-right-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
