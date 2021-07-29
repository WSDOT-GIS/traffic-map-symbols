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
    TextOptions: {
      // Initially tried this with individual properties as optional props, but reactivity did not work properly values are all undefined at first.
      // So bundled all properties into a object and required it.
      type: Object as PropType<{
        text: string; // set text to display the exact text
        feature: FeatureInfo; // set feature and fieldName properties to display attribute
        fieldName: string;
        isDate: boolean; // set isDate in addition to feature and fieldName to convert value to date string
        isTime: boolean; // set both isDate and isTime to convert to date and time
      }>,
      required: true,
    },
  },
  setup(props) {
    const propText = toRefs(props).TextOptions;
    const text = ref("");

    watch(propText, () => {
      //console.log("Popup row update...");
      text.value = getText();
    });

    const getText = () => {
      let text = "";
      if (props.TextOptions.text) {
        text = props.TextOptions.text;
      } else if (props.TextOptions.feature && props.TextOptions.fieldName) {
        let value =
          props.TextOptions.feature.attributes[props.TextOptions.fieldName];
        if (value) {
          if (props.TextOptions.isDate) {
            const date = new Date(value);
            text = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`;
            if (props.TextOptions.isTime) {
              text += ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }
          } else {
            text = value.toString();
          }
        } else {
          text = "N/A";
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
