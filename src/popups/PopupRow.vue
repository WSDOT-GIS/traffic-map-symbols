<template>
  <div>
    <span class="popup-key">{{ Label ? Label + ": " : "" }}</span>
    <span class="popup-value">{{ text }}</span>
  </div>
</template>
<script lang="ts">
import FeatureInfo from "@/types/FeatureInfo";
import { defineComponent, PropType, ref, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    Label: {
      type: String,
      required: true,
    },
    TextData: {
      type: Object as PropType<{
        text: string; // set text to display the exact text
        feature: FeatureInfo; // set feature and fieldName properties to display attribute
        fieldName: string;
        isDate: boolean; // set isDate in addition to feature and fieldName to convert value to date string
      }>,
      required: true,
    },
  },
  setup(props) {
    const propText = toRefs(props).TextData;
    console.log("propText" + JSON.stringify(propText));
    const text = ref("");

    watch(propText, () => {
      console.log("Popup row update...");
      text.value = getText();
    });

    const getText = () => {
      let text = "";
      if (props.TextData.text) {
        text = props.TextData.text;
      } else if (props.TextData.feature && props.TextData.fieldName) {
        console.log("PopupRow...");
        let value = props.TextData.feature.attributes[props.TextData.fieldName];
        if (value && props.TextData.isDate) {
          const date = new Date(value);
          text = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
        } else {
          text = value ? value : "";
        }
      }
      return text;
    };

    return {
      text,
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
