<template>
  <div v-if="visible" class="popup-row-container">
    <span class="popup-row-label">{{ getLabel() }}</span>
    <span v-if="!Config.value.isHTML" class="popup-row-value">{{ getText() }}</span>
    <span v-if="Config.value.isHTML" class="popup-row-value" v-html="getText()"></span>
  </div>
</template>
<script lang="ts">
import FeatureInfo from "@/types/FeatureInfo";
import PopupRowConfig from "@/types/PopupRowConfig";
import { formatEpoch } from "@/utils/miscUtil";
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
      } else {
        let value;
        if (props.Config.value.fieldName) {
          value = props.Feature.attributes[props.Config.value.fieldName];
        }
        if (props.Config.value.custom) {
          value = props.Config.value.custom(props.Feature);
        }
        if (value) {
          if (props.Config.value.isDate) {
            text = formatEpoch(Number(value), props.Config.value.isTime);
          } else {
            text = value.toString();
          }
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

    // const formatDateTimePart = (part: number) => {
    //   return ("0" + part).slice(-2);
    // };

    return {
      visible,
      getLabel,
      getText,
    };
  },
});
</script>
<style scoped>
.popup-row-container {
  margin-bottom: 8px;
  font-size: var(--type-scale-base3);
  line-height: var(--type-scale-base5);
}

.popup-row-label {
  font-weight: var(--font-weight-heavy);
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
  font-size: var(--type-scale-base3);
  line-height: var(--type-scale-base5);
}

</style>
