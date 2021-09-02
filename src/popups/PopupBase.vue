<template>
  <div
    ref="containerRef"
    class="popup-container w3-card w3-col"
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
  },
  setup(props, context) {
    // The DOM only exists while the visibility is true. Get it in onUpdate().
    const propWeatherForecast = toRefs(props).WeatherForecast;
    watch(propWeatherForecast, () => {
      console.log(propWeatherForecast.value);
    });
    const containerRef = ref<HTMLDivElement>();
    const store = useStore();
    const mapSize = computed(() => store.state.mapSize);
    const maxHeight = ref(mapSize.value.height);
    watch(mapSize, (size) => {
      maxHeight.value = size.height;
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
    // MapView resize event...
    mapView.on("resize", () => {
      if (mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    // Watch scale change...
    // On touch screen, after pinch zoom, panning map also changes the scale, so commented this out so popup does not close when that happens.
    mapView.watch("scale", () => {
      //console.log("scale changed: " + oldValue + " => " + newValue);
      // While map is being panned to show the popup, map sometimes zoom out as well resulting in scale change, so do not close popup.
      // Only close if user intentionally change scales.
      if (!isPanning) {
        close();
      } else {
        console.log("Debug....");
        // setMapXY(true);
        // console.log("MapXY: " + mapX.value + ", " + mapY.value);
        // adjustPositionSize();
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
        // Nothing to show...
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
      // console.log("*** Adjust ****************"); // + JSON.stringify(props.Features)); //props.Features[0].layerId);
      // If this is not the initial load, then move popup along with map.
      if (!doPanMap) {
        // New vertical position...
        let newTop = screenY.value - h - 30;
        // Raise the popup a bit so it is not covering the icon completely.
        if (!props.MapXY) {
          newTop -= 15;
        }
        // New horizontal position.
        const newLeft = screenX.value - w / 2;
        setPosition(newTop, newLeft);
      } else {
        doPanMap = false;
        nextTick(() => {
          // New vertical position...
          let newTop = screenY.value - h - 30;
          if (!props.MapXY) {
            newTop -= 15;
          }
          // New horizontal position.
          const newLeft = screenX.value - w / 2;
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
            isPanning = true;
            panMap(shiftX, shiftY).then(() => {
              isPanning = false;
              setScreenXY();
              // On the mobile devices after the pinch zoom, the map does not pan enough to show the top of the popup.
              // So check the popup position again and pan map more if necessary.
              //console.log(popupTop.value + ", " + popupLeft.value);
              shiftX = 0;
              shiftY = 0;
              if (popupTop.value < 0) {
                shiftY = -1 * popupTop.value;
              }
              if (popupLeft.value < 0 || popupLeft.value + w > mapView.width) {
                shiftX =
                  popupLeft.value < 0
                    ? -1 * popupLeft.value
                    : mapView.width - popupLeft.value - w;
              }
              if (shiftX !== 0 || shiftY !== 0) {
                //console.log("Pan again!....." + shiftX + ", " + shiftY);
                isPanning = true;
                panMap(shiftX, shiftY).then(() => {
                  isPanning = false;
                  setScreenXY();
                });
              }
            });
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
          console.log("set mapXY...");
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
  width: 100%;
}
@media screen and (min-width: 576px) and (min-height: 576px) {
  .popup-container {
    width: 400px;
  }
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
  left: 7px;
  top: 40%;
}
.carousel__next {
  right: 7px;
  top: 40%;
}
.carousel__prev:hover {
  filter: drop-shadow(2px 2px 3px rgb(0 0 0 / 0.5));
  right: 6px;
  top: 39%;
}
.carousel__next:hover {
  filter: drop-shadow(-2px 2px 3px rgb(0 0 0 / 0.5));
  right: 6px;
  top: 39%;
}
.carousel__prev svg path {
  d: path(
    "M 17.000785,17.692215 11.252113,11.931001 17.000785,6.169785 15.231001,4.4 7.7,11.931001 15.231001,19.462 Z"
  );
}
.carousel__next svg path {
  d: path(
    "M 6.8,6.1697845 12.548671,11.930999 6.8,17.692215 8.569783,19.462 16.100784,11.930999 8.569783,4.3999995 Z"
  );
}
/* svg.carousel__icon {
  width: 2em;
  height: 2em;
  filter: drop-shadow(3px 3px 2px rgb(0 0 0 / 1));
}  */
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
