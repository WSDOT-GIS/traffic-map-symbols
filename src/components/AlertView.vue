<template>
  <div
    v-if="Alerts.length > 0 && Alerts[0]"
    id="alert_container"
    class="w3-container"
  >
    <b>ALERT: {{ Alerts[0]?.HeadlineMessage }}</b>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AlertInfo from "@/types/AlertInfo";

export default defineComponent({
  props: {
    Alerts: {
      required: true,
      type: Object as PropType<Array<AlertInfo>>,
    },
  },
  // setup() {

  // }
});
</script>

<style scoped>
#alert_container {
  background-color: var(--color-warning);
}
</style>
