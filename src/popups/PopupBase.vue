<template>
  <div
    ref="containerRef"
    class="popup-container w3-card w3-col"
    v-if="Features.length > 0 && Features[0]"
    :class="sizeClass"
    :style="{
      marginTop: popupTop + 'px',
      marginLeft: popupLeft + 'px',
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
        <div class="popup-banner-icon">
          <slot name="icon"></slot>
        </div>
        <span class="popup-banner-text"> {{ getBannerText() }}</span>
      </div>
      <div v-if="Config.badgeText" class="popup-badge">
        {{ getBannerText2() }}
      </div>
      <button
        class="popup-close-button w3-button w3-padding-small"
        @click="close"
      >
        &times;
      </button>
    </div>
    <h4 class="popup-title w3-container">
      {{ getTitle() }}
    </h4>
    <Carousel
      v-if="Config.imageFieldName"
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
              Config.imageFieldName
                ? eachFeature.attributes[Config.imageFieldName]
                : ''
            "
            :alt="eachFeature.id"
            @load="onImgLoad()"
          />
        </div>
      </Slide>
      <template #addons="{ slidesCount }">
        <navigation v-if="slidesCount > 1" />
        <pagination v-if="slidesCount > 1" />
      </template>
    </Carousel>
    <div
      v-for="eachConfig in Config.content"
      :key="eachConfig.label"
      class="popup-content w3-container"
    >
      <PopupRow :Config="eachConfig" :Feature="Features[currentIdx]" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onUpdated,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import { mapView, toScreenXY, panMap } from "@/esri-stuff/esriMap";
// import HighlightSymbol from "@/symbols/HighlightSymbol";
import FeatureInfo from "@/types/FeatureInfo";
import PopupConfig from "@/types/PopupConfig";
import PopupRow from "./PopupRow.vue";

export default defineComponent({
  components: { Carousel, Slide, Pagination, Navigation, PopupRow },
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
    Features: {
      type: Array as PropType<Array<FeatureInfo>>,
      required: true,
    },
    Config: {
      type: Object as PropType<PopupConfig>,
      required: true,
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
    // Popup location.
    const popupLeft = ref(-1000);
    const popupTop = ref(-1000);
    //
    let numImgLoaded = 0;
    let wasUpdatedOnce = false;
    let doPanMap = true;
    // Index of the currently shown feature.
    const currentIdx = ref(0);
    // Reset variables when the features change...
    const propFeatures = toRefs(props).Features;
    watch(propFeatures, () => {
      currentIdx.value = 0;
      prevScreenX = -1000;
      prevScreenY = -1000;
      prevHeight = 0;
      prevWidth = 0;
      popupLeft.value = -1000;
      popupTop.value = -1000;
      numImgLoaded = 0;
      wasUpdatedOnce = false;
      doPanMap = true;
    });
    // Feature highlight.
    // let gHighlight: Graphic;
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
    // Adjust popup position when the props change...
    watch([mapX, mapY], () => {
      setScreenXY();
    });
    watch(currentIdx, () => {
      context.emit("idxUpdate", currentIdx.value);
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
    // Watch map moving...
    mapView.watch("center", (newValue, oldValue) => {
      if (props.Features.length === 0 || !oldValue) {
        return;
      }
      const newCenter = mapView.toScreen(newValue);
      const oldCenter = mapView.toScreen(oldValue);
      const diffX = oldCenter.x - newCenter.x;
      const diffY = oldCenter.y - newCenter.y;
      screenX.value += diffX;
      screenY.value += diffY;
      adjustPositionSize();
    });
    // Image load happens later and change the size of the popup, so need to make adjustment after that...
    const onImgLoad = () => {
      numImgLoaded = numImgLoaded + 1;
      adjustPositionSize();
    };
    // Adjust position after the container DIV is available...
    onUpdated(() => {
      wasUpdatedOnce = true;
      adjustPositionSize();
    });
    // Convert map coordinates to screen coordinates and calculate the popup position...
    const setScreenXY = () => {
      if (mapX.value < 0 && mapY.value > 0) {
        const screenXY = toScreenXY(mapX.value, mapY.value);
        screenX.value = screenXY.x;
        screenY.value = screenXY.y;
        adjustPositionSize();
      } else {
        screenX.value = -1;
        screenY.value = -1;
      }
    };
    //
    let prevScreenX = 0;
    let prevScreenY = 0;
    let prevWidth = 0;
    let prevHeight = 0;
    // Position popup on top of the feature...
    const adjustPositionSize = () => {
      if (!containerRef.value) {
        // Container is null. It is not visible yet.
        return;
      }
      // Wait for everything to load, then adjust.
      if (!isLoadComplete()) {
        // Not everything is loaded yet.
        return;
      }
      if (
        !props.Features ||
        props.Features.length === 0 ||
        !props.Features[0]
      ) {
        // "Nothing to show...
        return;
      }
      const h = containerRef.value.offsetHeight;
      const w = containerRef.value.offsetWidth;
      if (
        Math.abs(prevScreenX - screenX.value) <= 1 &&
        Math.abs(prevScreenY - screenY.value) <= 1 &&
        Math.abs(prevWidth - w) <= 1 &&
        Math.abs(prevHeight - h) <= 1
      ) {
        // Sometimes the width changes slightly for some reason, do not respond to those...
        return;
      } else {
        prevScreenX = screenX.value;
        prevScreenY = screenY.value;
        prevWidth = w;
        prevHeight = h;
      }
      //console.log("*** Adjust ***"); // + JSON.stringify(props.Features)); //props.Features[0].layerTitle);
      // New vertical position...
      let newTop = screenY.value - h - 30;
      // New horizontal position.
      let newLeft = screenX.value - w / 2;
      // If this is not the initial load, then move popup along with map.
      if (!doPanMap) {
        setPosition(newTop, newLeft);
      } else {
        doPanMap = false;
        nextTick(() => {
          // New vertical position...
          newTop = screenY.value - h - 30;
          // New horizontal position.
          newLeft = screenX.value - w / 2;
          /**
           * Pan map so the popup is displayed within the map view.
           * Only do this on the initial popup load.
           *  */
          let shiftY = 0;
          let shiftX = 0;
          if (newTop < 0) {
            shiftY = -1 * newTop;
          }
          if (newLeft < 0 || newLeft + w > mapView.width) {
            shiftX = newLeft < 0 ? -1 * newLeft : mapView.width - newLeft - w;
          }
          setPosition(newTop, newLeft);
          if (shiftY <= -1 || shiftY >= 1 || shiftX <= -1 || shiftX >= 1) {
            panMap(shiftX, shiftY);
          }
        });
      }
    };
    const isLoadComplete = () => {
      let isComplete: boolean;
      if (props.Config.imageFieldName) {
        isComplete = numImgLoaded >= props.Features.length;
      } else {
        isComplete = wasUpdatedOnce;
      }
      return isComplete;
    };
    const setPosition = (top: number, left: number) => {
      // Adjust vertical position...
      if (popupTop.value !== top) {
        popupTop.value = top;
      }
      // Adjust horizontal position.
      if (popupLeft.value !== left) {
        popupLeft.value = left;
      }
    };
    const getBannerText = () => {
      if (
        !props.Features ||
        props.Features.length === 0 ||
        !props.Features[currentIdx.value]
      ) {
        // "Nothing to show...
        return;
      }
      let text = "";
      if (props.Config.bannerText.text) {
        text = props.Config.bannerText.text;
      } else if (props.Config.bannerText.fieldName) {
        text = props.Features[currentIdx.value].attributes[
          props.Config.bannerText.fieldName
        ] as string;
      } else if (props.Config.bannerText.custom) {
        const func = props.Config.bannerText.custom as (
          f: FeatureInfo
        ) => string;
        text = func(props.Features[currentIdx.value]);
      }
      if (!text) {
        text = "";
      }
      return text;
    };
    const getTitle = () => {
      if (
        !props.Features ||
        props.Features.length === 0 ||
        !props.Features[currentIdx.value]
      ) {
        // "Nothing to show...
        return;
      }
      let text = "";
      if (props.Config.title.text) {
        text = props.Config.title.text;
      } else if (props.Config.title.fieldName) {
        text = props.Features[currentIdx.value].attributes[
          props.Config.title.fieldName
        ] as string;
      } else if (props.Config.title.custom) {
        const func = props.Config.title.custom as (f: FeatureInfo) => string;
        text = func(props.Features[currentIdx.value]);
      }
      if (!text) {
        text = "";
      }
      return text;
    };
    const getBannerText2 = () => {
      if (
        !props.Features ||
        props.Features.length === 0 ||
        !props.Features[currentIdx.value]
      ) {
        // "Nothing to show...
        return;
      }
      if (!props.Config.badgeText) {
        return;
      }
      let text = "";
      if (props.Config.badgeText.text) {
        text = props.Config.badgeText.text;
      } else if (props.Config.badgeText.fieldName) {
        text = props.Features[currentIdx.value].attributes[
          props.Config.badgeText.fieldName
        ] as string;
      } else if (props.Config.badgeText.custom) {
        const func = props.Config.badgeText.custom as (
          f: FeatureInfo
        ) => string;
        text = func(props.Features[currentIdx.value]);
      }
      if (!text) {
        text = "";
      }
      return text;
    };
    return {
      containerRef,
      popupLeft,
      popupTop,
      maxHeight,
      currentIdx,
      sizeClass,
      close,
      adjustPositionSize,
      pagenationStyle,
      onImgLoad,
      getBannerText,
      getBannerText2,
      getTitle,
    };
  },
});
</script>

<style scoped>
.popup-container {
  z-index: 10;
  background-color: #fff;
  position: relative;
}

.popup-container::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  margin-left: -1.41em;
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
.popup-banner-icon {
  vertical-align: middle;
  display: inline-block;
  height: 24px;
  width: 24px;
}
.popup-banner-text {
  padding: 0 5px;
  vertical-align: middle;
  font-weight: 700;
}
.popup-badge {
  display: inline-block;
  font-weight: 700;
  font-size: small;
  padding: 3px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #ffc107;
  background-color: #fffaec;
  margin-left: 1em;
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
  font-size: 1.5em;
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
  padding-left: 0;
}
</style>
