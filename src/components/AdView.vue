<template>
  <div id="ad_container" class="w3-container">
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
#ad_container {
  color: tomato;
  background-color: teal;
  height: 50px;
}
/* p {
  margin: 0;
  padding: 5px;
} */
</style>
