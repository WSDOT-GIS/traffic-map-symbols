<template>
  <div
    :style="{ display: displayState }"
    id="map-top-left-container"
    class="
      z1
      w3-collapse
      w3-container
      w3-padding-small
      w3-card
      w3-animate-left
      w3-white
      w3-col
      m3
      l2
    "
  >
    <div class="w3-display-container">
      <label class="w3-large">Map Features</label>
      <svg
        @click="toggleDisplay"
        id="expand"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 32 32"
        class="svg-icon w3-display-right"
      >
        <path :d="expandIconPath" />
      </svg>
    </div>
    <hr class="horizontal-divider" />
    <LayerListView />
    <hr class="horizontal-divider" />
    <SavedMapView />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LayerListView from "./components/LayerListView.vue";
import SavedMapView from "./components/SavedMapView.vue";

export default defineComponent({
  components: { LayerListView, SavedMapView },
  setup() {
    const expandIconPath = ref(
      "M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z"
    );
    const displayState = ref("block");

    const toggleDisplay = () => {
      displayState.value = displayState.value === "block" ? "none" : "block";
      displayState.value == "block"
        ? (expandIconPath.value =
            "M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z")
        : (expandIconPath.value =
            "M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z");
    };
    return { expandIconPath, displayState, toggleDisplay };
  },
});
</script>

