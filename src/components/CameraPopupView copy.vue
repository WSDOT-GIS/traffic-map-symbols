<template>
  <div
    id="camera-popup-container"
    v-if="visible"
    :style="{
      marginTop: screenY_adjusted + 'px',
      marginLeft: screenX_adjusted + 'px',
    }"
  >
    <div class="popup-header">
      Traffic Camera{{
        CameraInfos.length > 1 ? " (" + CameraInfos.length + ")" : ""
      }}
      <button class="popup-close-button" @click="close">x</button>
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
          @load="adjustPositionSize"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import CameraInfo from "@/types/CameraInfo";
import { mapView, toScreenXY } from "@/esri-stuff/esriMap";

export default defineComponent({
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
  setup(props) {
    const maxHeight = ref(1000);
    const mapX = ref(0);
    const mapY = ref(0);
    const screenX = ref(0);
    const screenY = ref(0);
    const screenX_adjusted = ref(0);
    const screenY_adjusted = ref(0);
    const visible = ref(false);
    
    // Adjust popup position when the props change...
    watch(
      () => [props.MapX, props.MapY],
      () => setPosition()
    );
    // Pointer drag event handler...
    mapView.on("drag", (event) => {
      onMapViewDrag(event);
    });
    mapView.on("resize", () => {
      if (visible.value && mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    // Watch scale change...
    mapView.watch("scale", () => {
      console.log(visible.value + " " + mapX.value + " " + mapY.value);
      if (visible.value && mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    // Make sure the popup is displayed in the map view area by adjusting position and height...
    const setPosition = () => {
      mapX.value = props.MapX;
      mapY.value = props.MapY;
      setScreenXY();
    };
    // Convert map coordinates to screen coordinates and calculate the popup position...
    const setScreenXY = () => {
      const screenXY = toScreenXY(mapX.value, mapY.value);
      screenX.value = screenXY.x;
      screenY.value = screenXY.y;
      adjustPositionSize();
    };
    // Make sure the popup is displyed within the map view...
    const adjustPositionSize = () => {
      const div = document.getElementById("camera-popup-container");
      if (div) {
        const h = div.offsetHeight;
        const w = div.offsetWidth;
        const mapDiv = document.getElementById("map_view");
        if (mapDiv) {
          // Adjust vertical position to make sure it fits in the map view.
          maxHeight.value = mapDiv.clientHeight - 25; // Map view height - header etc
          let y: number;
          if (maxHeight.value < screenY.value + h) {
            const h2 = h > mapDiv.clientHeight ? mapDiv.clientHeight : h;
            y = mapDiv.clientHeight - h2; // props.PositionY - ((h2 + props.PositionY) - mapDiv.clientHeight);
          } else {
            y = screenY.value;
          }
          screenY_adjusted.value = y >= 0 ? y : 0;
          // Adjust horizontal position.
          let x: number;
          if (mapDiv.clientWidth < screenX.value) {
            x = mapDiv.clientWidth - w - 10;
          } else if (mapDiv.clientWidth < screenX.value + w) {
            // Show it on the left side of the feature...
            x = screenX.value - w;
          } else {
            x = screenX.value;
          }
          screenX_adjusted.value = x >= 0 ? x : 0;
        }
        console.log(
          "Popup top: " +
            screenY_adjusted.value +
            ", left: " +
            screenX_adjusted.value
        );
      }
    };
    const show = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    // Variables used to store the original position while map view is being dragged.
    let orgScreenX = 0;
    let orgScreenY = 0;
    // MapView drag event handler
    const onMapViewDrag = (event: {
      button: number;
      action: string;
      x: number;
      y: number;
      origin: { x: number; y: number };
    }) => {
      if (event.button === 0) {
        console.log("MapView drag");
        // Update popup position...
        if (visible.value) {
          if (event.action === "start") {
            orgScreenX = screenX.value;
            orgScreenY = screenY.value;
          }
          const diffX = event.x - event.origin.x;
          const diffY = event.y - event.origin.y;
          screenX.value = orgScreenX + diffX;
          screenY.value = orgScreenY + diffY;
          if (event.action === "end") {
            orgScreenX = 0;
            orgScreenY = 0;
          }
          adjustPositionSize();
        }
      }
    };

    return {
      screenX,
      screenY,
      screenX_adjusted,
      screenY_adjusted,
      maxHeight,
      visible,
      adjustPositionSize,
      show,
      close,
      onMapViewDrag,
    };
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

.popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  border-style: none;
  background-color: transparent;
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
