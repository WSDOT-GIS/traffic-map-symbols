<template>
  <div id="wsdot-header" class="w3-container">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      require: true,
      type: String,
    },
  },
});
</script>

<style scoped>
#wsdot-header {
  padding: 5px;
  color: white;
  background-color: var(--color-primaryBrand100);
  min-height: 60px;
}
</style>
