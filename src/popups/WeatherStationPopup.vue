<template>
  <PopupBase
    :MapX="mapX"
    :MapY="mapY"
    LightThemeColor="#ccdcdc"
    DarkThemeColor="#005151"
    BannerText="Weather Station"
    :Features="[feature]"
    TitleFieldName="WeatherStationDescription"
    :ContentConfig="[
      {
        label: 'Location',
        value: {
          custom: getCoord,
        },
      },
      { label: 'Surface temp', value: { custom: getSurfTemp } },
      { label: 'Air temp', value: { custom: getAirTemp } },
      {
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
      },
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
    ]"
    @close="close"
  >
    <template v-slot:icon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
          fill="#005151"
        />
        <path
          d="M22.4167 11.8311C22.4167 17.4978 17.7563 22.0976 12 22.0976C6.24369 22.0976 1.58334 17.4978 1.58334 11.8311C1.58334 6.16437 6.24369 1.56458 12 1.56458C17.7563 1.56458 22.4167 6.16437 22.4167 11.8311Z"
          fill="#005151"
          stroke="white"
          stroke-width="0.5"
        />
        <rect
          x="7.87878"
          y="6.15463"
          width="0.533333"
          height="12.8469"
          rx="0.266667"
          fill="white"
        />
        <rect
          x="10.7879"
          y="6.15463"
          width="0.32864"
          height="4.66667"
          rx="0.16432"
          transform="rotate(90 10.7879 6.15463)"
          fill="white"
        />
        <path
          d="M6.76666 8.48317C6.76666 8.23449 6.99116 8.04608 7.23607 8.08923L19.5694 10.2625C19.7606 10.2961 19.9 10.4623 19.9 10.6564V13.0057C19.9 13.1998 19.7606 13.3659 19.5694 13.3996L7.23607 15.5729C6.99116 15.616 6.76666 15.4276 6.76666 15.1789V8.48317Z"
          fill="#005151"
          stroke="white"
          stroke-width="0.2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.0136 9.24927L11.5649 8.76651V14.7774L14.0136 14.2947V9.24927ZM16.4626 13.8119L18.4247 13.425C18.5653 13.3973 18.6667 13.274 18.6667 13.1307V10.4132C18.6667 10.2699 18.5653 10.1466 18.4247 10.1189L16.4626 9.73209V13.8119ZM7.02468 7.8714L9.11597 8.28369V15.2431L9.11625 15.2602L7.02468 15.6726C6.83927 15.7091 6.66666 15.5672 6.66666 15.3782V8.16573C6.66666 7.97675 6.83928 7.83484 7.02468 7.8714Z"
          fill="white"
        />
        <path
          d="M11.8473 6.21701C11.9147 6.25536 11.9147 6.35247 11.8473 6.39082L10.5586 7.12441C10.4919 7.16236 10.4091 7.11421 10.4091 7.03751L10.4091 5.57032C10.4091 5.49361 10.4919 5.44547 10.5586 5.48341L11.8473 6.21701Z"
          fill="white"
        />
      </svg>
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

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
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
    const feature = ref<FeatureInfo>();
    const mapX = ref(0);
    const mapY = ref(0);

    watch(props, () => {
      if (props.Featureset.layerTitle === FeatureLayer.title) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer).then(
          (result) => {
            if (result) {
              feature.value = result;
              mapX.value = props.MapX;
              mapY.value = props.MapY;
            }
          }
        );
      };
      if (mapX.value !== 0 || mapY.value !== 0 || feature.value) {
        // Clean up the previous data...
        close();
        nextTick(() => {
          setVal();
        });
      } else {
        setVal();
      }
    };
    // Setting XY to 0 closes the popup...
    const close = () => {
      mapX.value = 0;
      mapY.value = 0;
      feature.value = undefined;
    };

    const naText = "N/A";

    const getCoord = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const lat = feature.attributes["Latitude"] as number;
        const lon = feature.attributes["Longitude"] as number;
        text = `${lon.toFixed(2)}, ${lat.toFixed(2)}`;
      }
      return text;
    };

    const getElev = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const ft = Number(feature.attributes["ElevationFeet"]);
        const meter = Number(feature.attributes["ElevationMeters"]);
        text = combineNums(ft, meter, "ft", "m");
      }
      return text;
    };

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

    const getHighLowTemp = (feature: FeatureInfo) => {
      let text = naText;
      if (feature) {
        const high = Number(feature.attributes["MaxTemperature"]);
        const low = Number(feature.attributes["MinTemperature"]);
        text = combineNums(high, low, "°F", "°F");
      }
      return text;
    };

    const getPressure = (feature: FeatureInfo) => {
      return formatNum(feature, "BarometricPressure", "in");
    };
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
      mapX,
      mapY,
      feature,
      close,
      getCoord,
      getElev,
      getSurfTemp,
      getAirTemp,
      getHighLowTemp,
      getPressure,
      getHumidity,
      getDewPoint,
      getVisibility,
      getWindSpeed,
    };
  },
});
</script>

