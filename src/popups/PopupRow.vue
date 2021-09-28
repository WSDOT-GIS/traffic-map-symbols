<template>
  <div v-if="visible" class="popup-content w3-container">
    <span class="popup-key">{{ getLabel() }}</span>
    <span v-if="isHTML!=true" class="popup-value">{{ getText() }}</span>
    <span v-if="isHTML==true" class="popup-value">{{ getText() }}</span>
  </div>
</template>
<script lang="ts">
import FeatureInfo from "@/types/FeatureInfo";
import PopupRowConfig from "@/types/PopupRowConfig";
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  props: {
    Config: {
      type: Object as PropType<PopupRowConfig>,
      required: true,
    },
    Feature: {
      type: Object as PropType<FeatureInfo>,
      required: true,
    },
  },
  setup(props) {
    const visible = ref(true);
    watch(props, () => {
      getText();
    });
    const propIsHTML = ref<boolean>(false)
    const getLabel = () => {
      if(props.Config.label){
        if (!props.Feature) {
        return;
      }
      let label = "";
      if (typeof props.Config.label === "string") {
        label = props.Config.label;
      } else {
        const func = props.Config.label as (f: FeatureInfo) => string;
        label = func(props.Feature);
      }
      if (label) {
        label += ": ";
      } else {
        label = "";
      }
      return label;
      }
    };

    const getText = () => {
      if (!props.Feature) {
        return;
      }
      let text = "";
      if (props.Config.value.text) {
        text = props.Config.value.text;
      } else if (props.Config.value.fieldName) {
        let value = props.Feature.attributes[props.Config.value.fieldName];
        if (value) {
          if (props.Config.value.isDate) {
            const date = new Date(value);
            text = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`;
            if (props.Config.value.isTime) {
              let hours = date.getHours();
              let minutes = date.getMinutes();
              // Check whether AM or PM
              const ampm = hours >= 12 ? "PM" : "AM";
              // Find current hour in AM-PM Format
              hours = hours % 12;
              // To display "0" as "12"
              hours = hours ? hours : 12;
              text += ` ${hours}:${formatTimePart(minutes)}${ampm}`;
            }
          }
          else if(props.Config.value.isHTML==true){
            propIsHTML.value=true
            text = value.toString();
          } else {
            text = value.toString();
          }
        }
      } else if (props.Config.value.custom) {
        text = props.Config.value.custom(props.Feature);
      }
      // Do not show when data is not available...
      if (!text) {
        //text = "N/A";
        visible.value = false;
      }
      // Temporarily hide...
      else if (text === "???") {
        visible.value = false;
      } else {
        visible.value = true;
      }
      // console.log("...text: " + text);
      return text;
    };

    const formatTimePart = (part: number) => {
      return ("0" + part).slice(-2);
    };

    return {
      visible,
      getLabel,
      getText,
      propIsHTML
    };
  },
});
</script>
<style scoped>
.popup-content {
  text-align: left;
  margin-bottom: 8px;
}
.popup-key {
  font-weight: bold;
  text-align: left;
}
.popup-value {
  text-align: left;
}
</style>
