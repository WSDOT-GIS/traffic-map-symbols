<template>
  <div id="alert_container">
    <b>ALERT: {{ alert.title }}</b>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AlertInfo from "@/types/AlertInfo";

export default defineComponent({
  props: {
    alert: {
      required: true,
      type: Object as PropType<AlertInfo>,
    },
  },
});
</script>

<style scoped>
div#alert_container {
  padding: 5px;
  background-color: orange;
}
</style>
