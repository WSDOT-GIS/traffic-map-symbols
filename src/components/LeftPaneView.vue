<template>
  <transition name="left-pane-slide">
    <div
      id="map-top-left-container"
      v-if="isOpen"
      class="w3-container w3-padding-small w3-card w3-white w3-col m4 l2"
    >
      <div class="w3-display-container w3-padding-small w3-border-0">
        <label class="w3-large">Map Features</label>
        <div
          class="w3-button w3-transparent w3-display-right"
          @click="toggleDisplay"
        >
          <svg
            id="expand"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 32 32"
            class="svg-icon"
          >
            <path
              d="M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z"
            />
          </svg>
        </div>
      </div>
      <hr class="horizontal-divider" />
      <LayerListView />
      <hr class="horizontal-divider" />
      <SavedMapView />
    </div>
  </transition>
  <div
    v-if="!isOpen"
    id="map-top-left-container-closed"
    class="z1 w3-container w3-padding-small w3-card w3-white w3-button"
    @click="toggleDisplay"
  >
    <label class="w3-medium">Map Features</label>
    <svg
      id="expand"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 32 32"
      class="svg-icon"
    >
      <path
        d="M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LayerListView from "./LayerListView.vue";
import SavedMapView from "./SavedMapView.vue";

export default defineComponent({
  components: { LayerListView, SavedMapView },
  setup() {
    // If it is on small device, close it by default.
    const isOpen = ref(window.innerWidth > 400);

    const toggleDisplay = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, toggleDisplay };
  },
});
</script>

<style scoped>
#map-top-left-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
#map-top-left-container-closed {
  position: absolute;
  top: 0;
  left: 0;
}
.left-pane-slide-enter-active,
.left-pane-slide-leave-active {
  transition: transform 0.2s ease;
}
.left-pane-slide-enter-from,
.left-pane-slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}
label {
  margin-right: 20px;
}
</style>

