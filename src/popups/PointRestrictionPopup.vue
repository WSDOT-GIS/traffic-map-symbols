<template>
  <PopupBase
    LightThemeColor="#f5d2eb"
    DarkThemeColor="#cc209c"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Truck Restriction' },
      badgeText: { custom: getBadgeText },
      title: { custom: getTitle },
      content: [
        { label: 'Travel delay', value: { text: '???' } },
        { label: 'Description', value: { fieldName: 'restriction_comment' } },
        {
          label: 'Date effective',
          value: {
            fieldName: 'date_effective',
            isDate: true,
            isTime: true,
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'RecordUpdateDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
      moreInfoURL:{
        custom: getMoreInfoURL
      },
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

import FeatureLayer from "@/layers/PointRestrictionsLayer";
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
    const getTitle = (feature: FeatureInfo): string => {
      //console.log(feature)
      let direction;
      switch(feature.attributes.cardinal_direction){
        case "B":
          direction="Both Directions";
          break;
        case "N":
          direction = "Northbound";
          break;
        case "S":
          direction = "Southbound";
          break;
        case "E":
          direction = "Eastbound";
          break;
        case "W":
          direction = "Westbound";
          break;
      }
      const title = `SR ${feature.attributes.route_nr} ${feature.attributes.bridge_name}, ${direction}`
      return title
    }
    const getMoreInfoURL=(feature: FeatureInfo): MoreInfoURLInfo=>{
      //console.log(feature)
      const moreInfoObject =new Object({
        url: `https://wsdot.wa.gov/data/tools/bridgeclearance/`,
        text: "Be sure to check out your route in the",
        linkText: "Bridge Vertical Trip Planner"
      }) as MoreInfoURLInfo
      return moreInfoObject
    }
    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(
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

    const getBadgeText = (feature: FeatureInfo): string => {
      const ttype = feature.attributes["TType"];
      let text = "";
      switch (ttype) {
        case "R":
          text = "Road";
          break;
        case "B":
          text = "Bridge";
          break;
      }
      return text;
    };

    return {
      feature,
      layerIcons,
      close,
      getBadgeText,
      getTitle,
      getMoreInfoURL
    };
  },
});
</script>

