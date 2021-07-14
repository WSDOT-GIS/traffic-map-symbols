<template>
  <div id="savedMapWidget" class="w3-left-align">
    <div id="saved-map-list-title w3-medium">My saved maps</div>
    <ul id="saved-map-list-container" class="w3-ul">
      <li
        v-for="(item, index) in mapList"
        :key="index"
        class="
          saved-map-item-container
          w3-display-container w3-hover-shadow w3-padding-small w3-border-0
        "
      >
        <a
          class="saved-map-item"
          :class="{
            'saved-map-item-selected w3-text-blue': item.selected,
            'saved-map-item-unselected w3-text-dark-grey': !item.selected,
          }"
          @click="selectItem($event, item)"
        >
          {{ item.title }}
        </a>
        <span
          class="
            remove-saved-map-button
            w3-button w3-transparent w3-display-right
          "
          @click="removeItem($event, item)"
        >
          &times;
        </span>
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
import { defineComponent, ref } from "vue";

import SavedMapInfo from "@/types/SavedMapInfo";
import { setCookie, getCookie } from "@/utils/cookieUtil";
import { cloneProxyTarget, useStore } from "@/store";
import WsdotButtonView from "@/components/WsdotButtonView.vue";
import SaveMapFormView from "@/components/SaveMapFormView.vue";

export default defineComponent({
  components: { WsdotButtonView, SaveMapFormView },
  setup() {
    const store = useStore();
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
    const showForm = () => {
      formVisible.value = true;
      console.log("showForm: " + formVisible.value);
    };
    const closeForm = () => {
      formVisible.value = false;
    };
    const selectItem = (event: Event, item: SavedMapInfo) => {
      // Removing the reactivity so the saved state is not altered by store state changes...
      store.commit("setCurrentExtent", cloneProxyTarget(item.extent));
      store.commit("setLayerList", cloneProxyTarget(item.layers));
      console.log("SavedMapView selectItem setLayerList");
      store.commit("setBasemap", item.basemap);
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
      console.log(item.title);
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
.remove-saved-map-button {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>


