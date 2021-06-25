<template>
  <div id="savedMapWidget" :style="{display:mapFeaturesExpanded}">
    <hr class="horizontal-divider" />
    <div id="saved-map-list-title">My saved maps</div>
    <div id="saved-map-list-container">
      <div
        v-for="(item, index) in mapList"
        :key="index"
        class="saved-map-item-container"
      >
        <a
          class="saved-map-item"
          :class="{
            'saved-map-item-selected': item.selected,
            'saved-map-item-unselected': !item.selected,
          }"
          @click="selectItem($event, item)"
        >
          {{ item.title }}
        </a>

        <svg
          @click="removeItem($event, item)"
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 32 32"
          class="svg-icon saved-map-item-remove svg-icon-red"
        >
          <path
            d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"
          />
        </svg>
      </div>
    </div>
    <hr class="horizontal-divider" />
    <form @submit.prevent="addItem" id="save-map-form">
      <input
        title="Input Map Name"
        type="text"
        v-model="newMapTitle"
        id="new-map-title"
        placeholder="map view title"
      />
      <button id="save-map-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
          class="svg-icon"
          id="save-map-button-icon"
        >
          <path
            d="M16.047.447c-8.615 0-15.6 6.982-15.6 15.6 0 8.615 6.984 15.599 15.6 15.599 8.617 0 15.6-6.984 15.6-15.599 0-8.617-6.982-15.6-15.6-15.6zm0 28.799c-7.279 0-13.199-5.92-13.199-13.199s5.92-13.2 13.199-13.2 13.199 5.921 13.199 13.2-5.92 13.199-13.199 13.199zM18 14V6h-4v8H6v4h8v8h4v-8h8v-4z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SavedMapInfo from "@/types/SavedMapInfo";
import { setCookie, getCookie } from "@/utils/cookieUtil";
import { cloneProxyTarget } from "@/store";
import { mapState } from "vuex";
export default defineComponent({
  setup() {
    const cookieText = getCookie("saved-map-list");
    const mapList = ref<SavedMapInfo[]>([]);
    if (cookieText) {
      const json = JSON.parse(cookieText);
      mapList.value = json as SavedMapInfo[];
    }
    mapList.value.forEach((each) => {
      each.selected = false;
    });
    return { mapList };
  },
  data() {
    return {
      newMapTitle: "",
    };
  },
  computed:{
    ...mapState(["mapFeaturesExpanded"])
  },
  validations: {},
  methods: {
    selectItem(event: Event, item: SavedMapInfo) {
      // Removing the reactivity so the saved state is not altered by store state changes...
      this.$store.commit("setCurrentExtent", cloneProxyTarget(item.extent));
      this.$store.commit("setLayerList", cloneProxyTarget(item.layers));
      console.log("SavedMapView selectItem setLayerList");
      this.$store.commit("setBasemap", item.basemap);
      this.mapList.forEach((each) => {
        each.selected = false;
      });
      item.selected = true;
    },

    addItem() {
      this.mapList.forEach((each) => {
        each.selected = false;
      });
      if (this.newMapTitle) {
        this.mapList.push({
          title: this.newMapTitle,
          // removing reactivity so the saved state is not tied to the store state...
          extent: cloneProxyTarget(this.$store.state.currentExtent),
          layers: cloneProxyTarget(this.$store.state.layerList),
          basemap: this.$store.state.basemap,
          selected: true,
        });
        const value = JSON.stringify(this.mapList);
        setCookie("saved-map-list", value);
        this.newMapTitle = "";
      }
    },

    removeItem(event: Event, item: SavedMapInfo) {
      console.log(item.title);
      const idx = this.mapList.findIndex((eachItem) => {
        if (eachItem == item) {
          return true;
        }
      });
      this.mapList.splice(idx, 1);
      const value = JSON.stringify(this.mapList);
      setCookie("saved-map-list", value);
    },
  },
});
</script>

<style scoped>
#savedMapWidget {
  background-color: white;
  text-align: left;
  width: 100%;
}
#saved-map-list-title {
  display: block;
  padding: 0 5px;
  font-size: medium;
}

.saved-map-item-container {
  position: relative;
}
.saved-map-item {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  font-size: small;
  margin: 2px 5px;
}

.saved-map-item:hover {
  color: red;
}

.saved-map-item-selected {
  color: blue;
}

.saved-map-item-unselected {
  color: #4a4a4a;
}

.saved-map-item-remove {
  position: absolute;
  right: 10%;
  top: 30%;
}
#save-map-form {
  position: relative;
  margin: 5px 5px;
}
#save-map-button {
  display: inline-block;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  position: absolute;
}

#new-map-title {
  display: inline-block;
  width: 100px;
  margin-left: 3px;
}
</style>


