<template>
  <PopupBase
    :MapX="mapX"
    :MapY="mapY"
    Width="w"
    LightThemeColor="#cce5df"
    DarkThemeColor="#007b5f"
    :Features="features"
    :Config="{
      bannerText: {
        text:
          'Camera' + (features.length > 1 ? ' (' + features.length + ')' : ''),
      },
      title: { fieldName: 'CameraTitle' },
      imageFieldName: 'ImageURL',
      content: [
        { label: 'Camera Direction', value: { custom: getDirection } },
        { label: 'Refresh Rate', value: { text: '???' } },
      ],
    }"
    @close="close"
  >
    <template v-slot:icon >
      <div v-html="layerIcons.find((x) => x.title == features[0].layerTitle)?.paths" width="24"
        height="24">
      </div >
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import "vue3-carousel/dist/carousel.css";

import PopupBase from "./PopupBase.vue";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import { getFeatureInfosByIds } from "@/utils/featureInfoUtil";
import FeatureLayer from "@/layers/CameraLayer";
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
    const features = ref<FeatureInfo[]>([]);
    const mapX = ref(0);
    const mapY = ref(0);
    const layerIcons = layerListIcons;
    const getDirection = (feature: FeatureInfo) => {
      let dir = "";
      if (features.value.length > 0) {
        let val = feature.attributes["CompassDirection"] as string;
        if (val) {
          dir = val === "B" ? "N/A" : val;
        }
      }
      return dir;
    };

    watch(props, () => {
      if (props.Featureset.layerTitle === FeatureLayer.title) {
        console.log("Camera Layer Popup!");
        show();
      } else {
        close();
      }
    });
    const show = () => {
      const setVal = () => {
        getFeatureInfosByIds(props.Featureset.ids, FeatureLayer).then(
          (results) => {
            features.value = results;
            mapX.value = props.MapX;
            mapY.value = props.MapY;
          }
        );
      };
      if (mapX.value !== 0 || mapY.value !== 0 || features.value.length > 0) {
        // Clean up the previous data...
        close();
        // Wait for the next update. Without doing this, scrolling won't work correctly.
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
      features.value = [];
    };

    return {
      mapX,
      mapY,
      features,
      layerIcons,
      close,
      getDirection,
    };
  },
});
</script>

