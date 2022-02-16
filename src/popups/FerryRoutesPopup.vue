<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getFerryAlerts } from "@/utils/alertInfoUtil";
import PopupConfig from "@/types/PopupConfig";
import { formatEpoch } from "@/utils/miscUtil";
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
    const layerId = "ferry-routes-points-layer";
    const store = useStore();
    const feature = ref<FeatureInfo>();
    const layerIcons = layerListIcons;
    const popupConfig = ref<PopupConfig>({
      bannerText: { text: "Ferries" },
      content: [],
      paging: { direction: "vertical", maxPage: 0 },
    });

    watch(props, () => {
      if (props.Featureset.layerId === layerId) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      popupConfig.value.content = [];
      const lyrStatus = store.getters.getLayerStatus(layerId);
      if (lyrStatus !== "loaded") {
        close();
        return;
      }
      const lyr = getLayer(layerId) as FeatureLayer;
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], lyr).then((ftr) => {
          if (ftr) {
            getFerryAlerts(ftr.attributes.FerryRouteID as number).then((alerts) => {
              if (popupConfig.value.paging) {
                popupConfig.value.paging.maxPage = alerts.length;
              }
              alerts.forEach((each, idx) => {
                popupConfig.value.content.push({
                  label: "",
                  value: {
                    text: `<div class="popup-page-break" data-page-num="${idx + 1}"></div>
                    <h4 class="popup-title popup-paging-entry" data-page-num="${idx + 1}">${each.AlertFullTitle
                      }</h4>`,
                    isHTML: true,
                  },
                });
                popupConfig.value.content.push({
                  label: "Description",
                  value: {
                    text: each.HomepageAlertText,
                    isHTML: true,
                  },
                });
                popupConfig.value.content.push({
                  label: "Publish Date",
                  value: { text: formatEpoch(each.PublishDate, true) },
                });
              });
              feature.value = ftr;
            });
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
    return {
      layerId,
      popupConfig,
      feature,
      layerIcons,
      close,
    };
  },
});
</script>
<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'road-alert')?.paths"
    LightThemeColor="#FFC1074D"
    DarkThemeColor="#FFC107"
    :LayerId="layerId"
    :Features="feature ? [feature] : []"
    :Config="popupConfig"
    @close="close"
  ></PopupBase>
</template>
