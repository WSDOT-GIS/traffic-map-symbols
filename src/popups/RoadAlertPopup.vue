<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getLayer } from "@/esri-stuff/esriMap";
import { useStore } from "@/store";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const layerId = "road-alerts-layer";
    const store = useStore();
    const feature = ref<FeatureInfo>();
    const darkBadgeColor = ref("");
    const lightBadgeColor = ref("");
    const badgeIcon = ref("");
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
    const getEventPriority = (feature: FeatureInfo): string => {
      let badgeText = "";
      switch (feature.attributes.TravelCenterPriorityId) {
        case 1:
          badgeText = "Closed";
          badgeIcon.value = layerListIcons.find((x) => x.id == "road-closed")?.paths as string;
          lightBadgeColor.value = "#484e55";
          darkBadgeColor.value = "#000000";
          break;
        case 2:
          badgeText = "High";
          badgeIcon.value = layerListIcons.find((x) => x.id == "road-alert-high")?.paths as string;
          lightBadgeColor.value = "#DC354599";
          darkBadgeColor.value = "#DC3545";
          break;
        case 3:
          badgeText = "Medium";
          badgeIcon.value = layerListIcons.find((x) => x.id == "road-alert-medium")?.paths as string;
          lightBadgeColor.value = "#FF6A134D";
          darkBadgeColor.value = "#FF6A13";
          break;
        case 4:
          badgeText = "Low";
          badgeIcon.value = layerListIcons.find((x) => x.id == "road-alert")?.paths as string;
          lightBadgeColor.value = "#fffaec";
          darkBadgeColor.value = "#ffc107";
          break;
      }
      return badgeText;
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
      getEventPriority,
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
    LightThemeColor="#FFC1074D"
    DarkThemeColor="#FFC107"
    :LightBadgeColor="lightBadgeColor"
    :DarkBadgeColor="darkBadgeColor"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :Config="{
      bannerText: { fieldName: 'EventCategoryTypeDescription' },
      badgeText: { custom: getEventPriority },
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
