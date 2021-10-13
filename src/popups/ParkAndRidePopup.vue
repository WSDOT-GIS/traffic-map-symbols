<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'park-ride-layer')?.paths"
    LightThemeColor="#97D70033"
    DarkThemeColor="#97D700"
    :Features="[feature]"
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
          label: 'Approx. number of spaces',
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
  >
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/ParkRideLayer";
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
        show();
      } else {
        close();
      }
    });

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

    return {
      feature,
      layerIcons,
      close,
    };
  },
});
</script>

