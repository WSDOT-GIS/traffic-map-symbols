<template>
  <div>
    <button
      class="w3-button"
      :class="btnClass"
      :style="{ width: Width, height: Height }"
    >
      {{ Caption }}
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    Caption: {
      type: String,
      required: true,
    },
    IsWhite: {
      type: Boolean,
      default: false,
    },
    Width: {
      type: String,
      required: false,
    },
    Height: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const btnClass = {
      "filled-button": true,
      "not-filled-button": false,
    };
    if (props.IsWhite) {
      btnClass["filled-button"] = false;
      btnClass["not-filled-button"] = true;
    }
    return { btnClass };
  },
});
</script>

<style scoped>
button {
  padding: 4px 16px;
  border-radius: 6px;
  -webkit-transform: skewX(-10deg);
  -moz-transform: skewX(-10deg);
  -ms-transform: skewX(-10deg);
  transform: skewX(-10deg);
  float: left;
  margin: 3px;
}
.filled-button {
  background-color: var(--color-primaryBrand100);
  color: #fff;
  border: 1px solid var(--color-primaryBrand100);
}
.not-filled-button {
  background-color: #fff;
  border: 1px solid var(--color-primaryBrand100);
}
</style>