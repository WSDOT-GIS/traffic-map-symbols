<template>
  <div>
    <span class="popup-key">{{ Label ? Label + ": " : "" }}</span>
    <span class="popup-value">{{ text }}</span>
  </div>
</template>
<script lang="ts">
import FeatureInfo from "@/types/FeatureInfo";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    Label: {
      type: String,
      required: false,
    },
    Text: {
      type: String,
      required: false,
    },
    Feature: {
      type: Object as PropType<FeatureInfo>,
      required: false,
    },
    FieldName: {
      type: String,
      required: false,
    },
    IsDate: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {
    const text = computed(() => {
      let text = "";
      if (props.Text) {
        text = props.Text;
      } else if (props.Feature && props.FieldName) {
        let value = props.Feature.attributes[props.FieldName];
        if (value && props.IsDate) {
          const date = new Date(value);
          text = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        } else {
          text = value ? value : "";
        }
      }
      return text;
    });

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
