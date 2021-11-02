<template>
  <PopupBase
  :IconSvg="layerIcons.find((x) => x.id === 'rest-areas-layer')?.paths"
    LightThemeColor="#00AEC733"
    DarkThemeColor="#00AEC7"
    :Features="[feature]"
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
      <div
        v-html="layerIcons.find((x) => x.id == feature?.layerId)?.paths"
        width="24"
        height="24"
      ></div>
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
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(
          (result) => {
            if (result) {
              feature.value = result;
              //console.log(feature.value.attributes.Amenties as string)
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
      feature,
      layerIcons,
      close
    };
  },
});
</script>
<style scoped>
 
</style>

