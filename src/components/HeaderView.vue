<template>
  <header class="w3-container">{{ text }}</header>
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
header {
  padding: 5px;
  color: white;
  background-color: gray;
}
</style>
