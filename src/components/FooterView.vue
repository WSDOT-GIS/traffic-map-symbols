<template>
  <div id="wsdot-footer" class="w3-container">{{ text }}</div>
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
#wsdot-footer {
  color: white;
  background-color: var(--color-secondaryBrandDark);
}
</style>
