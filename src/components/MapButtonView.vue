<template>
  <button
    class="w3-button w3-border w3-round w3-card-2"
    :style="{ width: Width, height: Height }"
    :aria-label="AriaLabel"
    :title="AriaLabel"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    Height: {
      type: String,
      required: true,
    },
    Width: {
      type: String,
      required: false,
    },
    AriaLabel: {
      type: String,
      required: true,
    },
  },
});
</script>
<style scoped>
button {
  background-color: #fff;
  color: #6e6e6e;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 2px;
  z-index: 9;
}
</style>
