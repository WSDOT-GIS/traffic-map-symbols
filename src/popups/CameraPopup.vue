<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'traffic-camera-layer')?.paths"
    :MapXY="mapXY"
    Width="w"
    LightThemeColor="#007b5f33"
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
        {
          label: 'Refresh Rate',
          value: { text: 'Approximately every 5 minutes' },
        },
      ],
    }"
    @close="close"
  >
    <template v-slot:icon>
      <div
        v-html="layerIcons.find((x) => x.id == features[0].layerId)?.paths"
        width="24"
        height="24"
      ></div>
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";

import PopupBase from "./PopupBase.vue";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import { getFeatureInfosByIds } from "@/utils/featureInfoUtil";
import FeatureLayer from "@/layers/CameraLayer";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import XY from "@/types/XY";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
    // Supply Map X/Y for the clustered features.
    MapXY: {
      type: Object as PropType<XY>,
      required: false,
    },
  },
  setup(props) {
    const features = ref<FeatureInfo[]>([]);
    const mapXY = ref<XY | undefined>();
    const layerIcons = layerListIcons;
    const getDirection = (feature: FeatureInfo): string | undefined => {
      if (features.value.length > 0) {
        let val = feature.attributes["CompassDirection"] as string;
        let newVal:string|undefined;
        if (val) {
          switch(val){
            case "N":
              newVal= "North";
              break;
            case "S":
              newVal="South";
              break;
            case "E":
              newVal="East";
              break;
            case "W":
              newVal="West";
              break;
            case "B":
              newVal = undefined;
              break;
          }
        }
        return newVal;
      }
    };

    watch(props, () => {
      if (props.Featureset.layerId === FeatureLayer().id) {
        show();
      } else {
        close();
      }
    });
    const show = () => {
      const setVal = () => {
        getFeatureInfosByIds(props.Featureset.ids, FeatureLayer()).then(
          (results) => {
            features.value = results;
            mapXY.value = props.MapXY;
          }
        );
      };
      if (features.value.length > 0) {
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
    // Emptying the feature array closes the popup...
    const close = () => {
      mapXY.value = undefined;
      features.value = [];
    };

    return {
      mapXY,
      features,
      layerIcons,
      close,
      getDirection,
    };
  },
});
</script>

