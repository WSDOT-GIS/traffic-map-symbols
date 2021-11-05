<template>
  <div
    id="zoom-popup-container"
    v-if="Visible"
    :style="{ marginTop: PositionY + 'px', marginLeft: PositionX + 'px' }"
    @click="onClick"
  >
    <p>
      <span class="esri-icon-zoom-in-magnifying-glass"></span>
      Click to zoom to {{ Label }} metro area
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["clicked"],
  props: {
    Visible: {
      type: Boolean,
      requied: true,
    },
    PositionX: {
      type: Number,
      required: true,
    },
    PositionY: {
      type: Number,
      required: true,
    },
    Label: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const onClick = () => {
      context.emit("clicked");
    };
    return { onClick };
  },
});
</script>

<style scoped>
#zoom-popup-container {
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  z-index: 8;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #808080;
  padding: 5px;
  cursor: zoom-in;
}
</style>
