<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'fire-incidents-layer')?.paths"
    LightThemeColor="#D23D004D"
    DarkThemeColor="#D23D00"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Wildland fire' },
      title: { fieldName: 'IncidentName' },
      content: [
        { label: 'Type', value: { fieldName: 'IncidentTypeCategory' } },
        { label: 'Cause', value: { fieldName: 'FireCause' } },
        { label: 'Daily acres', value: { custom: getDailyAcres } },
        { label: 'Total acres burned', value: { custom: getTotalAcres } },
        { label: 'Percentage contained', value: { custom: getPercentContained } },
        {
          label: 'Discovery Date',
          value: {
            fieldName: 'FireDiscoveryDateTime',
            isDate: true,
            isTime: true,
          },
        },
        {
          label: 'Last Updated',
          value: {
            fieldName: 'ModifiedOnDateTime',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  >
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/FireIncidentLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
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
        //if clicked feature belongs to WeatherStations layer
        show();
      } else {
        close();
      }
    });
    const getPercentContained = (feature: FeatureInfo) => {
      let formattedPercent = "";
      if (feature.attributes["PercentContained"]) {
        formattedPercent = `${feature.attributes["PercentContained"]}%`;
      }
      return formattedPercent;
    };
    const getDailyAcres = (feature: FeatureInfo) => {
      let formattedAcres = "";
      if (feature.attributes["DailyAcres"]) {
        formattedAcres = `${parseFloat(feature.attributes["DailyAcres"] as string).toLocaleString()}`;
      }
      return formattedAcres;
    };
    const getTotalAcres = (feature: FeatureInfo) => {
      let formattedAcres = "";
      if (feature.attributes["CalculatedAcres"]) {
        formattedAcres = `${parseFloat(feature.attributes["CalculatedAcres"] as string).toLocaleString()}`;
      }
      return formattedAcres;
    };
    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(
          //query feature layer for feature
          (result) => {
            if (result) {
              // console.log(result)
              feature.value = result;
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
    return {
      feature,
      layerIcons,
      close,
      getPercentContained,
      getDailyAcres,
      getTotalAcres,
    };
  },
});
</script>

