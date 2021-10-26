<template>
  <div id="savedMapWidget" class="w3-left-align">
    <h6 id="saved-map-list-title">My saved maps</h6>
    <ul id="saved-map-list-container" class="w3-ul">
      <li
        v-for="(item, index) in mapList"
        :key="index"
        class="w3-border-0"
        style="padding: 0"
        ref="itemContainerRef"
      >
        <button
          :title="'Show ' + item.t"
          class="saved-map-title w3-btn w3-transparent"
          :class="{
            'saved-map-title-selected': item.s,
          }"
          :style="{ width: itemTitleWidth }"
          @click="selectItem($event, item)"
        >
          {{ item.t }}
        </button>
        <button
          :title="'Delete ' + item.t"
          :aria-label="'Delete ' + item.t"
          class="w3-right w3-button saved-map-remove-btn"
          @click="removeItem($event, item)"
          ref="closeButtonRef"
        >
          &times;
        </button>
      </li>
    </ul>
    <WsdotButtonView Caption="Save this map" @click="showForm" />
    <SaveMapFormView
      :Visible="formVisible"
      @ok-save-map-form="addItem($event)"
      @close-save-map-form="closeForm"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUpdated, ref, watch } from "vue";

import SavedMapInfo from "@/types/SavedMapInfo";
import { setCookie, getCookie } from "@/utils/cookieUtil";
import { cloneProxyTarget, useStore } from "@/store";
import WsdotButtonView from "@/components/WsdotButtonView.vue";
import SaveMapFormView from "@/components/SaveMapFormView.vue";

import { validateBasemapName } from "@/layers/Basemaps";
import { isMobile } from "@/utils/mediaUtil";
import { defaultLayerProps } from "@/esri-stuff/esriMap";

export default defineComponent({
  components: { WsdotButtonView, SaveMapFormView },
  props: {
    IsOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    console.log("** Top ** " + props.IsOpen);
    const store = useStore();
    const itemContainerRef = ref<HTMLElement>();
    const closeButtonRef = ref<HTMLElement>();
    const itemTitleWidth = ref("80%");
    const formVisible = ref(false);
    const cookieName = "savedmaps";
    const cookieText = getCookie(cookieName);
    const mapList = ref<SavedMapInfo[]>([]);
    if (cookieText) {
      const json = JSON.parse(cookieText);
      mapList.value = json as SavedMapInfo[];
    }
    mapList.value.forEach((each) => {
      each.s = false;
    });
    // Resize the list after the component is loaded or updated...
    onUpdated(() => {
      if (mapList.value.length > 0) {
        nextTick(() => {
          resizeItemTitle();
        });
      }
    });
    onMounted(() => {
      // On the mobile, onUpdated is not triggered initially since the left pane is closed by default.
      // On the big screen, onMounted seems to happen too early and it does not size correctly, so do not handle this.
      if (isMobile()) {
        if (mapList.value.length > 0) {
          nextTick(() => {
            resizeItemTitle();
          });
        }
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
        const w = itemContainerRef.value.offsetWidth - closeButtonRef.value.offsetWidth - 3; // Without this the close button will still wrap. 1 works too, but made it 3 to make sure.
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
      store.commit("setCurrentExtent", cloneProxyTarget(item.e));
      const layerListCookie = cloneProxyTarget(item.l);
      // Set layer visibilities...
      store.state.layerList.forEach((eachInfo) => {
        // Check cookie...
        const lyrCookie = layerListCookie.find((eachCookie) => {
          return eachInfo.id === eachCookie.i;
        });
        if (lyrCookie) {
          eachInfo.visible = lyrCookie.v;
        } else {
          // Not in cookie, so apply default...
          const defaultProp = defaultLayerProps.find((eachProp) => {
            return eachInfo.id === eachProp.id;
          });
          if (defaultProp) {
            eachInfo.visible = defaultProp.visible;
          }
        }
      });
      store.commit("setLayerList", store.state.layerList);
      // Set basemap...
      if (validateBasemapName(item.b)) {
        store.commit("setBasemap", item.b);
      }
      // Set the "selected" property...
      mapList.value.forEach((each) => {
        each.s = false;
      });
      item.s = true;
    };

    const addItem = (newTitle: string) => {
      mapList.value.forEach((each) => {
        each.s = false;
      });
      // Saving only the ID and visibility of each layer if visibility is set to non-default value...
      const layerListCopy = cloneProxyTarget(store.state.layerList);
      const layerListFilter = layerListCopy.filter((eachInfo) => {
        const defaultProp = defaultLayerProps.find((eachProp) => {
          return eachProp.id === eachInfo.id;
        });
        if (defaultProp) {
          return eachInfo.visible !== defaultProp.visible;
        } else {
          return false;
        }
      });
      const layerList = layerListFilter.map((eachInfo) => {
        return { i: eachInfo.id, v: eachInfo.visible };
      });
      mapList.value.push({
        t: newTitle.trim(),
        // removing reactivity so the saved state is not tied to the store state...
        e: cloneProxyTarget(store.state.currentExtent),
        l: layerList,
        b: store.state.basemap,
        s: true,
      });
      const value = JSON.stringify(mapList.value);
      setCookie(cookieName, value);
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
      setCookie(cookieName, value);
    };

    return {
      mapList,
      formVisible,
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
#savedMapWidget {
  margin: 16px 0 50px 0;
}
#savedMapWidget h6 {
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-heavy);
  text-align: left;
}
a {
  cursor: pointer;
}
button {
  padding: 1px 0;
}
.saved-map-item {
  width: 100%;
}
.saved-map-title {
  font-size: var(--type-scale-base3);
  line-height: var(--type-scale-base7);
  font-weight: var(--font-weight-normal);
  color: var(--color-primaryBrand100);
  text-decoration: underline var(--color-primaryBrand100);
  text-align: left;
}
.saved-map-title-selected {
  color: var(--color-secondaryBrandDark);
  text-decoration-color: var(--color-secondaryBrandDark);
}
.saved-map-remove-btn {
  background-color: var(--color-gray20);
  border:none;
  color: var(--color-gray100);
  font-size: var(--type-scale-base0);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base-2);
  text-align: center;
  border-radius: 50%;
  width:  var(--type-scale-base0);
  height:  var(--type-scale-base0);
  padding:0.1rem;

}
</style>


