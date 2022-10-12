<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import type FeaturesetInfo from "@/types/FeaturesetInfo";
import type FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getConfig } from "@/utils/appConfigUtil";
import type ForecastListInfo from "@/types/ForecastListInfo";
import type MoreInfoURLInfo from "@/types/MoreInfoURLInfo";
import { getLayer } from "@/esri-stuff/esriMap";
import { useStore } from "@/store";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import Geometry from "@arcgis/core/geometry/Geometry";
import Point from "@arcgis/core/geometry/Point";
export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const layerId = "weather-stations-layer";
    const store = useStore();
    const feature = ref<FeatureInfo>();
    const layerIcons = layerListIcons;
    const forecastList = ref<ForecastListInfo>();
    const subtitleRef = ref<string>("fetching location...")
    const forecastsLoaded = ref<string>("false");
    watch(props, () => {
      if (props.Featureset.layerId === layerId) {
        //if clicked feature belongs to WeatherStations layer
        show();
      } else {
        close();
      }
    });
    const getTitle = (feature: FeatureInfo): string => {
      const name = feature.attributes["WeatherStationDescription"]?.toString();
      return `${name?.split(" on ")[0]}`;
    };
    const show = () => {
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== "loaded") {
        close();
        return;
      }
      const lyr = getLayer(layerId) as FeatureLayer;
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], lyr).then(
          //query feature layer for feature
          async (result) => {
            if (result) {
              forecastsLoaded.value = "false";
              forecastList.value = undefined;
              feature.value = result;
              getWeatherForecast(result);
            }
          }
        );
      };
      if (feature.value) {
        // Clean up the previous data...
        close();
        nextTick(() => {
          setVal();
        });
      } else {
        setVal();
      }
    };
    // Setting features to undefined closes the popup...
    const close = () => {
      forecastList.value = undefined;
      feature.value = undefined;
    };
    const getWeatherForecast = async (featureresult: FeatureInfo) => {
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== "loaded") {
        close();
        return;
      }
      const lyr = getLayer(layerId) as FeatureLayer;
      getFeatureInfoById(props.Featureset.ids[0], lyr).then(
        //query feature layer for feature
        async (response) => {
          if (response) {
            const featureNWSZoneId = response?.attributes?.NWSZoneId?.toString().replace(/\s/g, "");
            const config = getConfig();
            fetch(config.forecastExtendedAPI + featureNWSZoneId + "/").then((result) => {
              if (result.status >= 200 && result.status < 300) {
                result.json().then((response) => {
                  function myComparator(a: any, b: any) {
                    return parseInt(a.forecastNumber, 10) - parseInt(b.forecastNumber, 10);
                  }
                  const sortedForecasts = response.forecastData.sort(myComparator);
                  forecastList.value = {
                    nwsZoneId: response.nwsZoneId,
                    forecastDateTime: response.forecastDateTime,
                    forecastExpirationDateTime: response.forecastExpirationDateTime,
                    nwsZoneRegionName: response.nwsZoneRegionName,
                    forecasts: sortedForecasts,
                  };
                  forecastsLoaded.value = "true";
                });
              } else {
                store.commit("addServiceAlert", "Weather Forecast");
              }
              feature.value = featureresult;
            }).catch(() => store.commit("addServiceAlert", "Weather Forecast"));
          }
        }
      );
    };
    const naText = "N/A";
    const getSubtitle = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const desc = feature.attributes["WeatherStationDescription"]?.toString().split(" on ")[1];
        if (desc) {
          text = "on " + desc;
        }
        else{
          const webMercatorCoords = webMercatorUtils.xyToLngLat(
            feature.mapPoint.x,
            feature.mapPoint.y
          )
          text =`${webMercatorCoords[1].toFixed(6)}, ${webMercatorCoords[0].toFixed(6)}`
        }
      }
      return text;
    };
    const getMoreInfoURL = (feature: FeatureInfo) => {
      const moreInfoObject = new Object({
        url: `/travel/real-time/Weather/${feature.attributes.WeatherStationId}`,
        text: "Learn more about the weather and forecast at ",
        linkText: `${
          feature.attributes["WeatherStationDescription"]?.toString().split(" on ")[0]
        } station`,
      }) as MoreInfoURLInfo;
      return moreInfoObject;
    };
    const getSurfTemp = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const c = Number(feature.attributes["SurfaceTemperature"]);
        if (c && !isNaN(c)) {
          //(6°C × 9/5) + 32
          // BUG 42968 - remove unit since Tom cannote tell what it is.
          const f = Math.round(c * (9 / 5) + 32);
          text = combineNumbers(f, c, "°F", "°C");
          //text = c.toString();
        }
      }
      return text;
    };

    const getAirTemp = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const f = Number(feature.attributes["TemperatureFarhenheit"]); // cspell: disable-line
        const c = Number(feature.attributes["TemperatureCelcius"]); // cspell: disable-line
        text = combineNumbers(f, c, "°F", "°C");
      }
      return text;
    };
    const getVisibility = (feature: FeatureInfo) => {
      return formatNum(feature, "Visibility", "Mile");
    };
    const getWindSpeed = (feature: FeatureInfo) => {
      return formatNum(feature, "WindSpeed", "mph");
    };

    const formatNum = (feature: FeatureInfo, fieldName: string, unit: string) => {
      let text = naText;
      if (feature) {
        const num = Number(feature.attributes[fieldName]);
        text = isNaN(num) ? naText : num + " " + unit;
      }
      return text;
    };

    const combineNumbers = (num1: number, num2: number, unit1: string, unit2: string) => {
      let text = "";
      if (num1 && !isNaN(num1)) {
        text = `${num1}${unit1}`;
      }
      if (num2 && !isNaN(num2)) {
        if (text.length > 0) {
          text += " / ";
        }
        text += `${num2}${unit2}`;
      }
      if (text.length === 0) {
        text = naText;
      }
      return text;
    };
    return {
      layerId,
      feature,
      layerIcons,
      close,
      getSurfTemp,
      getAirTemp,
      getVisibility,
      getWindSpeed,
      getTitle,
      getSubtitle,
      getMoreInfoURL,
      forecastList,
      forecastsLoaded,
    };
  },
});
</script>
<template>
  <!-- <div>{{ forecastsLoaded }}</div> -->
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'weather-stations-layer')?.paths"
    LightThemeColor="#00515133"
    DarkThemeColor="#005151"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :Config="{
      weatherForecast: forecastList,
      bannerText: { text: 'Weather station' },
      title: { custom: getTitle },
      subtitle: {
        label: 'Location',
        value: { custom: getSubtitle },
      },
      moreInfoURL: {
        custom: getMoreInfoURL,
      },
      content: [
        { label: 'Surface temp', value: { custom: getSurfTemp } },
        { label: 'Air temp', value: { custom: getAirTemp } },
        {
          label: 'Visibility',
          value: { custom: getVisibility },
        },
        {
          label: 'Wind speed',
          value: {
            custom: getWindSpeed,
          },
        },
        {
          label: 'Wind dir.',
          value: {
            fieldName: 'CardinalCompassDirection',
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'WeatherReportDateTime',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    :weatherForecastLoaded="forecastsLoaded"
    @close="close"
  ></PopupBase>
</template>
