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
    <div class="popup-header w3-left-align">
      <div
        class="popup-banner"
        :style="{
          backgroundColor: LightThemeColor,
          borderColor: DarkThemeColor,
        }"
      >
        {{ BannerText }}
      </div>
      <button
        class="popup-close-button w3-button w3-padding-small"
        @click="close"
      >
        x
      </button>
    </div>
    <h4 class="popup-title w3-container">
      {{ Features[currentIdx].attributes[TitleFieldName] }}
    </h4>
    <Carousel
      v-if="PictureFieldName"
      :items-to-show="1"
      :wrapAround="true"
      @update:modelValue="currentIdx = $event"
      :style="pagenationStyle"
    >
      <Slide v-for="eachFeature in Features" :key="eachFeature.id">
        <div class="carousel-item-container">
          <img
            class="popup-img"
            :src="
              PictureFieldName ? eachFeature.attributes[PictureFieldName] : ''
            "
            :alt="eachFeature.id"
            @load="adjustPositionSize"
          />
        </div>
      </Slide>
      <template #addons="{ slidesCount }">
        <navigation v-if="slidesCount > 1" />
        <pagination v-if="slidesCount > 1" />
      </template>
    </Carousel>
    <div class="popup-content w3-container">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onUpdated,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import { mapView, toScreenXY } from "@/esri-stuff/esriMap";
import HighlightSymbol from "@/symbols/HighlightSymbol";
import FeatureInfo from "@/types/FeatureInfo";

export default defineComponent({
  components: { Carousel, Slide, Pagination, Navigation },
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
    DarkThemeColor: {
      type: String,
      required: true,
    },
    LightThemeColor: {
      type: String,
      required: true,
    },
    BannerText: {
      type: String,
      required: true,
    },
    Features: {
      type: Array as PropType<Array<FeatureInfo>>,
      required: true,
    },
    TitleFieldName: {
      type: String,
      required: true,
    },
    PictureFieldName: {
      type: String,
      required: false,
    },
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
    // Index of the currently shown feature.
    const currentIdx = ref(0);
    // Reset the index to 0 when the features change...
    const propFeatures = toRefs(props).Features;
    watch(propFeatures, () => {
      currentIdx.value = 0;
    });
    // Feature highlight.
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
    const pagenationStyle = computed(() => {
      return {
        "--carousel-color-primary": props.DarkThemeColor,
        "--carousel-color-secondary": props.LightThemeColor,
      };
    });

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
    watch(currentIdx, () => {
      context.emit("idxUpdate", currentIdx);
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
      // console.log("***********onUpdated");
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
        // console.log(mapX.value);
        // console.log(mapY.value);
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
    // Position popup on top of the feature...
    const adjustPositionSize = () => {
      if (!containerRef.value) {
        // console.log("Container is null");
        return;
      }
      const h = containerRef.value.offsetHeight;
      const w = containerRef.value.offsetWidth;
      // Adjust vertical position...
      const newScreenY = screenY.value - h - 30;
      if (screenY_adjusted.value !== newScreenY) {
        screenY_adjusted.value = newScreenY;
        console.log("Set screenY_adjusted = " + newScreenY);
      }
      // Adjust horizontal position.
      const newScreenX = screenX.value - w / 2 - 15;
      if (screenX_adjusted.value !== newScreenX) {
        screenX_adjusted.value = newScreenX;
        console.log("Set screenX_adjusted = " + newScreenX);
      }
    };
    // Make sure popup fits inside of Map View...
    // const adjustPositionSize1 = () => {
    //   if (!containerRef.value) {
    //     // console.log("Container is null");
    //     return;
    //   }
    //   const h = containerRef.value.offsetHeight;
    //   const w = containerRef.value.offsetWidth;
    //   // Adjust vertical position to make sure it fits in the map view.
    //   if (maxHeight.value !== mapView.height) {
    //     // console.log("Set maxHeight = " + mapView.height);
    //     maxHeight.value = mapView.height;
    //   }
    //   let y: number;
    //   if (maxHeight.value < screenY.value + h) {
    //     const h2 = h > mapView.height ? mapView.height : h;
    //     y = mapView.height - h2;
    //   } else {
    //     y = screenY.value;
    //   }
    //   const newScreenY = y >= 0 ? y : -1;
    //   if (screenY_adjusted.value !== newScreenY) {
    //     // console.log("Set screenY_adjusted = " + newScreenY);
    //     screenY_adjusted.value = newScreenY;
    //   }
    //   // Adjust horizontal position.
    //   let x: number;
    //   if (mapView.width < screenX.value) {
    //     x = mapView.width - w - 10;
    //   } else if (mapView.width < screenX.value + w) {
    //     // Show it on the left side of the feature...
    //     x = screenX.value - w - 15; // Offset 15 pixels to the left so the selected feature can be seen clearly
    //   } else {
    //     x = screenX.value + 15; // Offset 15 pixels to the right so the selected feature can be seen clearly
    //   }
    //   const newScreenX = x >= 0 ? x : -1;
    //   if (screenX_adjusted.value !== newScreenX) {
    //     // console.log("Set screenX_adjusted = " + newScreenX);
    //     screenX_adjusted.value = newScreenX;
    //   }
    //   // console.log(
    //   //   "****Popup top: " +
    //   //     screenY_adjusted.value +
    //   //     ", left: " +
    //   //     screenX_adjusted.value +
    //   //     ", maxHeight: " +
    //   //     maxHeight.value
    //   // );
    // };
    return {
      containerRef,
      screenX_adjusted,
      screenY_adjusted,
      maxHeight,
      visible,
      currentIdx,
      sizeClass,
      close,
      adjustPositionSize,
      pagenationStyle,
    };
  },
});
</script>

<style scoped>
.popup-container {
  z-index: 1;
  background-color: #fff;
  /* overflow-y: auto; */
  position: relative;
}

.popup-container::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  margin-left: -0.5em;
  bottom: -2em;
  left: 50%;
  box-sizing: border-box;

  border: 1em solid black;
  border-color: transparent transparent #fff #fff;

  transform-origin: 0 0;
  transform: rotate(-45deg);

  box-shadow: -3px 3px 3px 0 rgba(0, 0, 0, 0.2);
}

.popup-header {
  position: relative;
  margin: 8px 0;
  width: 100%;
}
.popup-banner {
  left: 0;
  display: inline-block;
  width: auto;
  padding: 5px 10px;
  color: #000;
  text-align: left;
  border-style: solid;
  border-width: 2px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.popup-title {
  margin: 5px 0;
  text-align: left;
}
.popup-content {
  text-align: left;
  margin-bottom: 8px;
}
.popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  border-style: none;
  background-color: transparent;
}

/* Picture stylings ******/

.popup-img {
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
  top: 30%;
}
.carousel__next {
  right: 5%;
  top: 30%;
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
  padding-left: 0;
}
</style>
