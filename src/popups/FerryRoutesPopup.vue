<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'road-alert')?.paths"
    LightThemeColor="#FFC1074D"
    DarkThemeColor="#FFC107"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Ferries' },
      title: {
        custom: getTitle,
        isHTML: true,
      },
      content: [
        {
          label: 'Description',
          value: {
            custom: getDescription,
            isHTML: true,
          },
        },
        {
          label: 'Last updated',
          value: {
            custom: getPublishDate,
            isDate:true,
            isTime:true
          },
        },
      ],
    }"
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
import FerryAlertInfo from "@/types/FerryAlertInfo";
export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
    Alerts: {
      type: Object as PropType<Array<FerryAlertInfo>>,
      required: true,
    },
  },
  setup(props) {
    const feature = ref<FeatureInfo>();
    const layerIcons = layerListIcons;

    watch(props, () => {
      if (props.Featureset.layerId === "ferry-routes-points-layer") {
        //FeatureLayer().id) {
        show();
      } else {
        close();
      }
    });

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
    const getDescription = (feature: FeatureInfo): string | undefined => {
      let descriptionText: string | undefined = undefined;
      props.Alerts.map((x) => {
        if ((x.FerryRouteId as number) == feature.attributes.FerryRouteID) {
          descriptionText = x.HomepageAlertText;
        }
      });
      if (descriptionText) {
        return descriptionText;
      }
    };
    const getPublishDate = (feature: FeatureInfo): string | undefined => {
      let publishDate: number | undefined = undefined;
      props.Alerts.map((x) => {
        if ((x.FerryRouteId as number) == feature.attributes.FerryRouteID) {
          publishDate = x.PublishDate;
        }
      });
      if (publishDate) {
        return publishDate
      }
    };
    const getTitle = (feature: FeatureInfo): string | undefined => {
      let titleText: string | undefined = undefined;
      props.Alerts.map((x) => {
        if ((x.FerryRouteId as number) == feature.attributes.FerryRouteID) {
          titleText = x.AlertFullTitle;
        }
      });
      if (titleText) {
        return titleText;
      }
    };
    return {
      feature,
      layerIcons,
      close,
      getTitle,
      getDescription,
      getPublishDate
    };
  },
});
</script>

