<template>
  <PopupBase
    LightThemeColor="#d8e8eb"
    DarkThemeColor="#63a4ad"
    :Amenities="Amenities"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Rest Area' },
      title: { fieldName: 'PassName' },
      content: [
        {
          label: 'Name',
          value: {
            fieldName: 'title',
          },
        },
         {
          label: 'Last Updated',
          value: {
            fieldName: 'title',
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
    <template v-slot:amenitiesPanel>
      <div>
        <table>
          <label v-for="Amenity in Amenities" :key="Amenity" class="amenityLabel">{{Amenity}}</label>
        </table>
      </div>
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
    const Amenities = ref<string[]>();
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
              if((feature.value.attributes.Amenties as string).split(",") as string[]!=["none"]){
                 Amenities.value = (feature.value.attributes.Amenties as string).split(",") as string[]
              }
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
      Amenities,
      close,
    };
  },
});
</script>
<style scoped>
  .amenityLabel {
  display: inline-block;
  font-weight: 700;
  font-size: small;
  padding: 3px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #ffc107;
  background-color: #fffaec;
  margin: 3px 1em 0 1em;
}
</style>

