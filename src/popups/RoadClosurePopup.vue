<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { otherIcons } from "@/symbols/IconDefinitions";
import { getLayer } from "@/esri-stuff/esriMap";
import { useStore } from "@/store";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { LayerStatus } from "@/types/LayerInfo";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const layerId = "linear-closures-layer";
    const store = useStore();
    const feature = ref<FeatureInfo>();
    const darkBadgeColor = ref("red");
    const lightBadgeColor = ref("pink");
    const badgeIcon = ref("");
    //badgeIcon.value=layerListIcons.find((x) => x.id == "linear-closures-layer")?.paths as string;
    
    badgeIcon.value=otherIcons.find((x) => x.id == "linear-closures-layer")?.paths as string;
    watch(props, () => {
      if (
        props.Featureset.layerId === layerId
      ) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== LayerStatus.Loaded) {
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
    const getTitle = (feature: FeatureInfo): string => {
      const name = feature.attributes["Road"];
      const dir = feature.attributes["RoadDirection"];
      return `${name ? name : ""} ${dir ? dir : ""}`;
    };

    return {
      layerId,
      feature,
      close,
      getTitle,
      lightBadgeColor,
      darkBadgeColor,
      badgeIcon,
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="badgeIcon"
    LightThemeColor="pink"
    DarkThemeColor="red"
    LightBadgeColor="pink"
    :DarkBadgeColor="darkBadgeColor"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :Config="{
      bannerText: { text: 'Road Closure' },
      title: { custom: getTitle },
      content: [
        { label: 'Travel delay', value: { text: '???' } },
        {
          label: 'Description',
          value: {
            fieldName: 'HeadlineMessage',
            isHTML: true,
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'LastModifiedDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  ></PopupBase>
</template>
