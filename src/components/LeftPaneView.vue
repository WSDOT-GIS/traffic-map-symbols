<template>
  <transition name="left-pane-slide">
    <div
      id="map-top-left-container"
      v-if="isOpen"
      class="w3-container w3-padding-small w3-card w3-white w3-col"
      :style="{ maxHeight: maxHeight + 'px' }"
    >
      <div class="w3-display-container w3-border-0">
        <div class="map-left-panel-title"><h5>Map Legend</h5></div>
        <div class="map-left-panel-close-btn w3-button" @click="toggleDisplay">
          <svg
            id="expand"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 32 32"
            class="svg-icon"
          >
            <path
              d="M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z" style="fill:#4a5157"
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
    class="w3-container w3-padding-small w3-card w3-white w3-button"
    @click="toggleDisplay"
  >
    <label class="map-left-panel-title-closed">Map Legend</label>
    <svg
      id="expand"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 32 32"
      class="svg-icon"
      
    >
      <path d="M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z" style="fill:#4a5157" />
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";
import LayerListView from "./LayerListView.vue";
import SavedMapView from "./SavedMapView.vue";
import { isMobile } from "@/utils/mediaUtil";

export default defineComponent({
  components: { LayerListView, SavedMapView },
  setup() {
    const store = useStore();
    const mapSize = computed(() => store.state.mapSize);
    const maxHeight = ref(mapSize.value.height);
    watch(mapSize, (size) => {
      maxHeight.value = size.height;
    });
    // If it is on small device, close it by default.
    const isOpen = ref(!isMobile());

    const toggleDisplay = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, maxHeight, toggleDisplay };
  },
});
</script>

<style scoped>
#map-top-left-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  overflow-y: none;
  border: 1px solid var(--color-gray20);
}
#map-top-left-container-closed {
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: none;
  border-radius: 4px;
  border: 1px solid var(--color-gray20);
  background-color: #fff;
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
.map-left-panel-close-btn {
  position: absolute;
  top: 5px;
  right: 0;
  transform: translate(60%, -50%);
  padding: 1px 8px;
  border-radius: 4px;
  border: 1px solid var(--color-gray20);
  background-color: #fff;  
}
.map-left-panel-title {
  margin-right: 20px;
  font-size: var(--type-scale-base4);
  line-height: var(--type-scale-base6);
  font-weight: var(--font-weight-heavy);
  margin-bottom: 0;
}
.map-left-panel-title-closed {
  margin-right: 20px;
  font-size: var(--type-scale-base4);
  line-height: var(--type-scale-base6);
  font-weight: var(--font-weight-heavy);
}
@media screen and (max-width: 601px) {
  #map-top-left-container {
    width: 100%;
  }
  .map-left-panel-close-btn {
    transform: translate(30%, -50%);
  }
}
</style>

