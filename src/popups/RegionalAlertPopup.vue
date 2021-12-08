<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import Handles from "@arcgis/core/core/Handles";

import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/RegionalAlertLayer";
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
    let esriHandles = new Handles();

    watch(props, () => {
      if (props.Featureset.layerId === FeatureLayer().id) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const layer = FeatureLayer();
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], layer).then(
          //query feature layer for feature
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
      esriHandles.removeAll();
      esriHandles.add(
        layer.on("edits", (event) => {
          const result = event.updatedFeatures.find((x) => {
            return x.objectId === feature.value?.id;
          });
          if (result && feature.value?.id) {
            getFeatureInfoById(feature.value?.id, layer).then((result) => {
              if (result && feature.value) {
                feature.value.mapPoint = result.mapPoint;
              }
            });
          }
        })
      );
    };
    // Setting features to undefined closes the popup...
    const close = () => {
      feature.value = undefined;
      esriHandles.removeAll();
    };
    const getExtendedMessage = (feature: FeatureInfo): string => {
      let html = "";
      if (feature.attributes["ExtendedMessage"]) {
        html = `
        <br>
          <div>
            ${feature.attributes["ExtendedMessage"]}
          </div>
        <br>`
      }
      return html;
    }
    const getTitle = (feature: FeatureInfo): string => {
      return (
        feature.attributes["EventCategoryTypeDescription"] +
        " alert for " +
        feature.attributes["LocationName"] +
        " " +
        feature.attributes["EventCategoryType"]
      );
    };
    return {
      feature,
      layerIcons,
      close,
      getTitle,
      getExtendedMessage
    };
  },
});
</script>

<template>
  <PopupBase
    :IconSvg="layerIcons.find((x) => x.id === 'regional-alert-layer')?.paths"
    LightThemeColor="#8E09004D"
    DarkThemeColor="#8E0900"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Emergency' },
      title: { custom: getTitle },
      content: [
        { label: 'Description', value: { fieldName: 'HeadlineMessage' } },
        { label: '', value: { fieldName: 'ExtendedMessage' } },
        {
          label:'',
          value:{
            custom: getExtendedMessage,
            isHTML: true
          }
        },
        {
          label: 'Last Updated',
          value: {
            fieldName: 'LastModifiedDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  >
  </PopupBase>
</template>

