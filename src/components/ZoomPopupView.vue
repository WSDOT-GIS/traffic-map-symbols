<template>
  <div
    id="zoom-popup-container"
    v-if="Visible"
    :style="{ marginTop: PositionY + 'px', marginLeft: PositionX + 'px' }"
    @click="onClick"
  >
    <p>
      <span class="esri-icon-zoom-in-magnifying-glass"></span>
      Zoom to {{ Label }} area
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { zoomOnClick } from "@/esri-stuff/esriMap";
import ExtentInfo from "@/types/ExtentInfo";

export default defineComponent({
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
    ExtentInfo: {
      type: Object as PropType<ExtentInfo>,
      required: true,
    },
  },
  methods: {
    onClick() {
      console.log("Popup onClick");
      zoomOnClick(this.ExtentInfo);
      this.$emit('clicked');
    },
  },
});
</script>

<style scoped>
#zoom-popup-container {
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  z-index: 99;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #808080;
  padding: 5px;
  cursor: zoom-in;
}
</style>
