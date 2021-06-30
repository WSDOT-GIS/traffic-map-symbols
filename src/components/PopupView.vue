<template>
  <div
    ref="containerRef"
    class="popup-container"
    v-if="visible"
    :style="{
      marginTop: screenY_adjusted + 'px',
      marginLeft: screenX_adjusted + 'px',
      maxHeight: maxHeight + 'px',
    }"
  >
    <div class="popup-header">
      <slot name="header"></slot>
      <button class="popup-close-button" @click="close">x</button>
    </div>
    <div class="popup-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onUpdated, ref, watch } from "vue";

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
  },
  setup(props) {
    const containerRef = ref<HTMLDivElement>();
    const maxHeight = ref(1000);
    const mapX = ref(0);
    const mapY = ref(0);
    const screenX = ref(0);
    const screenY = ref(0);
    const screenX_adjusted = ref(0);
    const screenY_adjusted = ref(0);
    const visible = ref(false);
    const show = () => {
      console.log("show()");
      visible.value = true;
    };

    const close = () => {
      console.log("close()");
      visible.value = false;
    };

    onUpdated(() => {
      console.log("Popup root: " + containerRef.value);
      // Adjust popup position when the props change...
      watch(
        () => [props.MapX, props.MapY],
        () => {
          console.log("watch");
          setMapXY();
        }
      );
      // Pointer drag event handler...
      mapView.on("drag", (event) => {
        onMapViewDrag(event);
      });
      // MapView resize event...
      mapView.on("resize", () => {
        if (visible.value && mapX.value < 0 && mapY.value > 0) {
          setScreenXY();
        }
      });
      // Watch scale change...
      mapView.watch("scale", () => {
        if (visible.value && mapX.value < 0 && mapY.value > 0) {
          setScreenXY();
        }
      });
      // Make sure the popup is displayed in the map view area by adjusting position and height...
      const setMapXY = () => {
        console.log("setMapXY " + props.MapX + " " + props.MapY);
        mapX.value = props.MapX;
        mapY.value = props.MapY;
        setScreenXY();
      };
      // Convert map coordinates to screen coordinates and calculate the popup position...
      const setScreenXY = () => {
        if (mapX.value < 0 && mapY.value > 0) {
          const screenXY = toScreenXY(mapX.value, mapY.value);
          console.log("setScreenXY " + screenXY.x + " " + screenXY.y);
          screenX.value = screenXY.x;
          screenY.value = screenXY.y;
          adjustPositionSize();
        }
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
      // Make sure the popup is displyed within the map view...

      // Initial run...
      setMapXY();
    });
    //
    const adjustPositionSize = () => {
      console.log("adjustPositionSize()");
      console.log("containerRef: " + containerRef.value);
      if (!containerRef.value) {
        return;
      }
      console.log("continue");
      const h = containerRef.value.offsetHeight;
      const w = containerRef.value.offsetWidth;
      console.log("h:" + h + ", w:" + w);
      // Adjust vertical position to make sure it fits in the map view.
      maxHeight.value = mapView.height;
      console.log("maxHeight:" + maxHeight.value);
      let y: number;
      console.log(
        "maxHeight.value < screenY.value + h: " +
          maxHeight.value +
          " < " +
          screenY.value +
          " + " +
          h
      );
      if (maxHeight.value < screenY.value + h) {
        const h2 = h > mapView.height ? mapView.height : h;
        console.log("h2: " + h2);
        y = mapView.height - h2; // props.PositionY - ((h2 + props.PositionY) - mapDiv.clientHeight);
      } else {
        y = screenY.value;
      }
      console.log("y: " + y);
      screenY_adjusted.value = y >= 0 ? y : 0;
      console.log("screenY_adjusted:" + screenY_adjusted.value);
      // Adjust horizontal position.
      let x: number;
      if (mapView.width < screenX.value) {
        x = mapView.width - w - 10;
      } else if (mapView.width < screenX.value + w) {
        // Show it on the left side of the feature...
        x = screenX.value - w;
      } else {
        x = screenX.value;
      }
      screenX_adjusted.value = x >= 0 ? x : 0;

      console.log(
        "Popup top: " +
          screenY_adjusted.value +
          ", left: " +
          screenX_adjusted.value +
          ", maxHeight: " +
          maxHeight.value
      );
    };
    return {
      containerRef,
      screenX,
      screenY,
      screenX_adjusted,
      screenY_adjusted,
      maxHeight,
      visible,
      show,
      close,
      adjustPositionSize
    };
  },
});
</script>

<style scoped>
.popup-container {
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
