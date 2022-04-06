<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getLayer } from "@/esri-stuff/esriMap";
import { useStore } from "@/store";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const layerId = "travel-times-layer";
    const store = useStore();
    const layerIcons = layerListIcons;
    const feature = ref<FeatureInfo>();
    const TravelDelay = ref<number>(0);

    watch(props, () => {
      if (props.Featureset.layerId === layerId) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== "loaded") {
        close();
        return;
      }
      const lyr = getLayer(layerId) as FeatureLayer;
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], lyr).then((result) => {
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
    // Setting XY to 0 closes the popup...
    const close = () => {
      feature.value = undefined;
    };
    const getDelayStatus = (): string => {
      let delayStatus: string;
      TravelDelay.value > 0 ? (delayStatus = "Delayed") : (delayStatus = "");
      return delayStatus;
    };
    const getTime = (feature: FeatureInfo): string => {
      const title = feature.attributes["Title"];
      return `${title}`;
    };
    const getHOVTime = (feature: FeatureInfo): string => {
      let HOVTime;
      var now = new Date;
      var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
      var difference = utc_timestamp - ((feature.attributes.TimeUpdated as number) + 1000 * 7 * 60 * 60);
      if ((difference / 1000 / 60) > 60) {
        HOVTime = "Not Available"
        TravelDelay.value = 0
      }
      else {
        HOVTime = feature.attributes.HOVCurrentTime
      }
      return HOVTime as string;
    };
    const getCurrentTime = (feature: FeatureInfo): string => {
      let currentTime;
      var now = new Date;
      var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
      var difference = utc_timestamp - ((feature.attributes.TimeUpdated as number) + 1000 * 7 * 60 * 60);//converts feature time from PST to GMT
      if ((difference / 1000 / 60) > 60) {
        currentTime = "Not Available"
        TravelDelay.value = 0
      }
      else {
        currentTime = feature.attributes.CurrentTime as number
        ((feature.attributes.CurrentTime as number) - (feature.attributes.AverageTime as number)) > 0 ? TravelDelay.value = ((feature.attributes.CurrentTime as number) - (feature.attributes.AverageTime as number)) : TravelDelay.value = 0
      }
      return currentTime as string;
    };
    const getTitle = (feature: FeatureInfo): string => {
      const title = feature.attributes["Title"];
      return `${title}`;
    };
    return {
      layerId,
      layerIcons,
      feature,
      close,
      getTitle,
      getTime,
      getDelayStatus,
      TravelDelay,
      getHOVTime,
      getCurrentTime,
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id == 'travel-times-layer')?.paths"
    LightThemeColor="#96359f33"
    DarkThemeColor="#96359f"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :TravelDelay="TravelDelay"
    :Config="{
      bannerText: { text: 'Travel time' },
      badgeText: { custom: getDelayStatus },
      title: { custom: getTitle },
      content: [
        {
          label: 'Average Time (Min.)',
          value: { fieldName: 'AverageTime' },
        },
        {
          label: 'Current Time (Min.)',
          value: { custom: getCurrentTime },
        },
        {
          label: 'HOV Lane Time (Min.)',
          value: { custom: getHOVTime },
        },
        {
          label: 'Last Updated',
          value: {
            fieldName: 'TimeUpdated',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  ></PopupBase>
</template>