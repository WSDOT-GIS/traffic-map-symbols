<template>
  <PopupBase
    LightThemeColor="#f5c4c7"
    DarkThemeColor="#c40009"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Fire' },
      title: { fieldName: 'IncidentName' },
      content: [
        {label: 'Type',value: {fieldName: 'IncidentTypeCategory'}},
        {label: 'Cause', value: {fieldName: 'FireCause' }},
        {label: 'Wind dir.',value: {fieldName: 'CardinalCompassDirection'}},
        {label: 'Irwin ID',value: {fieldName: 'IrwinID'},},
        {label: 'Acres',value: {fieldName: 'CalculatedAcres'}},
        {label: 'Discovery Date',value: {
            fieldName: 'FireDiscoveryDateTime',
            isDate: true,
            isTime: true,
            },
        },
        {label: 'Owner Category',value:{ fieldName:'POOLandownerCategory'}},
        {label: 'Owner Kind',value:{ fieldName:'POOLandownerKind'}},
        {label: 'Jurisdictional Agency',value:{ fieldName:'POOJurisdictionalAgency'}},
        {label: 'Last Updated',value:{ 
            fieldName:'ModifiedOnDateTime_dt',
            isDate: true,
            isTime: true,}},
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
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/FireIncidentLayer";
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
      if (props.Featureset.layerId === FeatureLayer().id) {//if clicked feature belongs to WeatherStations layer
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(//query feature layer for feature
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
        nextTick(() => {
          setVal();
        });
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
      close,
    };
  },
});
</script>

