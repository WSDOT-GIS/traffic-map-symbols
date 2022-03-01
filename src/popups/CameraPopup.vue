<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";

import PopupBase from "./PopupBase.vue";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import { getFeatureInfosByIds } from "@/utils/featureInfoUtil";
import { getLayer } from "@/esri-stuff/esriMap";
// import FeatureLayer from "@/layers/CameraLayer";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import XY from "@/types/XY";
import { useStore } from "@/store";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

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
    const layerId="traffic-camera-layer";
    const store = useStore();
    const features = ref<FeatureInfo[]>([]);
    const mapXY = ref<XY | undefined>();
    const layerIcons = layerListIcons;
    const getDirection = (feature: FeatureInfo): string => {
      let newVal = "";
      if (features.value.length > 0) {
        let val = feature.attributes["CompassDirection"] as string;
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
              newVal = "";
              break;
          }
        }
      }
      return newVal;
    };

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
        getFeatureInfosByIds(props.Featureset.ids, lyr).then(
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
      layerId,
      mapXY,
      features,
      layerIcons,
      close,
      getDirection,
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'traffic-camera-layer')?.paths"
    :MapXY="mapXY"
    Width="w"
    LightThemeColor="#007b5f33"
    DarkThemeColor="#007b5f"
    :LayerId = "layerId"
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

