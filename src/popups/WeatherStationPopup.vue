<template>
  <PopupBase
    LightThemeColor="#ccdcdc"
    DarkThemeColor="#005151"
    :WeatherForecast="forecastList"
    :WeatherLocation="weatherLocation"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Weather Station' },
      title: { custom: getTitle },
      subtitle:
        {
          label:'Location',
          value:{
            custom: getSubtitle
          }
        }
      ,
      moreInfoURL:{
        custom: getMoreInfoURL
      },
      content: [
       /* {
          label: 'Location',
          value: {
            custom: getCoord,
          },
        },
        { label: 'Surface temp', value: { custom: getSurfTemp } },
        { label: 'Air temp', value: { custom: getAirTemp } },*/
       /* {
          label: '24hr high/low',
          value: { custom: getHighLowTemp },
        },
        {
          label: 'Pressure',
          value: { custom: getPressure },
        },
        { label: 'Elevation', value: { custom: getElev } },
        {
          label: 'Humidity',
          value: { custom: getHumidity },
        },
        {
          label: 'Dew point',
          value: { custom: getDewPoint },
        },*/
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
    @close="close"
  >
    <template v-slot:icon>
      <div
        v-html="layerIcons.find((x) => x.id == feature?.layerId)?.paths"
        width="24"
        height="24"
      ></div>
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/WeatherStationsLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getConfig } from "@/utils/appConfigUtil";
import ForecastListInfo from "@/types/ForecastListInfo"
import MoreInfoURLInfo from "@/types/MoreInfoURLInfo";
export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const feature = ref<FeatureInfo>();
    const layerIcons = layerListIcons;
    const forecastList=ref<ForecastListInfo>();
    const weatherLocation=ref<string>();
    watch(props, () => {
      if (props.Featureset.layerId === FeatureLayer().id) {//if clicked feature belongs to WeatherStations layer
        getWeatherForecast();
        show();
      } else {
        close();
      }
    });
    const getTitle = (feature: FeatureInfo): string => {
      const name = feature.attributes["WeatherStationDescription"]?.toString();
      return `${name?.split("on")[0]}`;
    };
    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(//query feature layer for feature
          (result) => {
            if (result) {
              feature.value = result;
              weatherLocation.value = `on ${feature.value.attributes["WeatherStationDescription"]?.toString().split("on")[1]}`
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
      feature.value = undefined;
    };
    const getWeatherForecast = async()=>{
      getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(//query feature layer for feature
        async (response) => {
          if (response) {
            const featureNWSZoneId = response?.attributes?.NWSZoneId?.toString().replace(/\s/g, "")
            const config = await getConfig();
            //fetch(config.forecastSummaryAPI+featureNWSZoneId).then((result)=>{ ~~summary call
            fetch(config.forecastExtendedAPI+featureNWSZoneId).then((result)=>{
              result.json().then((response)=>{
                console.log(response.forecastData)
                forecastList.value={
                  nwsZoneId:response.nwsZoneId,
                  forecastDateTime:response.forecastDateTime,
                  forecastExpirationDateTime:response.forecastExpirationDateTime,
                  nwsZoneRegionName:response.nwsZoneRegionName,
                  forecasts:response.forecastData
                }
              })
            })
          }
        }
      );      
    }
    const naText = "N/A";
    const getSubtitle = (feature: FeatureInfo) => {
      let text = naText;
      if(feature){
        text = `on ${feature.attributes["WeatherStationDescription"]?.toString().split("on")[1]}`
      }
      return text
    }
    const getMoreInfoURL = (feature: FeatureInfo) => {
      const moreInfoObject =new Object({
        url: `https://www.wsdot.com/traffic/forecast/Default.aspx?zone=${feature.attributes.NWSZoneId}`,
        text: "Learn more about the weather and forecast at ",
        linkText: `${feature.attributes["WeatherStationDescription"]?.toString().split("on")[0]}`
      }) as MoreInfoURLInfo
      return moreInfoObject
      
    }
    /*const getCoord = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const lat = feature.attributes["Latitude"] as number;
        const lon = feature.attributes["Longitude"] as number;
        text = `${lon.toFixed(2)}, ${lat.toFixed(2)}`;
      }
      return text;
    };*/

    /*const getElev = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const ft = Number(feature.attributes["ElevationFeet"]);
        const meter = Number(feature.attributes["ElevationMeters"]);
        text = combineNums(ft, meter, "ft", "m");
      }
      return text;
    };*/

    const getSurfTemp = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const f = Number(feature.attributes["SurfaceTemperature"]);
        if (f && !isNaN(f)) {
          const c = Math.round(((f - 32) * 5) / 9);
          text = combineNums(f, c, "°F", "°C");
        }
      }
      return text;
    };

    const getAirTemp = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const f = Number(feature.attributes["TemperatureFarhenheit"]);
        const c = Number(feature.attributes["TemperatureCelcius"]);
        text = combineNums(f, c, "°F", "°C");
      }
      return text;
    };

    /*const getHighLowTemp = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const high = Number(feature.attributes["MaxTemperature"]);
        const low = Number(feature.attributes["MinTemperature"]);
        text = combineNums(high, low, "°F", "°F");
      }
      return text;
    };*/

    /*const getPressure = (feature: FeatureInfo) => {
      return formatNum(feature, "BarometricPressure", "in");
    };*/
    const getHumidity = (feature: FeatureInfo) => {
      return formatNum(feature, "RelativeHumidity", "%");
    };
    const getDewPoint = (feature: FeatureInfo) => {
      return formatNum(feature, "DewPoint", "°F");
    };
    const getVisibility = (feature: FeatureInfo) => {
      return formatNum(feature, "Visibility", "Mile");
    };
    const getWindSpeed = (feature: FeatureInfo) => {
      return formatNum(feature, "WindSpeed", "mph");
    };

    const formatNum = (
      feature: FeatureInfo,
      fieldName: string,
      unit: string
    ) => {
      let text = naText;
      if (feature) {
        const num = Number(feature.attributes[fieldName]);
        text = isNaN(num) ? naText : num + " " + unit;
      }
      return text;
    };

    const combineNums = (
      num1: number,
      num2: number,
      unit1: string,
      unit2: string
    ) => {
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
      feature,
      layerIcons,
      close,
      //getCoord,
      //getElev,
      getSurfTemp,
      getAirTemp,
      //getHighLowTemp,
      //getPressure,
      getHumidity,
      getDewPoint,
      getVisibility,
      getWindSpeed,
      getTitle,
      getSubtitle,
      getMoreInfoURL,
      weatherLocation,
      forecastList
    };
  },
});
</script>

