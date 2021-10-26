<template>
  <div class="w3-modal" :style="{ display: displayState }">
    <div class="w3-modal-content">
      <div class="modal-content-container w3-card">
        <header class="w3-container w3-display-container">
          {{ Title }}
          <span
            class="close-button w3-button w3-transparent w3-display-right"
            @click="onClose"
            >&times;</span
          >
        </header>
        <div class="w3-panel">
          <slot></slot>
          <div
            class="w3-panel w3-pale-red w3-text-red"
            v-if="WarningMsg.length > 0"
          >
            {{ WarningMsg }}
          </div>
          <div>
            <WsdotButtonView :Caption="OkCaption" @click="onOk" />
            <WsdotButtonView
              Caption="Cancel"
              :IsWhite="true"
              @click="onClose"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import WsdotButtonView from "@/components/WsdotButtonView.vue";

export default defineComponent({
  components: { WsdotButtonView },
  props: {
    Title: {
      type: String,
      required: true,
    },
    Visible: {
      type: Boolean,
      required: true,
    },
    OkCaption: {
      type: String,
      required: true,
    },
    WarningMsg: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const visible = toRefs(props).Visible;
    const displayState = ref("none");
    watch(visible, (newValue) => {
      displayState.value = newValue ? "block" : "none";
    });
    const onClose = () => {
      context.emit("close-modal");
    };
    const onOk = () => {
      context.emit("ok-modal");
    };
    return { displayState, onClose, onOk };
  },
});
</script>
<style scoped>
header {
  background-color: #33957f;
  color: #fff;
  height: 2em;
  display: flex;
  align-items: center;
}
button {
  float: left;
}
.close-button {
  height: 100%;
  display: flex;
  align-items: center;
}
.modal-content-container {
  padding-bottom: 1px;
}
</style>