<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'road-alert')?.paths"
    LightThemeColor="#FFC1074D"
    DarkThemeColor="#FFC107"
    :Features="[feature]"
    :Config="popupConfig"
    @close="close"
  >
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/PointFerryRoutesLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";
import { layerListIcons } from "@/symbols/IconDefinitions";
import { getFerryAlerts } from "@/utils/alertInfoUtil";
import PopupConfig from "@/types/PopupConfig";
export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
    // Alerts: {
    //   type: Object as PropType<Array<FerryAlertInfo>>,
    //   required: true,
    // },
  },
  setup(props) {
    const feature = ref<FeatureInfo>();
    const layerIcons = layerListIcons;
    const popupConfig = ref<PopupConfig>({
      bannerText: { text: "Ferries" },
      content: [],
    });

    watch(props, () => {
      if (props.Featureset.layerId === "ferry-routes-points-layer") {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      popupConfig.value.content = [];
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then((ftr) => {
          if (ftr) {
            getFerryAlerts(ftr.attributes.FerryRouteID as number).then((alerts) => {
              // console.log(JSON.stringify(alerts));
              alerts.forEach((each) => {
                popupConfig.value.content.push({
                  label: "",
                  value: {
                    text: `<h4 class="popup-title">${each.AlertFullTitle}</h4>`,
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
                  label: "Sort Order",
                  value: { text: each.SortOrder.toString() },
                });
              });
              console.log(JSON.stringify(popupConfig.value));
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
      popupConfig,
      feature,
      layerIcons,
      close,
    };
  },
});
</script>

