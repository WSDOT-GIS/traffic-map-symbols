<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import type FeaturesetInfo from "@/types/FeaturesetInfo";
import type FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import type MoreInfoURLInfo from "@/types/MoreInfoURLInfo";
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
    const layerId = "point-restrictions-layer";
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
    const getTitle = (feature: FeatureInfo): string => {
      const title = `${feature.attributes.location_description}`;
      return title;
    };
    const getMoreInfoURL = (): MoreInfoURLInfo => {
      const moreInfoObject = new Object({
        url: `https://wsdot.wa.gov/data/tools/bridgeclearance/`,
        text: "Check your overhead clearances in the",
        linkText: "Bridge Vertical Clearance Trip Planner",
      }) as MoreInfoURLInfo;
      return moreInfoObject;
    };
    const show = () => {
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== "loaded") {
        close();
        return;
      }
      const lyr = getLayer(layerId) as FeatureLayer;
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], lyr).then((result) => {
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
      layerId,
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
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'point-restrictions-layer')?.paths"
    LightThemeColor="#CC209C33"
    DarkThemeColor="#cc209c"
    LightBadgeColor="#CC209C33"
    DarkBadgeColor="#cc209c"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
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
  ></PopupBase>
</template>
