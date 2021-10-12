<template>
  <div v-if="visible" class="popup-row-container">
    <span class="popup-row-label">{{ getLabel() }}</span>
    <span v-if="!propIsHTML" class="popup-row-value">{{ getText() }}</span>
    <span v-if="propIsHTML" class="popup-row-value" v-html="getText()"></span>
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
    const propIsHTML = ref<boolean>(false);
    const getLabel = () => {
      if (props.Config.label) {
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
            /* The date value is in local time, so do not let JS do time conversion.
               By using the UTC... functions, we can get the date as is without conversion. */
            const date = new Date(value);
            text = `${formatDateTimePart(date.getUTCMonth() + 1)}/${formatDateTimePart(
              date.getUTCDate()
            )}/${date.getUTCFullYear()}`;
            if (props.Config.value.isTime) {
              let hours = date.getUTCHours();
              let minutes = date.getUTCMinutes();
              // Check whether AM or PM
              const ampm = hours >= 12 ? "PM" : "AM";
              // Find current hour in AM-PM Format
              hours = hours % 12;
              // To display "0" as "12"
              hours = hours ? hours : 12;
              text += ` ${formatDateTimePart(hours)}:${formatDateTimePart(minutes)} ${ampm}`;
            }
          } else if (props.Config.value.isHTML == true) {
            propIsHTML.value = true;
            text = value.toString();
          } else {
            text = value.toString();
          }
        }
      } else if (props.Config.value.custom) {
        if (props.Config.value.isHTML == true) {
          propIsHTML.value = true;
          text = props.Config.value.custom(props.Feature);
        } else {
          text = props.Config.value.custom(props.Feature);
        }
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

    const formatDateTimePart = (part: number) => {
      return ("0" + part).slice(-2);
    };

    return {
      visible,
      getLabel,
      getText,
      propIsHTML,
    };
  },
});
</script>
<style scoped>
.popup-row-container {
  margin-bottom: 8px;
  font-size: var(--type-scale-base1);
  line-height: var(--type-scale-base3);
}

.popup-row-label {
  font-weight: var(--font-weight-bold);
  text-align: left;
}
.popup-row-value {
  font-weight: var(--font-weight-normal);
  text-align: left;
}
</style>

<style>
/** Override style in the WATECH theme for P tag since text includes p tags. Scoped style could not override the style. */
.popup-row-container p {
  font-size: var(--type-scale-base1);
  line-height: var(--type-scale-base3);
}
</style>
