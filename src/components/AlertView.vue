<template>
  <div
    id="alert-container-open"
    :style="{ display: displayStyle }"
    class="w3-modal"
  >
    <div
      class="w3-modal-content w3-card w3-left-align alert-content"
      :style="{ maxHeight: height }"
      ref="containerRef"
    >
      <div class="alert-header">
        <div class="alert-banner">
          <div class="alert-banner-icon">
            <div v-html="iconBanner?.paths" width="24" height="24"></div>
          </div>
          <span class="alert-banner-text"
            >{{ Alerts.length > 1 ? Alerts.length : "" }} Emergency Alert{{
              Alerts.length > 1 ? "s" : ""
            }}</span
          >
        </div>
        <button
          class="alert-close-button w3-button w3-display-right"
          @click="toggleDisplay"
        >
          &times;
        </button>
      </div>
      <div
        class="alert-message-container w3-container"
        v-for="(item, index) in sortedAlerts"
        :key="index"
      >
        <div class="alert-title">{{ item.HeadlineMessage }}</div>
        <div>{{ item.ExtendedMessage }}</div>
        <div>
          <span class="alert-row-key">Last updated: </span>
          <span class="popup-value">{{
            formatEpoch(item.LastModifiedDate, true)
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="!isOpen"
    id="alert-container-closed"
    class="w3-transparent w3-button"
    @click="toggleDisplay"
  >
    <div v-html="iconButton?.paths" class="alert-button"></div>
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
import { formatEpoch } from "@/utils/miscUtil";
import { otherIcons } from "@/symbols/IconDefinitions";
import { isSmallMedia } from "@/utils/mediaUtil";

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
    const sortedAlerts = ref<AlertInfo[]>([]);
    const displayStyle = ref("none");
    const height = ref("auto");
    const iconBanner = otherIcons.find((item) => {
      return item.id === "statewide-alert-banner";
    });
    const iconName = isSmallMedia()
      ? "statewide-alert-button-small"
      : "statewide-alert-button";
    const iconButton = otherIcons.find((item) => {
      return item.id === iconName;
    });

    watch(props, () => {
      // Sort by priority ID...
      sortedAlerts.value = [...props.Alerts];
      sortedAlerts.value.sort((a, b) => {
        return a.EventPriorityID - b.EventPriorityID;
      });
      setDisplayStyle();
    });
    onUpdated(() => {
      resizeContainer();
    });

    watch(mapSize, () => {
      resizeContainer();
    });
    const resizeContainer = () => {
      if (!containerRef.value) {
        return;
      }
      const top = containerRef.value.offsetTop;
      const h = mapSize.value.height - top * 2;
      height.value = h + "px";
      console.log(
        height.value + " top:" + top + " map height:" + mapSize.value.height
      );
    };
    const toggleDisplay = () => {
      isOpen.value = !isOpen.value;
      setDisplayStyle();
    };
    const setDisplayStyle = () => {
      displayStyle.value =
        isOpen.value && props.Alerts.length > 0 && props.Alerts[0]
          ? "block"
          : "none";
    };
    return {
      containerRef,
      height,
      isOpen,
      sortedAlerts,
      toggleDisplay,
      displayStyle,
      formatEpoch,
      iconBanner,
      iconButton,
    };
  },
});
</script>

<style scoped>
#alert-container-closed {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 5px 0 0;
}

.alert-button {
  -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.4));
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.4));
}

.alert-content {
  width: 626px;
  overflow-y: auto;
}

.alert-banner {
  background-color: var(--color-error);
  left: 0;
  display: inline-block;
  width: 50%;
  margin: 17px 0;
  padding: 0.7em 0.2em;
  color: #000;
  border-radius: 0px 4px 4px 0px;
  font-family: Lato;
  font-weight: 700;
  font-size: 22px;
  line-height: 16px;
}

@media screen and (max-width: 695px) {
  .alert-content {
    width: 90%;
  }
  .alert-banner {
    width: 80%;
  }
}

.alert-banner-icon {
  vertical-align: middle;
  display: inline-block;
  height: 24px;
  width: 24px;
}
.alert-banner-text {
  padding: 0 5px;
  vertical-align: middle;
  font-weight: 700;
}

.alert-message-container {
  margin: 0 1.5em 1em;
  text-align: left;
}

.alert-title {
  font-family: Lato;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
}

.alert-close-button {
  position: absolute;
  top: 21px;
  border-style: none;
  background-color: transparent;
  font-size: 1.5em;
  vertical-align: top;
}

.alert-row {
  text-align: left;
  margin-bottom: 8px;
}
.alert-row-key {
  font-weight: bold;
}
</style>
