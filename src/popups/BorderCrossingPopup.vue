<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id == 'border-crossing')?.paths"
    LightThemeColor="#e885b433"
    DarkThemeColor="#e885b4"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Border crossing' },
      title: { fieldName: 'BorderCrossingDescription' },
      content: [
        { label: 'Northbound wait time', value: { fieldName: 'HTMLTable',isHTML: true } },
      ],
       moreInfoURL:{
        custom: getMoreInfoURL
      }
    }"
    @close="close"
  >
    <template v-slot:icon>
      <div class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'border-crossing')
                  ?.paths
              ">
      </div>
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/BorderCrossingsLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import MoreInfoURLInfo from "@/types/MoreInfoURLInfo";
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
    const getMoreInfoURL=(feature: FeatureInfo): MoreInfoURLInfo=>{
      //console.log(feature)
      //console.log(feature.attributes)
      const moreInfoObject =new Object({
        url: `https://www.th.gov.bc.ca/ATIS/index.htm`,
        text: "Get the",
        linkText: "Southbound wait time here"
      }) as MoreInfoURLInfo
      return moreInfoObject
    }
    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(
          (result) => {
            if (result) {
              feature.value = result;
              //console.log(result)
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
    // Setting XY to 0 closes the popup...
    const close = () => {
      feature.value = undefined;
    };

    return {
      feature,
      close,
      getMoreInfoURL,
      layerIcons
    };
  },
});
</script>
<style scoped>

</style>