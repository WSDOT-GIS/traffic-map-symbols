<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id == 'mountain-passes-layer')?.paths"
    LightThemeColor="#1C78CD33"
    DarkThemeColor="#1c78cd"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Mountain pass report' },
      title: { fieldName: 'PassName' },
      content: [
        /* {
          label: 'Temperature',
          value: {
            custom: getTemp,
          },
        },*/
        {
          label: 'Elevation',
          value: {
            custom: getElev,
          },
        },
        {
          label: getDirection1Label,
          value: {
            fieldName: 'PublicMessage1',
          },
        },
        {
          label: getDirection2Label,
          value: {
            fieldName: 'PublicMessage2',
          },
        },
        {
          label: 'Conditions',
          value: {
            fieldName: 'RoadCondition',
          },
        },
        {
          label: 'Weather',
          value: {
            fieldName: 'Weather',
          },
        },
        /*{
          label: 'Air Temp',
          value:{
            text: '???'
          },
        },*/
        {
          label: 'Visibility',
          value: {
            text: '???',
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'DisplayDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
      moreInfoURL: {
        custom: getMoreInfoURL,
      },
    }"
    @close="close"
  >
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/MountainPassesLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
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
    watch(props, () => {
      if (props.Featureset.layerId === FeatureLayer().id) {
        show();
      } else {
        close();
      }
    });
    const getMoreInfoURL = (feature: FeatureInfo): MoreInfoURLInfo => {
      let linkText;
      if (feature.attributes["PassName"]?.toString().includes("Pass")) {
        linkText = `${feature.attributes["PassName"]?.toString().split("Pass")[0]} Pass`;
      } else {
        linkText = feature.attributes["PassName"] as string;
      }
      const moreInfoObject = new Object({
        url: `/travel/real-time/mountainpasses/${feature.attributes.WebPageName}`,
        text: "Learn more about ",
        linkText: linkText,
      }) as MoreInfoURLInfo;
      return moreInfoObject;
    };
    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then((result) => {
          if (result) {
            feature.value = result;
          }
        });
      };
      if (feature.value) {
        // Clean up the previous data...
        close();
        setVal();
      } else {
        setVal();
      }
    };
    // Setting features to undefined closes the popup...
    const close = () => {
      feature.value = undefined;
    };

    const getTemp = (feature: FeatureInfo): string | undefined => {
      //const num = feature.attributes["Temperature"] as string;
      const unit = feature.attributes["TemperatureUnit"] as string;
      let num = 100;
      //const unit = "Fahrenheit" as string
      if (num) {
        let numF;
        let numC;
        switch (unit) {
          case "Fahrenheit" as string:
            numF = num;
            numC = Math.ceil((num - 32) * 0.5556);
            break;
          case "Celcius" as string:
            numC = num;
            numF = Math.ceil(num * 1.8 + 32);
            break;
        }
        let text = `${numF}°F / ${numC}°C`;
        return text;
      } else {
        return undefined;
      }
    };

    const getElev = (feature: FeatureInfo): string | undefined => {
      const num = feature.attributes["Elevation"] as number;
      const unit = feature.attributes["ElevationUnit"] as string;
      let ftNum;
      let meterNum;
      if (num) {
        switch (unit) {
          case "Feet":
            ftNum = num;
            meterNum = Math.ceil(num * 0.3048);
            break;
          case "Meters":
            ftNum = Math.ceil(num / 0.3048);
            meterNum = num;
            break;
        }
        let text = `${ftNum}ft / ${meterNum}m`;
        return text;
      } else {
        return undefined;
      }
    };

    const getDirection1Label = (feature: FeatureInfo) => {
      return "Travel " + feature.attributes["TravelDirection1"]?.toString().toLowerCase();
    };

    const getDirection2Label = (feature: FeatureInfo) => {
      return "Travel " + feature.attributes["TravelDirection2"]?.toString().toLowerCase();
    };

    return {
      feature,
      layerIcons,
      close,
      getTemp,
      getElev,
      getDirection1Label,
      getDirection2Label,
      getMoreInfoURL,
    };
  },
});
</script>

