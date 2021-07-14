<template>
  <div
    ref="containerRef"
    class="popup-container w3-card w3-col"
    :class="sizeClass"
    v-if="visible"
    :style="{
      marginTop: screenY_adjusted + 'px',
      marginLeft: screenX_adjusted + 'px',
      maxHeight: maxHeight + 'px',
    }"
  >
    <div class="popup-header">
      <div class="popup-title">
        <slot name="title"></slot>
      </div>
      <button class="popup-close-button" @click="close">x</button>
    </div>
    <div class="popup-subtitle">
      <slot name="subtitle"></slot>
    </div>
    <div class="popup-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onUpdated, ref, toRefs, watch } from "vue";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import { mapView, toScreenXY } from "@/esri-stuff/esriMap";
import HighlightSymbol from "@/symbols/HighlightSymbol";

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
    Width: {
      // "m (medium) or w (wide)"
      type: String,
      required: false,
    },
    // LayerIndex: {
    //   type: Number,
    //   requred: true
    // }
  },
  setup(props, context) {
    // The DOM only exists while the visibility is true. Get it in onUpdate().
    const containerRef = ref<HTMLDivElement>();
    const maxHeight = ref(1000);
    // Using toRefs to preserve the reactivity.
    // If you do "ref(props.MapX)" the value at the time the setup was run is set without reactivity.
    const mapX = toRefs(props).MapX;
    const mapY = toRefs(props).MapY;
    const screenX = ref(-1);
    const screenY = ref(-1);
    // Screen coordinates adjusted to make sure the popup is shown within the map view.
    const screenX_adjusted = ref(-1000);
    const screenY_adjusted = ref(-1000);
    const visible = ref(false);
    let gHighlight: Graphic;
    // Set the width...
    // Default...
    const sizeClass = {
      m4: true,
      m6: false,
      l2: true,
      l3: false,
    };
    if (props.Width) {
      // Wide...
      if (props.Width === "w") {
        sizeClass.m4 = false;
        sizeClass.m6 = true;
        sizeClass.l2 = false;
        sizeClass.l3 = true;
      }
    }

    const close = () => {
      // Let the parent handle the close event.
      // Parent should set the MapX/Y to 0 otherwise the popup will be shown again.
      context.emit("close");
    };
    // If the feature is within the map view, show the popup, otherwise close it.
    // NOTE: Popup will be shown again if the feature comes back in the map view unless parent component sets the MapX and Y to 0.
    watch([screenX, screenY], () => {
      setVisibility();
    });
    // Adjust popup position when the props change...
    watch([mapX, mapY], () => {
      setScreenXY();
    });
    // Pointer drag event handler...
    mapView.on("drag", (event) => {
      onMapViewDrag(event);
    });
    // MapView resize event...
    mapView.on("resize", () => {
      if (mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    // Watch scale change...
    mapView.watch("scale", () => {
      if (mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    // Adjust position after the container DIV is available...
    onUpdated(() => {
      console.log("onUpdated************");
      adjustPositionSize();
    });

    const setVisibility = () => {
      if (
        screenX.value < 0 ||
        screenX.value > mapView.width ||
        screenY.value < 0 ||
        screenY.value > mapView.height
      ) {
        visible.value = false;
        screenX_adjusted.value = -1000;
        screenY_adjusted.value = -1000;
        removeHighlight();
      } else {
        visible.value = true;
        addHighlight();
      }
    };
    // Convert map coordinates to screen coordinates and calculate the popup position...
    const setScreenXY = () => {
      if (mapX.value < 0 && mapY.value > 0) {
        console.log(mapX.value)
        console.log(mapY.value)
        const screenXY = toScreenXY(mapX.value, mapY.value);
        screenX.value = screenXY.x;
        screenY.value = screenXY.y;
        adjustPositionSize();
        setVisibility();
      } else {
        screenX.value = -1;
        screenY.value = -1;
      }
    };
    // Add feature highlight...
    const addHighlight = () => {
      // Make sure there is only one...
      removeHighlight();
      // Create a new graphic...
      const pt = new Point({
        x: props.MapX,
        y: props.MapY,
        spatialReference: SpatialReference.WebMercator,
      });
      gHighlight = new Graphic({
        geometry: pt,
        symbol: HighlightSymbol,
        attributes: {
          type: "popup-highlight",
        },
      });
      mapView.graphics.add(gHighlight);
    };
    // Remove the feature highlight graphic...
    const removeHighlight = () => {
      if (gHighlight) {
        mapView.graphics.remove(gHighlight);
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
        // Update popup position...
        if (mapX.value < 0 && mapY.value > 0) {
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
    // Make sure popup fits inside of Map View...
    const adjustPositionSize = () => {
      if (!containerRef.value) {
        console.log("Container is null");
        return;
      }
      const h = containerRef.value.offsetHeight;
      const w = containerRef.value.offsetWidth;
      console.log("h:" + h + ", w:" + w);
      // Adjust vertical position to make sure it fits in the map view.
      maxHeight.value = mapView.height;
      let y: number;
      if (maxHeight.value < screenY.value + h) {
        const h2 = h > mapView.height ? mapView.height : h;
        y = mapView.height - h2;
      } else {
        y = screenY.value;
      }
      screenY_adjusted.value = y >= 0 ? y : -1;
      // Adjust horizontal position.
      let x: number;
      if (mapView.width < screenX.value) {
        x = mapView.width - w - 10;
      } else if (mapView.width < screenX.value + w) {
        // Show it on the left side of the feature...
        x = screenX.value - w - 15; // Offset 15 pixels to the left so the selected feature can be seen clearly
      } else {
        x = screenX.value + 15; // Offset 15 pixels to the right so the selected feature can be seen clearly
      }
      screenX_adjusted.value = x >= 0 ? x : -1;

      console.log(
        "****Popup top: " +
          screenY_adjusted.value +
          ", left: " +
          screenX_adjusted.value +
          ", maxHeight: " +
          maxHeight.value
      );
    };
    return {
      containerRef,
      screenX_adjusted,
      screenY_adjusted,
      maxHeight,
      visible,
      sizeClass,
      close,
      adjustPositionSize,
    };
  },
});
</script>

<style scoped>
.popup-container {
  /* position: absolute;
  margin-top: 0;
  margin-left: 0; */
  z-index: 9;
  background-color: #fff;
  /* border: 1px solid #808080;
  padding: 0; */
  /* width: 200px; */
  overflow-y: auto;
}
.popup-header {
  position: relative;
  margin: 5px 0;
  height: auto;
  width: 100%;
}
.popup-title {
  left: 0;
  width: 50%;
  padding: 3px 0 3px 3px;
  color: #fff;
  background-color: #33957f;
}
.popup-content {
  padding: 0 10px 10px 10px;
}
.popup-subtitle{
  font-size: 15px;
  font-weight: bold;
}
.popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  border-style: none;
  background-color: transparent;
}
</style>
