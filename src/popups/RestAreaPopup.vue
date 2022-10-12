<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import type FeaturesetInfo from "@/types/FeaturesetInfo";
import type FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getLayer } from "@/esri-stuff/esriMap";
import { useStore } from "@/store";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const layerId = "rest-areas-layer";
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
        getFeatureInfoById(props.Featureset.ids[0], lyr).then(
          (result) => {
            if (result) {
              feature.value = result;
            }
          }
        );
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
      close
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'rest-areas-layer')?.paths"
    LightThemeColor="#00AEC733"
    DarkThemeColor="#00AEC7"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :Config="{
      bannerText: { text: 'Rest area' },
      title: { fieldName: 'RestAreaName' },
      content: [
        {
          label: 'Location',
          value: {
            fieldName: 'LocationName',
          },
        },
        {
          label: 'Amenities',
          value: {
            fieldName: 'Amenties',
          },
        },
      ],
    }"
    @close="close"
  >
    <template v-slot:icon>
      <div v-html="layerIcons.find((x) => x.id == feature?.layerId)?.paths" width="24" height="24"></div>
    </template>
  </PopupBase>
</template>

