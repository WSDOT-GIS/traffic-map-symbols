<template>
  <PopupBase
    :MapX="mapX"
    :MapY="mapY"
    LightThemeColor="#d8e8eb"
    DarkThemeColor="#63a4ad"
    BannerText="Rest Area"
    :Features="[feature]"
    TitleFieldName="PassName"
    :ContentConfig="[
      {
        label: 'Title',
        value: {
          fieldName: 'title',
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
import FeatureLayer from "@/layers/RestAreasLayer";
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

