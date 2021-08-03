<template>
  <PopupBase
    :MapX="mapX"
    :MapY="mapY"
    LightThemeColor="#fff3cd"
    DarkThemeColor="#FFC107"
    BannerText="Road Restriction"
    :Features="[feature]"
    TitleFieldName="location_description"
    :ContentConfig="[
      { label: 'Travel delay', value: { text: '???' } },
      { label: '', value: { fieldName: 'restriction_comment' } },
      {
        label: 'Date effective',
        value: {
          fieldName: 'date_effective',
          isDate: true,
        },
      },
      {
        label: 'Last updated',
        value: {
          fieldName: 'RecordUpdateDate',
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

import FeatureLayer from "@/layers/PointRestrictionsLayer";
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

