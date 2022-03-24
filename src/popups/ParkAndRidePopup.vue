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
    const layerId = "park-ride-layer";
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
    // Setting features to undefined closes the popup...
    const close = () => {
      feature.value = undefined;
    };

    return {
      layerId,
      feature,
      layerIcons,
      close,
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'park-ride-layer')?.paths"
    LightThemeColor="#97D70033"
    DarkThemeColor="#97D700"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :Config="{
      bannerText: { text: 'Park & Ride' },
      title: { fieldName: 'Lot_Name' },
      content: [
        {
          label: 'Street location',
          value: { fieldName: 'Street_Location' },
        },
        {
          label: 'Address',
          value: { fieldName: 'Address' },
        },
        {
          label: 'County',
          value: { fieldName: 'CountyName' },
        },
        {
          label: 'Approx. total number of spaces',
          value: { fieldName: 'Approx_Numb_Spaces' },
        },
        { label: 'Transit organization', value: { text: '???' } },
        {
          label: 'Last updated',
          value: {
            fieldName: 'PublishDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  ></PopupBase>
</template>
