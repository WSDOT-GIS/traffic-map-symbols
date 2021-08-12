<template>
  <div id="savedMapWidget" class="w3-left-align">
    <div id="saved-map-list-title w3-medium">My saved maps</div>
    <ul id="saved-map-list-container" class="w3-ul">
      <li
        v-for="(item, index) in mapList"
        :key="index"
        class="w3-border-0"
        style="padding: 0"
        ref="itemContainerRef"
      >
        <button
          :title="'Show ' + item.title"
          class="saved-map-title w3-btn w3-transparent"
          :class="{
            'w3-text-blue': item.selected,
            'w3-text-dark-grey': !item.selected,
          }"
          :style="{ width: itemTitleWidth }"
          @click="selectItem($event, item)"
        >
          {{ item.title }}
        </button>
        <button
          :title="'Delete ' + item.title"
          :aria-label="'Delete ' + item.title"
          class="w3-right w3-button w3-transparent"
          @click="removeItem($event, item)"
          ref="closeButtonRef"
        >
          &times;
        </button>
      </li>
    </ul>
    <WsdotButtonView Caption="Save This Map" @click="showForm" />
    <SaveMapFormView
      :Visible="formVisible"
      @ok-save-map-form="addItem($event)"
      @close-save-map-form="closeForm"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onUpdated,
  ref,
  watch,
} from "vue";

import SavedMapInfo from "@/types/SavedMapInfo";
import { setCookie, getCookie } from "@/utils/cookieUtil";
import { cloneProxyTarget, useStore } from "@/store";
import WsdotButtonView from "@/components/WsdotButtonView.vue";
import SaveMapFormView from "@/components/SaveMapFormView.vue";
import LayerInfo from "@/types/LayerInfo";
import { validateBasemapName } from "@/layers/Basemaps";

export default defineComponent({
  components: { WsdotButtonView, SaveMapFormView },
  setup() {
    const store = useStore();
    const itemContainerRef = ref<HTMLElement>();
    const closeButtonRef = ref<HTMLElement>();
    const itemTitleWidth = ref("0");
    const formVisible = ref(false);
    const newMapTitle = ref("");
    const cookieText = getCookie("saved-map-list");
    const mapList = ref<SavedMapInfo[]>([]);
    if (cookieText) {
      const json = JSON.parse(cookieText);
      mapList.value = json as SavedMapInfo[];
    }
    mapList.value.forEach((each) => {
      each.selected = false;
    });
    // Resize the list after the component is loaded or updated...
    onUpdated(() => {
      if (mapList.value.length > 0) {
        nextTick(() => {
          resizeItemTitle();
        });
      }
    });
    // Resize the list content when the screen size changes...
    const mapSize = computed(() => store.state.mapSize);
    watch(mapSize, () => {
      resizeItemTitle();
    });
    // Set the width of the item title button so the remove button won't wrap.
    const resizeItemTitle = () => {
      if (itemContainerRef.value && closeButtonRef.value) {
        const w =
          itemContainerRef.value.offsetWidth -
          closeButtonRef.value.offsetWidth -
          3; // Without this the close button will still wrap. 1 works too, but made it 3 to make sure.
        itemTitleWidth.value = w + "px";
      }
    };
    resizeItemTitle();
    const showForm = () => {
      formVisible.value = true;
    };
    const closeForm = () => {
      formVisible.value = false;
    };
    const selectItem = (event: Event, item: SavedMapInfo) => {
      // Removing the reactivity so the saved state is not altered by store state changes...
      store.commit("setCurrentExtent", cloneProxyTarget(item.extent));
      const layerList: LayerInfo[] = cloneProxyTarget(item.layers);
      if (layerList.length === store.state.layerList.length) {
        store.commit("setLayerList", cloneProxyTarget(item.layers));
      }
      if (validateBasemapName(item.basemap)) {
        store.commit("setBasemap", item.basemap);
      }
      mapList.value.forEach((each) => {
        each.selected = false;
      });
      item.selected = true;
    };

    const addItem = (newTitle: string) => {
      mapList.value.forEach((each) => {
        each.selected = false;
      });
      mapList.value.push({
        title: newTitle.trim(),
        // removing reactivity so the saved state is not tied to the store state...
        extent: cloneProxyTarget(store.state.currentExtent),
        layers: cloneProxyTarget(store.state.layerList),
        basemap: store.state.basemap,
        selected: true,
      });
      const value = JSON.stringify(mapList.value);
      setCookie("saved-map-list", value);
      closeForm();
    };

    const removeItem = (event: Event, item: SavedMapInfo) => {
      //console.log(item.title);
      const idx = mapList.value.findIndex((eachItem) => {
        if (eachItem == item) {
          return true;
        }
      });
      mapList.value.splice(idx, 1);
      const value = JSON.stringify(mapList.value);
      setCookie("saved-map-list", value);
    };

    return {
      mapList,
      formVisible,
      newMapTitle,
      itemContainerRef,
      closeButtonRef,
      itemTitleWidth,
      showForm,
      closeForm,
      selectItem,
      addItem,
      removeItem,
    };
  },
});
</script>

<style scoped>
a {
  cursor: pointer;
}
button {
  padding: 1px 1em;
}
.saved-map-item {
  width: 100%;
}
.saved-map-title {
  text-align: left;
}
.remove-saved-map-button {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>


