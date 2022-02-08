<script lang="ts">
import { computed, defineComponent, nextTick, onUpdated, PropType, ref, toRefs, watch } from "vue";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { useStore } from "@/store";
import {
  mapView,
  toScreenXY,
  panMap,
  checkPannedExtent,
  highlightFeature,
  removeHighlight,
} from "@/esri-stuff/esriMap";
import FeatureInfo from "@/types/FeatureInfo";
import PopupConfig from "@/types/PopupConfig";
import PopupRow from "./PopupRow.vue";
import XY from "@/types/XY";
import ForecastListInfo from "@/types/ForecastListInfo";
import MoreInfoURLInfo from "@/types/MoreInfoURLInfo";
import { getEsriExtent } from "@/utils/extentUtil";
import { hasParentClass, hasParent } from "@/utils/miscUtil";

export default defineComponent({
  components: { PopupRow, Splide, SplideSlide },
  props: {
    // MapX & Y are only required to supersede the feature x/y.
    MapXY: {
      type: Object as PropType<XY>,
      required: false,
    },
    // Width: {
    //   // "m (medium) or w (wide)"
    //   type: String,
    //   required: false,
    // },
    DarkThemeColor: {
      type: String,
      required: true,
    },
    LightThemeColor: {
      type: String,
      required: true,
    },
    DarkBadgeColor: {
      type: String,
      required: false,
    },
    LightBadgeColor: {
      type: String,
      required: false,
    },
    IconSvg: {
      type: String,
      required: false,
    },
    Features: {
      type: Array as PropType<Array<FeatureInfo>>,
      required: true,
    },
    TravelDelay: {
      type: Number,
      required: false,
    },
    Config: {
      type: Object as PropType<PopupConfig>,
      required: true,
    },
    WeatherForecast: {
      type: Object as PropType<ForecastListInfo>,
      required: false,
    },
    weatherForecastLoaded: {
      type: String,
      required: false
    }
  },
  setup(props, context) {
    // The DOM only exists while the visibility is true. Get it in onUpdate().
    //#region weather forecast loading setup
    const propWeatherForecast = ref<ForecastListInfo>()
    propWeatherForecast.value = undefined
    const weatherForecastsLoaded = computed(() => { return props.weatherForecastLoaded })
    //#endregion

    //#region image loading setup
    const cameraImageLoading = ref<boolean>();
    if (props.Config.imageFieldName) {//if the layer is the cameras layer
      cameraImageLoading.value = true
    }
    //#endregion

    const modalContainerRef = ref<HTMLDivElement>();
    const containerRef = ref<HTMLDivElement>();
    const contentContainerRef = ref<HTMLDivElement>();
    const enum relativePositions {
      above = "above",
      below = "below",
      right = "right",
      left = "left",
    }
    const relativePosition = ref(relativePositions.above);
    const store = useStore();
    const mapSize = computed(() => store.state.mapSize);
    const mapScale = computed(() => store.state.scale);
    const mapCenter = computed(() => store.state.center);
    const smallMedia = computed(() => store.state.mediaSize === "s");
    const maxHeight = ref(mapSize.value.height);
    const minTop = 60; // Space needed at the top so the icon and arrow is visible.
    watch(mapSize, (size) => {
      maxHeight.value = size.height - minTop - 30 /* height of header */;
      if (!smallMedia.value) {
        /* On desktop, subtract more so it leaves a bit more of space under or above the icon. 
           Otherwise long popups (Ferry) pushes icon too much to the edge. */
        maxHeight.value -= 80;
      }
      if (mapX.value < 0 && mapY.value > 0) {
        setScreenXY();
      }
    });
    const mapX = ref(0);
    const mapY = ref(0);
    const screenX = ref(-1);
    const screenY = ref(-1);
    // Popup location.
    const popupTopLeft = ref({ marginTop: "-1000px", marginLeft: "-1000px" });
    //
    let numImgLoaded = 0;
    let wasUpdatedOnce = false;
    let doPanMap = true;
    let isPanning = false;
    // Used to keep track of pages...
    const currentPage = ref(1);
    let pagePositions: {
      page: number;
      position: "above" | "inside" | "below";
      prev: "above" | "inside" | "below" | "";
    }[] = [];
    let pageObserver: IntersectionObserver | undefined;
    // Index of the currently shown feature.
    const currentIdx = ref(0);
    const badgeText = ref("");
    const badgeLightColor = ref("#fffaec"); //default light yellow badge background
    const badgeDarkColor = ref("#ffc107"); //default dark yellow badge border
    const badgeTextColor = ref("black");
    // Reset variables when the features change...
    const propFeatures = toRefs(props).Features;
    const propTravelDelay = toRefs(props).TravelDelay;
    watch(propFeatures, () => {
      setWeatherForecast();
      currentIdx.value = 0;
      setBadgeText();
      setBadgeColors();
      highlightMap();
      mapX.value = 0;
      mapY.value = 0;
      setMapXY();
      prevScreenX = -1000;
      prevScreenY = -1000;
      prevHeight = 0;
      prevWidth = 0;
      if (smallMedia.value && propFeatures.value.length > 0) {
        setPosition();
      } else {
        setPosition(-1000, -1000);
      }
      numImgLoaded = 0;
      wasUpdatedOnce = false;
      doPanMap = true;
      isPanning = false;
      if (props.Config.imageFieldName) {
        cameraImageLoading.value = true
      }
    });
    // Picture carousel CSS variables.
    const splideStyles = computed(() => {
      return {
        "--dark-theme-color": props.DarkThemeColor,
        "--light-theme-color": props.LightThemeColor,
        "--splide-arrow-visibility": props.Features.length > 1 ? "visible" : "hidden",
        "--splide-page-display": props.Features.length > 1 ? "block" : "none"
      }
    })

    const onClickAway = (event: PointerEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (!hasParentClass(target, "alert-content") && !hasParent(target, "alert-container-open")) {
        if (smallMedia.value) {
          close();
        } else {
          /* On Desktop
             - If user clicks on something other than the map (e.g. TOC, header, ...), then close the popup.
             - If user clicks on map, then do not do anything here. */
          if (event.type === "click" && !hasParentClass(target, "esri-view-surface") && target.id !== "map-container") {
            close();
          } else if (event.type === "touchstart") {
            // Touch event is handled here...
            if (
              !target.classList.contains("esri-view-surface") &&
              target.nodeName !== "CANVAS" &&
              !target.parentElement?.classList.contains("esri-view-surface")
            ) {
              close();
            }
          }
        }
      }
    };

    const close = () => {
      // Let the parent handle the close event.
      // Parent should empty the feature array to close the popup.
      context.emit("close");
      if (pageObserver) {
        pageObserver.disconnect();
        pageObserver = undefined;
      }
    };
    // Adjust popup position when the props change...
    watch([mapX, mapY], () => {
      setScreenXY();
    });
    watch(currentIdx, () => {
      propWeatherForecast.value = undefined//clear previous forecasts from last opened popup
      setWeatherForecast();
      context.emit("idxUpdate", currentIdx.value);
      setBadgeText();
      setBadgeColors();
      highlightMap();
      setMapXY();
    });
    //
    mapView.watch("stationary", (newValue) => {
      if (!newValue) {
        return;
      }
      setScreenXY();
    });
    // Store the previous scale so it can detect if the center is moving due to zooming or panning.
    let prevScale = 0;
    // Watch map moving...
    watch(mapCenter, (newValue, oldValue) => {
      if (!props.Features || props.Features.length === 0 || !props.Features[0] || !oldValue) {
        return;
      }
      // Only do this if it is panning (not zooming).
      if (prevScale == mapScale.value) {
        if (oldValue.x !== 0 && oldValue.y !== 0) {
          const newCenter = toScreenXY(newValue.x, newValue.y);
          const oldCenter = toScreenXY(oldValue.x, oldValue.y);
          const diffX = oldCenter.x - newCenter.x;
          const diffY = oldCenter.y - newCenter.y;
          screenX.value += diffX;
          screenY.value += diffY;
        } else {
          // The very first time, the oldValue's x and y are 0. So cannot calculate the difference from the previous.
          const mapPt = props.Features[currentIdx.value].mapPoint;
          const screenXY = toScreenXY(mapPt.x, mapPt.y);
          screenX.value = screenXY.x;
          screenY.value = screenXY.y;
        }
        adjustPositionSize();
      }
      prevScale = mapScale.value;
    });
    // Image load happens later and change the size of the popup, so need to make adjustment after that...
    const onImgLoad = () => {
      numImgLoaded = numImgLoaded + 1;
      cameraImageLoadComplete()
      adjustPositionSize();
    };
    // Adjust position after the container DIV is available...
    onUpdated(() => {
      if (!containerRef.value || !contentContainerRef.value) {
        return;
      }
      if (modalContainerRef.value) {
        /* On the large screen, the modal container does not allow user to click on the map
           even though the w3-modal class is disabled. So need to move the popup out of the container. */
        if (!smallMedia.value) {
          if (modalContainerRef.value.contains(containerRef.value)) {
            document.getElementById("map-container")?.appendChild(containerRef.value);
          }
        }
      }
      /* if the vertical paging is enabled, setup the observer to watch page scrolling so we know
         which page is currently visible... */
      if (props.Config.paging && props.Config.paging.direction === "vertical" && !wasUpdatedOnce) {
        if (pageObserver) {
          pageObserver.disconnect();
          pageObserver = undefined;
        }
        currentPage.value = 1;
        pagePositions = [];
        // TODO: IE is not supported.
        pageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((each) => {
              const elem = each.target as HTMLElement;
              /* NOTE: The element need to have the data property with name, data-page-num, 
                     and page number is assigned to it. */
              const pageNum = Number(elem.dataset.pageNum);
              let pos: "above" | "inside" | "below";
              if (each.isIntersecting) {
                pos = "inside";
              } else if (each.rootBounds && each.boundingClientRect.top > each.rootBounds.bottom) {
                pos = "below";
              } else {
                pos = "above";
              }
              const found = pagePositions.find((x) => {
                return x.page === pageNum;
              });
              if (found) {
                found.prev = found.position;
                found.position = pos;
                if (found.prev === "below") {
                  // Made visible while scrolling down
                  currentPage.value = found.page;
                } else if (found.prev === "inside" && found.position === "below") {
                  // Made hidden while scrolling up
                  currentPage.value = found.page - 1;
                }
              } else {
                pagePositions.push({ page: pageNum, position: pos, prev: "" });
                if (pos === "inside" && pageNum > currentPage.value) {
                  currentPage.value = pageNum;
                }
              }
            });
          },
          { threshold: [0], root: contentContainerRef.value }
        );
        // Register the elements that are used to track the current page
        // The element used should have the class, popup-paging-entry, assigned to it.
        const pages = contentContainerRef.value.querySelectorAll(".popup-page-break");
        pages.forEach((each) => {
          pageObserver?.observe(each);
        });
      }
      wasUpdatedOnce = true;
      adjustPositionSize();
    });
    //Assigns the weather forecast to the weather forecast ref
    const setWeatherForecast = () => {
      if (props.Config.weatherForecast) {
        propWeatherForecast.value = props.Config.weatherForecast;
      }
    };

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
    /**
     * Position popup...
     */
    const adjustPositionSize = () => {
      if (!containerRef.value) {
        // Container is null. It is not visible yet.
        return;
      }
      if (isPanning) return;
      // Wait for everything to load, then adjust.
      /*if (!cameraImageLoadComplete()) {
        // Not everything is loaded yet.
        return;
      }*/
      if (!props.Features || props.Features.length === 0 || !props.Features[0]) {
        // Nothing to show...
        return;
      }
      if (!smallMedia.value) {
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
        // If this is not the initial load, then move popup along with map.
        if (!doPanMap) {
          // Recalculate top and let position...
          const newTopLeft = calcTopLeft(h, w);
          setPosition(newTopLeft.top, newTopLeft.left);
        } else {
          doPanMap = false;
          nextTick(() => {
            // New vertical position...
            if (screenY.value > mapSize.value.height / 2) {
              // Display above the feature...
              relativePosition.value = relativePositions.above;
            } else {
              // Display below the feature...
              relativePosition.value = relativePositions.below;
            }
            let newTopLeft = calcTopLeft(h, w);
            /*
             * Pan map so the popup is displayed within the map view,
             * and the top is visible.
             * NOTE: Only do this on the initial popup load.
             */
            let shiftXY = calcShiftXY(newTopLeft, h, w);
            const outOfBoundDir = checkPannedExtent(shiftXY.x, shiftXY.y);
            if (
              (relativePosition.value === relativePositions.above && outOfBoundDir[0] === "n") ||
              (relativePosition.value === relativePositions.below && outOfBoundDir[0] === "s")
            ) {
              const bestPosition = getBestRelativePosition(h);
              relativePosition.value = bestPosition;
              newTopLeft = calcTopLeft(h, w);
              shiftXY = calcShiftXY(newTopLeft, h, w);
            }

            setPosition(newTopLeft.top, newTopLeft.left);
            if (Math.abs(shiftXY.x) >= 1 || Math.abs(shiftXY.y) >= 1) {
              isPanning = true;
              panMap(shiftXY.x, shiftXY.y).then(() => {
                isPanning = false;
                setScreenXY();
                // Check the popup position again and pan map more if necessary.
                shiftXY = calcShiftXY(
                  {
                    top: parseInt(popupTopLeft.value.marginTop),
                    left: parseInt(popupTopLeft.value.marginLeft),
                  },
                  h,
                  w
                );
                if (shiftXY.x !== 0 || shiftXY.y !== 0) {
                  isPanning = true;
                  panMap(shiftXY.x, shiftXY.y).then(() => {
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
    const getBestRelativePosition = (
      height: number
      // width: number // TODO: maybe in the future...
    ): relativePositions => {
      const extent = getEsriExtent("full");
      const results: { pos: relativePositions; val: number }[] = [];
      // TODO: Maybe in the future, might need to place it on right or left.
      // results.push({
      //   pos: relativePositions.left,
      //   val: (mapX.value - extent.xmin) / width,
      // });
      // results.push({
      //   pos: relativePositions.right,
      //   val: (extent.xmax - mapX.value) / width,
      // });
      results.push({
        pos: relativePositions.above,
        val: (extent.ymax - mapY.value) / height,
      });
      results.push({
        pos: relativePositions.below,
        val: (mapY.value - extent.ymin) / height,
      });
      const maxVal = Math.max.apply(
        null,
        results.map((each) => {
          return each.val;
        })
      );
      const obj = results.find((each) => {
        return each.val === maxVal;
      });
      if (obj) {
        return obj.pos;
      } else {
        throw "getBestRelativePosition() failed.";
      }
    };
    /**
     * Figure out the top and left position of the popup.
     * NOTE: Make sure to set the relativePosition before calling this.
     */
    const calcTopLeft = (height: number, width: number): { top: number; left: number } => {
      let newTop = 0;
      switch (relativePosition.value) {
        case relativePositions.below:
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
      let newLeft = screenX.value - width / 2;
      return { top: newTop, left: newLeft };
    };
    /**
     * Calulate how far map need to be moved so the top of the popup is visible within the map view.
     */
    const calcShiftXY = (
      topLeft: { top: number; left: number },
      height: number,
      width: number
    ): XY => {
      let shiftY = 0;
      let shiftX = 0;
      const top = topLeft.top;
      if (top < 0) {
        // Top is above the top of the map, so need to pan map down.
        shiftY = -1 * top;
      } else if (top + height > mapSize.value.height) {
        // Bottom is below the bottom of the map, so need to pan map up.
        shiftY = mapSize.value.height - top - height;
        if (top + shiftY < minTop) {
          shiftY = minTop - top;
        }
      }
      const left = topLeft.left;
      if (left < 0 || left + width > mapView.width) {
        shiftX = left < 0 ? -1 * left : mapView.width - left - width;
      }
      return { x: shiftX, y: shiftY };
    };
    /**
     * Figure out if everything is loaded or not.
     */
    const cameraImageLoadComplete = (): boolean => {//check if the loading is complete after each image loads
      let isComplete: boolean;
      if (props.Config.imageFieldName) {
        isComplete = numImgLoaded >= props.Features.length;
      } else {
        isComplete = wasUpdatedOnce;
      }
      if (props.Config.imageFieldName) {
        cameraImageLoading.value = !isComplete;
      }
      return isComplete;
    };
    /** This sets the margin top and left of the popup container. */
    const setPosition = (top?: number, left?: number) => {
      // Adjust vertical position...
      if (top) {
        const currentTop = parseInt(popupTopLeft.value.marginTop);
        if (!currentTop || currentTop !== top) {
          popupTopLeft.value.marginTop = top + "px";
        }
      } else {
        popupTopLeft.value.marginTop = "";
      }
      // Adjust horizontal position.
      if (left) {
        const currentLeft = parseInt(popupTopLeft.value.marginLeft);
        if (!currentLeft || currentLeft !== left) {
          popupTopLeft.value.marginLeft = left + "px";
        }
      } else {
        popupTopLeft.value.marginLeft = "";
      }
    };
    const getMoreInfoURL = () => {
      if (
        !props.Features ||
        props.Features.length === 0 ||
        !props.Features[currentIdx.value] ||
        !props.Config.moreInfoURL
      ) {
        // "Nothing to show...
        return;
      }
      let text = "";
      let moreInfoObject;
      if (props.Config.moreInfoURL.text) {
        text = props.Config.moreInfoURL.text;
      } else if (props.Config.moreInfoURL.fieldName) {
        text = props.Features[currentIdx.value].attributes[
          props.Config.moreInfoURL.fieldName
        ] as string;
      } else if (props.Config.moreInfoURL.custom) {
        const func = props.Config.moreInfoURL.custom as (f: FeatureInfo) => MoreInfoURLInfo;
        moreInfoObject = func(props.Features[currentIdx.value]);
      }
      if (!text) {
        text = "";
      }
      if (props.Config.moreInfoURL.custom) {
        return `${moreInfoObject?.text}
        <a href="${moreInfoObject?.url}"  target="_blank">${moreInfoObject?.linkText}</a>`;
        //open popup in new tab
      } else {
        return text;
      }
    };
    const getBannerText = () => {
      if (!props.Features || props.Features.length === 0 || !props.Features[currentIdx.value]) {
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
        const func = props.Config.bannerText.custom as (f: FeatureInfo) => string;
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
        !props.Features[currentIdx.value] ||
        !props.Config.title
      ) {
        // Nothing to show...
        return;
      }
      let text = "";
      if (props.Config.title.text) {
        text = props.Config.title.text;
      } else if (props.Config.title.fieldName) {
        text = props.Features[currentIdx.value].attributes[props.Config.title.fieldName] as string;
      } else if (props.Config.title.custom) {
        const func = props.Config.title.custom as (f: FeatureInfo) => string;
        text = func(props.Features[currentIdx.value]);
      }
      if (!text) {
        text = "";
      }
      return text;
    };
    const setBadgeColors = () => {
      if (props.DarkBadgeColor != undefined) {
        badgeDarkColor.value = props.DarkBadgeColor;
      }
      if (props.LightBadgeColor != undefined) {
        badgeLightColor.value = props.LightBadgeColor;
        if (badgeLightColor.value == "#484e55") {
          badgeTextColor.value = "white";
        } else {
          badgeTextColor.value = "black";
        }
      }
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
        const func = props.Config.badgeText.custom as (f: FeatureInfo) => string;
        text = func(props.Features[currentIdx.value]);
      }
      if (!text) {
        text = "";
      }
      badgeText.value = text;
    };
    const getImgUrl = (feature: FeatureInfo): string => {
      let url = "";
      if (props.Config.imageFieldName) {
        const d = new Date();
        url = feature.attributes[props.Config.imageFieldName] + "?a=" + d.getTime();
      }
      return url;
    };
    /** Highlight the feature on the map. */
    const highlightMap = () => {
      const feature = props.Features[currentIdx.value];
      if (feature) {
        if (!props.MapXY) {
          highlightFeature(feature);
        }
      } else {
        if (!smallMedia.value) {
          removeHighlight();
        }
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
          mapX.value = feature.mapPoint.x;
          mapY.value = feature.mapPoint.y;
        } else {
          mapX.value = props.MapXY ? props.MapXY.x : feature.mapPoint.x;
          mapY.value = props.MapXY ? props.MapXY.y : feature.mapPoint.y;
        }
      }
    };
    /**
     * Catch the carousel spicture changes.
     * @param splide 
     * @param newIndex 
     */
    const onSplideMoved = (splide: unknown, newIndex: number) => {
      currentIdx.value = newIndex;
    }

    return {
      modalContainerRef,
      containerRef,
      contentContainerRef,
      relativePosition,
      popupTopLeft,
      maxHeight,
      currentIdx,
      close,
      adjustPositionSize,
      onImgLoad,
      getBannerText,
      badgeText,
      badgeLightColor,
      badgeDarkColor,
      badgeTextColor,
      getTitle,
      getMoreInfoURL,
      getImgUrl,
      propWeatherForecast,
      propTravelDelay,
      propFeatures,
      smallMedia,
      currentPage,
      onClickAway,
      cameraImageLoading,
      cameraImageLoadComplete,
      weatherForecastsLoaded,
      onSplideMoved,
      splideStyles
    };
  },
});
</script>

<template>
  <div
    ref="modalContainerRef"
    class="popup-modal-container"
    :class="{
      'w3-modal': smallMedia,
      'popup-modal-container-show': smallMedia && propFeatures.length > 0 && propFeatures[0],
      'popup-modal-container-hide': smallMedia && (!propFeatures || propFeatures.length == 0),
    }"
  >
    <div
      ref="containerRef"
      class="popup-container w3-card w3-col"
      :class="{
        'popup-container-above': relativePosition === 'above',
        'popup-container-below': relativePosition === 'below',
        'w3-modal-content': smallMedia,
      }"
      v-if="propFeatures.length > 0 && propFeatures[0]"
      :style="popupTopLeft"
      v-click-away="onClickAway"
    >
      <!-- container without the pointer -->
      <div class="popup-inner-container w3-display-container">
        <div class="popup-header w3-left-align">
          <div
            class="popup-banner"
            :style="{
              backgroundColor: LightThemeColor,
              borderColor: DarkThemeColor,
            }"
          >
            <div class="popup-banner-icon" v-html="IconSvg"></div>
            <span class="popup-banner-text">{{ getBannerText() }}</span>
          </div>
          <div
            v-if="badgeText.length > 0"
            class="popup-badge"
            :style="{
              backgroundColor: badgeLightColor,
              borderColor: badgeDarkColor,
              color: badgeTextColor,
            }"
          >{{ badgeText }}</div>
          <div
            v-if="Config.paging && Config.paging.maxPage > 1"
            class="popup-page-tracker"
          >{{ currentPage }} of {{ Config.paging.maxPage }}</div>
        </div>
        <button class="popup-close-button w3-button w3-display-topright" @click="close">&times;</button>
        <!-- Content (below the header) container -->
        <div
          :style="{ maxHeight: maxHeight + 'px' }"
          class="popup-content-container"
          ref="contentContainerRef"
        >
          <h4
            v-if="Config.title && !Config.title.isHTML"
            class="popup-title w3-container"
          >{{ getTitle() }}</h4>
          <h4
            v-if="Config.title && Config.title.isHTML"
            v-html="getTitle()"
            class="popup-title w3-container"
          ></h4>
          <div v-if="Config.subtitle" class="popup-content w3-container">
            <PopupRow :Config="Config.subtitle" :Feature="Features[currentIdx]" />
          </div>
          <div v-if="weatherForecastsLoaded == 'false'" class="w3-container loadingSpinnerDiv">
            <img class="loadingSpinner" src="@/assets/loadingSpinner.gif" />
            <label>Forecast loading...</label>
            <label>{{ }}</label>
          </div>
          <div v-if="weatherForecastsLoaded == 'true'">
            <div class="popup-content w3-container">
              <label class="popup-row-label">Forecast</label>
            </div>
            <table class="weatherForecastTable">
              <tr id="weatherPeriodText">
                <td
                  v-for="eachFeature in propWeatherForecast.forecasts"
                  :key="eachFeature.forecastNumber"
                >{{ eachFeature.periodText }}</td>
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
                  ref="forecastDivs"
                  v-for="eachFeature in propWeatherForecast.forecasts"
                  :key="eachFeature.forecastNumber"
                >{{ eachFeature.weatherDescription }}</td>
              </tr>
            </table>
          </div>
          <div
            v-show="cameraImageLoading && Config.imageFieldName"
            class="w3-container loadingSpinnerDiv"
            :style="cameraImageLoading ? display = 'block' : display = 'none'"
          >
            <img class="loadingSpinner" src="@/assets/loadingSpinner.gif" />
            <label>Camera images loading...</label>
          </div>
          <div v-show="!cameraImageLoading && Config.imageFieldName">
            <Splide
              :options="{
                type: 'loop', pagination: true,
                classes: {
                  arrow: 'splide__arrow splide-arrow',
                  page: 'splide__pagination__page splide-pagination'
                }
              }"
              @splide:moved="onSplideMoved"
              :style="splideStyles"
            >
              <SplideSlide v-for="(eachFeature, idx) in Features" :key="idx">
                <div class="carousel-item-container">
                  <img
                    class="popup-img"
                    :src="getImgUrl(eachFeature)"
                    :alt="eachFeature.id"
                    @load="onImgLoad()"
                    @error="$event.target.src = require('@/assets/no-image.png')"
                  />
                </div>
              </SplideSlide>
            </Splide>
          </div>
          <div
            class="travelDelayTime"
            v-if="propTravelDelay && propTravelDelay > 0"
          >{{ `${propTravelDelay} minute delay` }}</div>
          <div
            v-for="eachConfig in Config.content"
            :key="eachConfig.label"
            class="popup-content w3-container"
          >
            <PopupRow v-if="Config.content" :Config="eachConfig" :Feature="Features[currentIdx]" />
          </div>
          <div v-if="Config.moreInfoURL">
            <div
              v-if="Config.moreInfoURL.text && Config.moreInfoURL.text !== ''"
              class="popup-content w3-container"
            >{{ getMoreInfoURL() }}</div>
            <div v-if="Config.moreInfoURL.custom" class="popup-content w3-container">
              <div v-html="getMoreInfoURL()"></div>
            </div>
          </div>
        </div>
        <!-- Content (below the header) container -->
      </div>
      <!-- Inner container -->
    </div>
    <!-- Popup container -->
  </div>
  <!-- Modal container -->
</template>

<style scoped>
.popup-modal-container-show {
  display: block;
  padding-top: 15px;
}
.popup-modal-container-hide {
  display: none;
}
.popup-container {
  z-index: 9;
  background-color: #fff;
  position: relative;
}
.popup-container {
  width: 400px;
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
  /* overflow-y: auto; */
  padding: 16px 0;
}
@media screen and (max-width: 600px), screen and (max-height: 400px) {
  .popup-container {
    /* Carousel won't get sized correctly because W3.CSS sets width to auto on small screens. So overriding that.  */
    width: 94vw !important;
    /* Center the modal popup on the screen. */
    margin-right: 3vw;
    margin-left: 3vw;
  }
  /* Hide the arrow */
  .popup-container::after {
    display: none;
  }
  .popup-container-above::after {
    display: none;
  }
  .popup-container-below::after {
    display: none;
  }
  .popup-inner-container {
    padding: 12px 0;
  }
}

.popup-header {
  position: relative;
  padding-right: 10px;
  width: 100%;
}
.popup-banner {
  left: 0;
  display: inline-block;
  width: auto;
  padding: 1px 8px;
  color: #000;
  text-align: left;
  border-style: solid;
  border-width: 1px;
  border-radius: 0 4px 4px 0;
}
.popup-banner-icon {
  float: left;
  display: flex;
  align-items: center;
  height: auto;
  width: 18px;
}
.popup-banner-icon svg {
  height: 100%;
  width: 100%;
}

.popup-banner-text {
  padding: 0 5px;
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-heavy);
}
.popup-badge {
  display: inline-block;
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-heavy);
  padding: 6px 3px 4px 3px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  margin: 0 1em 0 1em;
}
.popup-page-tracker {
  display: inline-block;
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-normal);
  padding: 3px;
  margin: 3px 1em 0 1em;
}
.popup-content-container {
  overflow-y: auto;
}
.popup-title {
  margin: 10px 0;
  text-align: left;
  font-size: var(--type-scale-base6);
  line-height: var(--type-scale-base8);
  font-weight: var(--font-weight-heavy);
}

.popup-close-button {
  border-style: none;
  background-color: transparent;
  font-size: var(--type-scale-base9);
  line-height: var(--type-scale-base11);
  font-weight: var(--font-weight-normal);
  vertical-align: top;
}
.popup-content {
  text-align: left;
  font-size: var(--type-scale-base3);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base5);
}

.popup-content-section {
  margin-bottom: 8px;
}
.loadingSpinnerDiv {
  display: flex;
  flex-direction: column;
}
.loadingSpinner {
  width: 20%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
/* Picture stylings ******/

.popup-img {
  width: 100%;
  height: auto;
}
.carousel-item-container {
  width: 100%;
}
#weatherForecastIcons #weatherForecastDescription {
  font-size: 5pt;
}
.weatherForecastIcon {
  font-size: 10pt;
  width: 25%;
  padding: 2px 0px 2px 0px;
  border: 0px;
}
.amenityBubble {
  display: inline-block;
  font-weight: 700;
  font-size: x-small;
  padding: 1px;
  border-radius: 20px;
  border-width: 3px;
  border-color: #b2b2b2;
  border-style: solid;
  background-color: #b2b2b2;
  margin: 0px 1px 0px 1px;
  padding: 0px 4px 0px 4px;
}
.amenityDiv {
  text-align: left;
  margin: 5px 0 5px 16px;
}
.amenityLabel {
  text-align: left;
}
.weatherForecastTable {
  margin: auto;
  width: 95%;
  margin-bottom: 8px;
  font-size: var(--type-scale-base2);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base4);
}
.travelDelayTime {
  font-size: 20px;
  color: #dc3545;
  text-align: left;
  margin: 0px 0px 5px 16px;
}
</style>


<style>
/* The hidden pixel to indicate the vertical page breaks. */
.popup-page-break {
  width: 1px;
  height: 1px;
  background-color: #ffffff00;
}
.popup-inner-container {
  color: #000;
}
/* Splide customizations */
:root {
  --dark-theme-color: transparent;
  --light-theme-color: transparent;
  --splide-arrow-visibility: hidden;
  --splide-page-display: none;
}
.splide-arrow {
  background: var(--dark-theme-color);
  visibility: var(--splide-arrow-visibility);
}
.splide-pagination {
  background: var(--light-theme-color);
  display: var(--splide-page-display);
}
.splide-pagination.is-active {
  background: var(--dark-theme-color);
}
.splide__arrow svg {
  fill: #fff;
}
.splide__pagination {
  bottom: auto;
  position: relative;
}
</style>
