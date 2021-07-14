<template>
  <div id="id01" class="w3-modal" :style="{ display: displayState }">
    <div class="w3-modal-content">
      <div class="w3-card">
        <header class="w3-container w3-display-container w3-blue">
          Header
          <span
            onclick="document.getElementById('id01').style.display='none'"
            class="w3-button w3-transparent w3-display-right"
            >&times;</span
          >
        </header>
        <div class="w3-panel">
          <p>Some text. Some text. Some text.</p>
          <p>Some text. Some text. Some text.</p>

          <WsdotButtonView Caption="Cancel" />
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
    Visible: {
      type: Boolean,
      required: true,
    },
    OkCaption: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const visible = toRefs(props).Visible;
    const displayState = ref("none");
    watch(visible, (newValue) => {
      displayState.value = newValue ? "block" : "none";
    });
    return { displayState };
  },
});
</script>