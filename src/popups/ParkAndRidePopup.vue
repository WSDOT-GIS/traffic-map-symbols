<template>
  <PopupBase
    :MapX="mapX"
    :MapY="mapY"
    LightThemeColor="#eaf7cc"
    DarkThemeColor="#97D700"
    BannerText="Park and Ride"
    :Features="[feature]"
    TitleFieldName="Lot_Name"
    :ContentConfig="[
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
        },
      },
    ]"
    @close="close"
  >
    <template v-slot:icon >
      <div v-html="layerIcons.find((x) => x.title == feature.layerTitle)?.paths" width="24"
        height="24">
      </div >
    </template>
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
    const layerIcons = layerListIcons;
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
        setVal();
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

    return {
      mapX,
      mapY,
      feature,
      layerIcons,
      close,
    };
  },
});
</script>

