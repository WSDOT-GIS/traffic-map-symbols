<template>
  <PopupBase
    LightThemeColor="#fff3cd"
    DarkThemeColor="#FFC107"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Truck Restriction' },
      badgeText: { custom: getBadgeText },
      title: { fieldName: 'location_description' },
      content: [
        { label: 'Travel delay', value: { text: '???' } },
        { label: '', value: { fieldName: 'restriction_comment' } },
        {
          label: 'Date effective',
          value: {
            fieldName: 'date_effective',
            isDate: true,
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'RecordUpdateDate',
            isDate: true,
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

import FeatureLayer from "@/layers/PointRestrictionsLayer";
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
    };
  },
});
</script>

