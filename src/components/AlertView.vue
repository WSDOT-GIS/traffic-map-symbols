<template>
  <transition name="alert-view-slide">
    <div
      id="alert-container-open"
      ref="containerRef"
      v-if="isOpen && Alerts.length > 0 && Alerts[0]"
      class="w3-container w3-card w3-padding-small"
      :style="{ marginLeft: left + 'px' }"
    >
      <div class="alert-message">
        <b>ALERT: {{ sortedAlerts[0]?.HeadlineMessage }}</b>
      </div>
      <button
        class="alert-close-button w3-button w3-padding-small w3-display-right"
        @click="toggleDisplay"
      >
        &times;
      </button>
    </div>
  </transition>
  <div
    v-if="!isOpen"
    id="alert-container-closed"
    class="w3-transparent w3-button"
    @click="toggleDisplay"
  >
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="shadow" color-interpolation-filters="sRGB">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.6" />
      </filter>
      <g filter="url(#shadow)">
        <path
          d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
          fill="#ff0000"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUpdated,
  PropType,
  ref,
  watch,
} from "vue";
import { useStore } from "@/store";
import AlertInfo from "@/types/AlertInfo";

export default defineComponent({
  props: {
    Alerts: {
      required: true,
      type: Object as PropType<Array<AlertInfo>>,
    },
  },
  setup(props) {
    const store = useStore();
    const containerRef = ref<HTMLDivElement>();
    const mapSize = computed(() => store.state.mapSize);
    const isOpen = ref(true);
    const left = ref(0);
    const sortedAlerts = ref<AlertInfo[]>([]);
    watch(props, () => {
      // Sort by priority ID...
      sortedAlerts.value = [...props.Alerts];
      sortedAlerts.value.sort((a, b) => {
        return a.EventPriorityID - b.EventPriorityID;
      });
    });
    onUpdated(() => {
      positionContainer();
    });

    watch(mapSize, () => {
      positionContainer();
    });
    const positionContainer = () => {
      if (!containerRef.value) {
        return;
      }
      const w = containerRef.value.offsetWidth;
      left.value = (mapSize.value.width - w) / 2;
      /*console.log(
        "left: " +
          left.value +
          ", map width: " +
          mapSize.value.width +
          ", width: " +
          w
      );*/
    };
    const toggleDisplay = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      containerRef,
      left,
      isOpen,
      sortedAlerts,
      toggleDisplay,
    };
  },
});
</script>

<style scoped>
#alert-container-open {
  background-color: #ff0000;
  color: #ffffff;
  /* z-index: 10; */
}
#alert-container-closed {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  margin: 5px;
}
.alert-view-slide-enter-active,
.alert-view-slide-leave-active {
  transition: transform 0.2s ease;
}
.alert-view-slide-enter-from,
.alert-view-slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}
.alert-message {
  margin-right: 1.5em;
}
.alert-close-button {
  position: absolute;
  top: 1em;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
