<template>
  <div
    ref="containerRef"
    class="popup-container w3-card w3-col"
    :class="{
      'popup-container-above': relativePosition === 'above',
      'popup-container-below': relativePosition === 'below',
    }"
    v-if="Features.length > 0 && Features[0]"
    :style="{
      marginTop: popupTop + 'px',
      marginLeft: popupLeft + 'px',
    }"
  >
    <!-- container without the pointer -->
    <div :style="{ maxHeight: maxHeight + 'px' }" class="popup-inner-container">
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
        <div v-if="badgeText.length > 0" class="popup-badge">
          {{ badgeText }}
        </div>
      </div>
      <button
        class="popup-close-button w3-button w3-padding-small"
        @click="close"
      >
        &times;
      </button>
      <h4 class="popup-title w3-container">
        {{ getTitle() }}
      </h4>
      <div v-if="propWeatherForecast">
        <table>
          <tr id="weatherPeriodText">
            <td
              v-for="eachFeature in propWeatherForecast.forecasts"
              :key="eachFeature.forecastNumber"
            >
              {{ eachFeature.periodText }}
            </td>
          </tr>
          <tr id="weatherForecastIcons">
            <td
              class="weatherForecastIcon"
              v-for="eachFeature in propWeatherForecast.forecasts"
              :key="eachFeature.forecastNumber"
            >
              <img
                :src="
                  'https://images.wsdot.wa.gov/traffic/weaicons/' +
                  eachFeature.weatherIconFileName
                "
              />
            </td>
          </tr>
          <tr id="weatherForecastDescription">
            <td
              v-for="eachFeature in propWeatherForecast.forecasts"
              :key="eachFeature.forecastNumber"
            >
              {{ eachFeature.weatherDescription }}
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <label>Forecast created </label>
            </td>
            <td>
              {{ propWeatherForecast.forecastDateTime }}
            </td>
          </tr>
        </table>
        <a
          target="_blank"
          :href="
            'https://www.wsdot.com/traffic/forecast/Default.aspx?zone=' +
            propWeatherForecast.nwsZoneId.replace(/\s/g, '')
          "
          >View Extended Forecast</a
        >
      </div>
      <div v-if="propAmenities">
        <slot name="amenitiesPanel"></slot>
      </div>
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
              @error="$event.target.src = require('@/assets/no-image.png')"
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
import { useStore } from "@/store";
import {
  mapView,
  toScreenXY,
  panMap,
  highlightFeature,
  removeHighlight,
} from "@/esri-stuff/esriMap";
import FeatureInfo from "@/types/FeatureInfo";
import PopupConfig from "@/types/PopupConfig";
import PopupRow from "./PopupRow.vue";
import XY from "@/types/XY";
import ForecastListInfo from "@/types/ForecastListInfo";
import { isSmallMedia } from "@/utils/mediaUtil";

export default defineComponent({
  components: { Carousel, Slide, Pagination, Navigation, PopupRow },
  props: {
    // MapX & Y are only required to supersede the feature x/y.
    MapXY: {
      type: Object as PropType<XY>,
      required: false,
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
    WeatherForecast: {
      type: Object as PropType<ForecastListInfo>,
      required: false,
    },
    Amenities: {
      type: String,
      required: false,
    },
  },
  setup(props, context) {
    // console.log(props)
    // The DOM only exists while the visibility is true. Get it in onUpdate().
    const propWeatherForecast = toRefs(props).WeatherForecast; //bind forecast to ref for v-if conditional rendering
    const propAmenities = toRefs(props).Amenities; //bind amenities to ref for v-if conditional rendering
    const containerRef = ref<HTMLDivElement>();
    const relativePosition = ref("above");
    const store = useStore();
    const mapSize = computed(() => store.state.mapSize);
    const mapScale = computed(() => store.state.scale);
    const mapCenter = computed(() => store.state.center);
    const maxHeight = ref(mapSize.value.height);
    watch(mapSize, (size) => {
      maxHeight.value = size.height;
      if (mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    const mapX = ref(0);
    const mapY = ref(0);
    const screenX = ref(-1);
    const screenY = ref(-1);
    // Popup location.
    const popupLeft = ref(-1000);
    const popupTop = ref(-1000);
    //
    let numImgLoaded = 0;
    let wasUpdatedOnce = false;
    let doPanMap = true;
    let isPanning = false;
    // Index of the currently shown feature.
    const currentIdx = ref(0);
    const badgeText = ref("");
    // Reset variables when the features change...
    const propFeatures = toRefs(props).Features;
    watch(propFeatures, () => {
      currentIdx.value = 0;
      setBadgeText();
      highlightMap();
      mapX.value = 0;
      mapY.value = 0;
      setMapXY();
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
    const pagenationStyle = computed(() => {
      return {
        "--carousel-color-primary": props.DarkThemeColor,
        "--carousel-color-secondary": props.LightThemeColor,
      };
    });

    const close = () => {
      // Let the parent handle the close event.
      // Parent should empty the feature array to close the popup.
      context.emit("close");
    };
    // Adjust popup position when the props change...
    watch([mapX, mapY], () => {
      setScreenXY();
    });
    watch(currentIdx, () => {
      context.emit("idxUpdate", currentIdx.value);
      setBadgeText();
      highlightMap();
      setMapXY();
    });
    // Watch scale change...
    // On touch screen, after pinch zoom, panning map also changes the scale, so commented this out so popup does not close when that happens.
    watch(mapScale, () => {
      // While map is being panned to show the popup, map sometimes zoom out as well resulting in scale change, so do not close popup.
      // Only close if user intentionally change scales.
      if (!isPanning) {
        close();
      } else {
        setScreenXY();
      }
    });
    // Watch map moving...
    watch(mapCenter, (newValue, oldValue) => {
      if (props.Features.length === 0 || !oldValue) {
        return;
      }
      // const newCenter = mapView.toScreen(newValue);
      // const oldCenter = mapView.toScreen(oldValue);
      const newCenter = toScreenXY(newValue.x, newValue.y);
      const oldCenter = toScreenXY(oldValue.x, oldValue.y);
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
        // Nothing to show...
        return;
      }
      if (isSmallMedia()) {
        // Small screen mode...
        setPosition(0, 0);
      } else {
        // Large screen mode...
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
        // console.log("*** Adjust ****************"); // + JSON.stringify(props.Features)); //props.Features[0].layerId);
        // If this is not the initial load, then move popup along with map.
        if (!doPanMap) {
          // New vertical position...
          const newTop = calcTop(h);
          // New horizontal position.
          const newLeft = screenX.value - w / 2;
          setPosition(newTop, newLeft);
        } else {
          doPanMap = false;
          nextTick(() => {
            // New vertical position...
            if (screenY.value > mapSize.value.height / 2) {
              // Display above the feature...
              relativePosition.value = "above";
            } else {
              // Display below the feature...
              relativePosition.value = "below";
            }
            const newTop = calcTop(h);
            // New horizontal position.
            let newLeft = screenX.value - w / 2;
            /**
             * Pan map so the popup is displayed within the map view.
             * Only do this on the initial popup load.
             *  */
            let shiftY = 0;
            let shiftX = 0;
            if (newTop < 0) {
              // Top is above the top of the map, so need to pan map down.
              shiftY = -1 * newTop;
            } else if (newTop + h > mapSize.value.height) {
              // Bottom is below the bottom of the map, so need to pan map up.

              shiftY = mapSize.value.height - newTop - h;
              console.log(
                "***New Top:" +
                  newTop +
                  ", h:" +
                  h +
                  ", map height:" +
                  mapSize.value.height
              );
            }
            if (newLeft < 0 || newLeft + w > mapView.width) {
              shiftX = newLeft < 0 ? -1 * newLeft : mapView.width - newLeft - w;
            }
            setPosition(newTop, newLeft);
            if (shiftY <= -1 || shiftY >= 1 || shiftX <= -1 || shiftX >= 1) {
              isPanning = true;
              panMap(shiftX, shiftY).then((panResult) => {
                console.log("pan result: " + JSON.stringify(panResult));
                isPanning = false;
                setScreenXY();
                // On the mobile devices after the pinch zoom, the map does not pan enough to show the top of the popup.
                // So check the popup position again and pan map more if necessary.
                shiftX = 0;
                shiftY = 0;
                if (popupTop.value < 0) {
                  shiftY = -1 * popupTop.value;
                }
                if (
                  popupLeft.value < 0 ||
                  popupLeft.value + w > mapView.width
                ) {
                  shiftX =
                    popupLeft.value < 0
                      ? -1 * popupLeft.value
                      : mapView.width - popupLeft.value - w;
                }
                if (shiftX !== 0 || shiftY !== 0) {
                  isPanning = true;
                  panMap(shiftX, shiftY).then((panResult) => {
                    console.log("pan2 result: " + panResult);
                    isPanning = false;
                    setScreenXY();
                  });
                }
              });
            }
          });
        }
      }
    };
    /** Figure out the top position of the popup. */
    const calcTop = (height: number): number => {
      let newTop = 0;
      switch (relativePosition.value) {
        case "below":
          // Display below the feature...
          newTop = screenY.value + 5;
          if (!props.MapXY) {
            newTop += 15;
          }
          break;
        default:
          // Display above the feature by default...
          newTop = screenY.value - height - 30;
          if (!props.MapXY) {
            newTop -= 15;
          }
      }
      return newTop;
    };
    /** Figure out if everything is loaded or not. */
    const isLoadComplete = () => {
      let isComplete: boolean;
      if (props.Config.imageFieldName) {
        isComplete = numImgLoaded >= props.Features.length;
      } else {
        isComplete = wasUpdatedOnce;
      }
      return isComplete;
    };
    /** This sets the margin top and left of the popup container. */
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
    const setBadgeText = () => {
      if (
        !props.Features ||
        props.Features.length === 0 ||
        !props.Features[currentIdx.value] ||
        !props.Config.badgeText
      ) {
        // "Nothing to show...
        badgeText.value = "";
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
      badgeText.value = text;
    };
    /** Highlight the feature on the map. */
    const highlightMap = () => {
      const feature = props.Features[currentIdx.value];
      if (feature) {
        if (!props.MapXY) {
          highlightFeature(feature);
        }
      } else {
        removeHighlight();
      }
    };
    /** If MapX and Y are provided, those values supersede the feature x/y.
     * Otherwise the feature x/y is used to determine the location of the popup.
     */
    const setMapXY = (ignoreMapXY?: boolean) => {
      if (!ignoreMapXY) {
        ignoreMapXY = false;
      }
      const feature = props.Features[currentIdx.value];
      if (feature) {
        if (ignoreMapXY) {
          // console.log("set mapXY...");
          mapX.value = feature.mapPoint.x;
          mapY.value = feature.mapPoint.y;
        } else {
          mapX.value = props.MapXY ? props.MapXY.x : feature.mapPoint.x;
          mapY.value = props.MapXY ? props.MapXY.y : feature.mapPoint.y;
        }
      }
    };

    return {
      containerRef,
      relativePosition,
      popupLeft,
      popupTop,
      maxHeight,
      currentIdx,
      close,
      adjustPositionSize,
      pagenationStyle,
      onImgLoad,
      getBannerText,
      badgeText,
      getTitle,
      propWeatherForecast,
      propAmenities,
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
.popup-container {
  width: 400px;
}
@media screen and (max-width: 600px), screen and (max-height: 600px) {
  .popup-container {
    width: 100%;
    height: 100%;
  }
}
/* Common properties for the arrow. */
.popup-container::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  margin-left: -1.41em;

  left: 50%;
  box-sizing: border-box;

  border: 1em solid black;

  transform-origin: 0 0;
  transform: rotate(-45deg);
}
/* For showing the arrow below the popup (popup is above the feature). */
.popup-container-above::after {
  bottom: -2em;
  /* Color only half */
  border-color: transparent transparent #fff #fff;
  box-shadow: -3px 3px 3px 0 rgba(0, 0, 0, 0.2);
}
/* For showing arrow at the top of the popup (popup is below the feature) */
.popup-container-below::after {
  top: 0.1em;
  border-color: #fff #fff transparent transparent;
  box-shadow: 3px -3px 3px 0 rgba(0, 0, 0, 0.2);
}

.popup-inner-container {
  overflow-y: auto;
}

.popup-header {
  position: relative;
  margin: 8px 0;
  padding-right: 10px;
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
  margin: 3px 1em 0 1em;
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
  vertical-align: top;
}

/* Picture stylings ******/
.popup-img {
  width: 100%;
  height: auto;
}
.carousel-item-container {
  width: 100%;
}
/* Hide the 1/3 of circle behind right & left arrow. */
.carousel {
  overflow: hidden;
}
</style>
<style>
.popup-inner-container {
  color: #000;
}
/* Right and left arrows to scroll the pictures. */
/* .carousel__prev,
.carousel__next {
  background-color: transparent !important;
}*/
.carousel__prev {
  left: 16px;
  top: 40%;
}
.carousel__next {
  right: 16px;
  top: 40%;
}
.carousel__prev:hover {
  filter: drop-shadow(2px 2px 3px rgb(0 0 0 / 0.5));
  left: 17px;
  top: 39%;
}
.carousel__next:hover {
  filter: drop-shadow(-2px 2px 3px rgb(0 0 0 / 0.5));
  right: 17px;
  top: 39%;
}
.carousel__prev svg path {
  d: path(
    "M 16.500785,17.692215 10.752113,11.931001 16.500785,6.169785 14.731001,4.4 7.2,11.931001 14.731001,19.462 Z"
  );
}
.carousel__next svg path {
  d: path(
    "M 7.8,6.1697845 13.548671,11.930999 7.8,17.692215 9.569783,19.462 17.100784,11.930999 9.569783,4.3999995 Z"
  );
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
#weatherForecastIcons #weatherForecastDescription {
  font-size: 5pt;
}
.weatherForecastIcon {
  font-size: 10pt;
}
</style>
