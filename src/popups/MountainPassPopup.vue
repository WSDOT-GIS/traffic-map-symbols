<template>
  <PopupBase
    LightThemeColor="#e0efec"
    DarkThemeColor="#66B09F"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Mountain Pass' },
      title: { fieldName: 'PassName' },
      content: [
        {
          label: 'Temperature',
          value: {
            custom: getTemp,
          },
        },
        {
          label: 'Elevation',
          value: {
            custom: getElev,
          },
        },
        {
          label: getDirection1Label,
          value: {
            fieldName: 'PublicMessage1',
          },
        },
        {
          label: getDirection2Label,
          value: {
            fieldName: 'PublicMessage2',
          },
        },
        {
          label: 'Conditions',
          value: {
            fieldName: 'RoadCondition',
          },
        },
        {
          label: 'Weather',
          value: {
            fieldName: 'Weather',
          },
        },
        {
          label: 'Visibility',
          value: {
            text: '???',
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'DisplayDate',
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
// import PopupRow from "./PopupRow.vue";
import FeatureLayer from "@/layers/MountainPassesLayer";
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
    // MapX: {
    //   type: Number,
    //   required: true,
    // },
    // MapY: {
    //   type: Number,
    //   required: true,
    // },
  },
  setup(props) {
    const feature = ref<FeatureInfo>();
    // const mapX = ref(0);
    // const mapY = ref(0);
    const layerIcons = layerListIcons;
    watch(props, () => {
      if (props.Featureset.layerId === FeatureLayer.id) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer).then(
          (result) => {
            if (result) {
              feature.value = result;
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

    const getTemp = (feature: FeatureInfo): string => {
      //console.log(JSON.stringify("feature: " + feature));
      const num = feature.attributes["Temperature"];
      const unit = feature.attributes["TemperatureUnit"];
      let text = "";
      if (num) {
        text = `${num} ${unit ? unit : ""}`;
      }
      //console.log("Temp: " + text);
      return text;
    };

    const getElev = (feature: FeatureInfo) => {
      const num = feature.attributes["Elevation"];
      const unit = feature.attributes["ElevationUnit"];
      let text = "";
      if (num) {
        text = `${num} ${unit ? unit : ""}`;
      }
      return text;
    };

    const getDirection1Label = (feature: FeatureInfo) => {
      //console.log("getDirection1Label");
      return "Restrictions " + feature.attributes["TravelDirection1"];
    };

    const getDirection2Label = (feature: FeatureInfo) => {
      return "Restrictions " + feature.attributes["TravelDirection2"];
    };

    return {
      // mapX,
      // mapY,
      feature,
      layerIcons,
      close,
      getTemp,
      getElev,
      getDirection1Label,
      getDirection2Label,
    };
  },
});
</script>

