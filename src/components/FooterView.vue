<template>
  <footer>{{ text }}</footer>
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
  padding: 5px;
  color: white;
  background-color: grey;
}
</style>
