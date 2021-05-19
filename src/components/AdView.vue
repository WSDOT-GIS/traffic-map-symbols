<template>
  <div id="ad_container">
    <p>{{ text }}</p>
  </div>
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
div#ad_container {
  color: tomato;
  background-color: teal;
  height: 50px;
}
</style>
