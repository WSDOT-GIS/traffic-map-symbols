<template>
  <PopupBase
    LightThemeColor="#fcdeff"
    DarkThemeColor="#96359f"
    :Features="[feature]"
    :TravelDelay="TravelDelay"
    :Config="{
      bannerText: { text:'Travel Time' },
      badgeText: { custom: getDelayStatus },
      title: { custom: getTitle },
      content: [
        { 
          label: 'Average Time (Min.)', 
          value: { fieldName: 'AverageTime' }, 
        },
        { 
          label: 'Current Time (Min.)', 
          value: { custom: getCurrentTime},
        },{ 
          label: 'HOV Lane Time (Min.)', 
          value: { custom: getHOVTime},
        },
        /*{ 
          label: 'HOV Average Time (Min.)', 
          value: { fieldName: 'HOVAverageTime'},
        },
        { 
          label: 'Express Lane Title', 
          value: { fieldName: 'ExpressLaneTitle'}
        },
				{ 
          label:'Express Lane Average Time (Min.)', 
          value: { fieldName: 'ExpressLaneAverageTime'}
        },
				{ 
          label:'Express Lane Current Time (Min.)', 
          value: { fieldName: 'ExpressLaneCurrentTime'}
        },
				{ 
          label:'Express Lane HOV Current Time (Min.)', 
          value: { fieldName: 'ExpressLaneHOVCurrentTime'}
        },
				{ 
          label:'Express Lane HOV Average Time (Min.)', 
          value: { fieldName: 'ExpressLaneHOVAverageTime'}
        },
				{ 
          label:'Covered Routes', 
          value: { fieldName: 'CoveredRoutes'}
        },
				{ 
          label:'Travel Region', 
          value: { fieldName: 'TravelRegion'}
        },
				{ 
          label:'Display Order All', 
          value: { fieldName: 'DisplayOrderAll'}
        },
				{ 
          label:'Display Order Direction', 
          value: { fieldName: 'DisplayOrderDirection'}
        },
				{ 
          label:'Travel Direction', 
          value: { fieldName: 'TravelDirection'}
        },
				{ 
          label:'Commute Page Address', 
          value: { fieldName: 'CommutePageAddress'}
        },
				{ 
          label:'Latitude', 
          value: { fieldName: 'Latitude'}
        },
				{ 
          label:'Longitude', 
          value: { fieldName: 'Longitude'}
        },*/
        { 
          label:'Last Updated', 
          value: { 
            fieldName: 'TimeUpdated',
            isDate: true,
            isTime: true
          }
        }
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
import FeatureLayer from "@/layers/TravelTimeLayer";
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
    const layerIcons = layerListIcons;
    const feature = ref<FeatureInfo>();
    const TravelDelay = ref<number>(0);
    // const mapX = ref(0);
    // const mapY = ref(0);

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
              // console.log(result)
              console.log(result)
              feature.value = result;
              if((result.attributes.CurrentTime as number)-(result.attributes.AverageTime as number)>0){
                TravelDelay.value = (result.attributes.CurrentTime as number)-(result.attributes.AverageTime as number)
              }
              else{
                TravelDelay.value=0
              }
              // mapX.value = props.MapX;
              // mapY.value = props.MapY;
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
    // Setting XY to 0 closes the popup...
    const close = () => {
      // mapX.value = 0;
      // mapY.value = 0;
      feature.value = undefined;
    };
    const getDelayStatus = () =>{
      let delayStatus = undefined;
      TravelDelay.value>0?delayStatus="Delayed":delayStatus=undefined
      return delayStatus
    }
    const getTime = (feature: FeatureInfo): string => {
      const title = feature.attributes["Title"];
      return `${title}`;
    };
    const getHOVTime = (feature: FeatureInfo): string  => {
      let HOVTime;
      var difference = Date.now() - (new Date(feature.attributes.TimeUpdated as string).getTime());
      if((difference/1000/60)>60){
        HOVTime="Not Available"
      }
      else{
        HOVTime = feature.attributes.HOVCurrentTime
      }
      return HOVTime as string;
    };
    const getCurrentTime = (feature: FeatureInfo): string  => {
      let currentTime;
      var difference = Date.now() - (new Date(feature.attributes.TimeUpdated as string).getTime());
      if((difference/1000/60)>60){
        currentTime="Not Available"
      }
      else{
        currentTime = feature.attributes.HOVCurrentTime
      }
      return currentTime as string;
    }
    const getTitle = (feature: FeatureInfo): string => {
      const title = feature.attributes["Title"];
      return `${title}`;
    };
    return {
      layerIcons,
      // mapX,
      // mapY,
      feature,
      close,
      getTitle,
      getTime,
      getDelayStatus,
      TravelDelay,
      getHOVTime,
      getCurrentTime
    };
  },
});
</script>

