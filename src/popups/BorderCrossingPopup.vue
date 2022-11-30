<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "../utils/featureInfoUtil";
import type FeaturesetInfo from "../types/FeaturesetInfo";
import type FeatureInfo from "../types/FeatureInfo";
import { layerListIcons } from "../symbols/IconDefinitions";
import MoreInfoURLInfo from "../types/MoreInfoURLInfo";
import { getLayer } from "../esri-stuff/esriMap";
import { useStore } from "../store";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { LayerStatus } from "../types/LayerInfo";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const layerId = "border-crossings-layer";
    const store = useStore();
    const feature = ref<FeatureInfo>();
    const layerIcons = layerListIcons;
    watch(props, () => {
      if (props.Featureset.layerId === layerId) {
        show();
      } else {
        close();
      }
    });
    /*const getMoreInfoURL = (): MoreInfoURLInfo => {
      const moreInfoObject = new Object({
        url: `https://www.th.gov.bc.ca/ATIS/index.htm`,
        text: "Get the",
        linkText: "Southbound wait time",
      }) as MoreInfoURLInfo;
      return moreInfoObject;
    };*/
    const getTitle = (feature: FeatureInfo): string => {
      return `SR ${feature.attributes["StateRouteID"] as string}`;
    };
    const show = () => {
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== LayerStatus.Loaded) { 
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
    return {
      layerId,
      feature,
      close,
      //getMoreInfoURL,
      layerIcons,
      getTitle,
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id == 'border-crossing')?.paths"
    LightThemeColor="#e885b433"
    DarkThemeColor="#e885b4"
    :LayerId="layerId"
    :Features="feature?[feature]:[]"
    :Config="{
      bannerText: { text: 'Border crossing wait times' },
      title: { custom: getTitle },
      content: [
        { label: 'Northbound wait time', value: { fieldName: 'HTMLTable', isHTML: true } },
        {
          label: 'Last updated',
          value: { fieldName: 'BorderReadingTime', isTime: true, isDate: true },
        },
      ],
      /*moreInfoURL: {
        custom: getMoreInfoURL,
      },*/
    }"
    @close="close"
  >
    <template v-slot:icon>
      <div
        class="mapFeaturesIcon"
        v-html="layerIcons.find((x) => x.id == 'border-crossing')?.paths"
      ></div>
    </template>
  </PopupBase>
</template>
<style>
table.waitTimeTable {
  margin: 8px 16px 16px 16px;
}
td.waitTimeTitleCell {
  font-size: small;
  font-weight: bold;
  display: table-cell;
  text-align: left;
  padding: 0px 3px 4px 3px;
}
td.waitTimeCell {
  font-size: small;
  display: table-cell;
  text-align: left;
  padding: 5px 5px 5px 5px;
}
</style>