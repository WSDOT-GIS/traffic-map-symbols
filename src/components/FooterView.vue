<template>
  <footer class="w3-container">{{ text }}</footer>
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
footer {
  color: white;
  background-color: #005151;
}
</style>
