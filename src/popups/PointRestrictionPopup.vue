<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'point-restrictions-layer')?.paths"
    LightThemeColor="#CC209C33"
    DarkThemeColor="#cc209c"
    LightBadgeColor="#CC209C33"
    DarkBadgeColor="#cc209c"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Truck restriction' },
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
            isTime: false,
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
      moreInfoURL: {
        custom: getMoreInfoURL,
      },
    }"
    @close="close"
  >
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
      /*let direction;
      switch (feature.attributes.cardinal_direction) {
        case "B":
          direction = "both directions";
          break;
        case "N":
          direction = "northbound";
          break;
        case "S":
          direction = "southbound";
          break;
        case "E":
          direction = "eastbound";
          break;
        case "W":
          direction = "westbound";
          break;
      }*/
      const title = `${feature.attributes.location_description}`;
      return title;
    };
    const getMoreInfoURL = (): MoreInfoURLInfo => {
      //console.log(feature)
      const moreInfoObject = new Object({
        url: `https://wsdot.wa.gov/data/tools/bridgeclearance/`,
        text: "Check your overhead clearances in the",
        linkText: "Bridge Vertical Clearance Trip Planner",
      }) as MoreInfoURLInfo;
      return moreInfoObject;
    };
    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then((result) => {
          if (result) {
            feature.value = result;
          }
        });
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
      getMoreInfoURL,
    };
  },
});
</script>

