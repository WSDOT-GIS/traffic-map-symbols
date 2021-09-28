<template>
  <div id="ad_container" class="w3-content">
    <p>Placeholder for advertisement</p>
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
  color: var(--color-gray100);
  background-color: var(--color-gray40);
  height: 90px;
  width: 728px;
}
@media screen and (max-width: 727px) {
  #ad_container {
    height: 50px;
    width: 320px;
  }
}
p {
  margin: 0;
  padding: 5px;
}
</style>
