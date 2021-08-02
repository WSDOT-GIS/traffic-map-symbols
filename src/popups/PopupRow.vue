<template>
  <div>
    <span class="popup-key">{{ getLabel() }}</span>
    <span class="popup-value">{{ getText() }}</span>
    <!-- <span class="popup-key">{{ Label ? Label + ": " : "" }}</span>
    <span class="popup-value">{{ text }}</span> -->
  </div>
</template>
<script lang="ts">
import FeatureInfo from "@/types/FeatureInfo";
import PopupRowConfig from "@/types/PopupRowConfig";
import { defineComponent, PropType } from "vue";

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
    const getLabel = () => {
      console.log("getLabel...");
      let label = "";
      if (typeof props.Config.label === "string") {
        console.log("label is string");
        label = props.Config.label;
      } else {
        console.log("label is function");
        const func = props.Config.label as (f: FeatureInfo) => string;
        label = func(props.Feature);
      }
      if (label) {
        label += ": ";
      } else {
        label = "";
      }
      return label;
    };

    const getText = () => {
      console.log("getText...");
      let text = "";
      if (props.Config.value.text) {
        text = props.Config.value.text;
      } else if (props.Feature && props.Config.value.fieldName) {
        let value = props.Feature.attributes[props.Config.value.fieldName];
        if (value) {
          if (props.Config.value.isDate) {
            const date = new Date(value);
            text = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`;
            if (props.Config.value.isTime) {
              text += ` ${formatTimePart(date.getHours())}:${formatTimePart(
                date.getMinutes()
              )}`;
            }
          } else {
            text = value.toString();
          }
        }
      } else if (props.Config.value.custom) {
        text = props.Config.value.custom(props.Feature);
      }
      if (!text) {
        text = "N/A";
      }
      return text;
    };

    const formatTimePart = (part: number) => {
      return ("0" + part).slice(-2);
    };

    return {
      getLabel,
      getText,
    };
  },
});
</script>
<style scoped>
.popup-key {
  font-weight: bold;
  text-align: left;
}
.popup-value {
  text-align: left;
}
</style>
