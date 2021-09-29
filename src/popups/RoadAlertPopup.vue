<template>
  <PopupBase
    LightThemeColor="#f7e5ae"
    DarkThemeColor="#FFC107"
    :LightBadgeColor="lightBadgeColor"
    :DarkBadgeColor="darkBadgeColor"
    :Features="[feature]"
    :Config="{
      bannerText: { fieldName: 'EventCategoryDescription' },
      badgeText: { custom: getEventPriority },
      title: { custom: getTitle },
      content: [
        { label: 'Travel delay', value: { text: '???' } },
        { label: 'Description', 
        value: { 
          fieldName: 'HeadlineMessage',
          isHTML:true
         }
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
  >
    <template v-slot:icon>
      <div
        v-html="badgeIcon"
        width="24"
        height="24"
      ></div>
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/RoadAlertsLayer";
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
    const darkBadgeColor = ref("");
    const lightBadgeColor = ref("");
    const badgeIcon = ref("");
    watch(props, () => {
      if (
        props.Featureset.layerId === FeatureLayer("road-alerts-layer").id ||
        props.Featureset.layerId === FeatureLayer("road-closures-layer").id
      ) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(
          props.Featureset.ids[0],
          FeatureLayer(props.Featureset.layerId)
        ).then((result) => {
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
    const getEventPriority = (feature: FeatureInfo): string =>{
      let badgeText="";
      if(feature.attributes.EventCategoryDescription=="Closure"){
        console.log(feature.attributes.EventCategoryDescription)
        badgeText = "Closed"
        badgeIcon.value = (layerListIcons.find(
                  (x) =>
                    x.id == 'road-closed'
                )?.paths) as string
        lightBadgeColor.value = "#484e55"
        darkBadgeColor.value = "#000000"
      }
      else{
        switch(feature.attributes.EventPriorityID){
          case 1:
            badgeText="Highest";
             badgeIcon.value = (layerListIcons.find(
                  (x) =>
                    x.id == 'road-alert-highest'
                )?.paths) as string
            lightBadgeColor.value = "#da9793"
            darkBadgeColor.value = "#B30B00"
            
            break;
          case 2:
            badgeText="High";
             badgeIcon.value = (layerListIcons.find(
                  (x) =>
                    x.id == 'road-alert-high'
                )?.paths) as string
            lightBadgeColor.value = "#e6818b"
            darkBadgeColor.value = "#DC354599"
            break;
          case 3:
            badgeText="Medium";
            badgeIcon.value = (layerListIcons.find(
                  (x) =>
                    x.id == 'road-alert-medium'
                )?.paths) as string
            lightBadgeColor.value = "#f7cbb1"
            darkBadgeColor.value = "#FF6A13"
            break;
          case 4:
            badgeText="Low";
            badgeIcon.value = (layerListIcons.find(
                  (x) =>
                    x.id == 'road-alert'
                )?.paths) as string
            lightBadgeColor.value = "#fffaec"
            darkBadgeColor.value = "#ffc107"
            break;
          case 5:
            badgeText="Low";
            badgeIcon.value = (layerListIcons.find(
                  (x) =>
                    x.id == 'road-alert'
                )?.paths) as string
            lightBadgeColor.value = "#fffaec"
            darkBadgeColor.value = "#ffc107"
            break;
        }
      }
      return badgeText
    }
    const getTitle = (feature: FeatureInfo): string => {
      const name = feature.attributes["Road"];
      const dir = feature.attributes["RoadDirection"];
      return `${name ? name : ""} ${dir ? dir : ""}`;
    };

    return {
      feature,
      close,
      getTitle,
      getEventPriority,
      lightBadgeColor,
      darkBadgeColor,
      badgeIcon
    };
  },
});
</script>

