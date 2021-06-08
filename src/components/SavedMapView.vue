<template>
  <div id="saved-maps" class="top right ontop">
    <div class="list-title">My saved maps</div>
    <div class="list-group">
      <a
        class="saved-map-item saved-map-item-unselected"
        v-for="(item, index) in mapList"
        :key="index"
        @click="updateSelected($event, item)"
      >
        {{ item.title }}
      </a>
    </div>

    <button @click="saveList">Save current map view</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SavedMapInfo from "@/types/SavedMapInfo";
import { setCookie, getCookie } from "@/utils/cookieUtil";

export default defineComponent({
  setup() {
    const cookieText = getCookie("saved-map-list");
    let mapList: SavedMapInfo[] = [];
    if (cookieText) {
      const json = JSON.parse(cookieText);
      mapList = json as SavedMapInfo[]
    }
    // const mapList = ref<SavedMapInfo[]>([
    //   {
    //     title: "test 1",
    //     extent: {
    //       xmin: -13690939.537010245,
    //       xmax: -13666569.30389912,
    //       ymin: 5935927.002373494,
    //       ymax: 5949179.247262843,
    //     },
    //     layers: [],
    //   },
    //   {
    //     title: "test 2",
    //     extent: {
    //       xmin: -13604963.712901168,
    //       xmax: -13598167.95639842,
    //       ymin: 6043726.623441402,
    //       ymax: 6047422.075551856,
    //     },
    //     layers: [],
    //   },
    //   {
    //     title: "test 3",
    //     extent: {
    //       xmin: -13604963.712901168,
    //       xmax: -13598167.95639842,
    //       ymin: 6043726.623441402,
    //       ymax: 6047422.075551856,
    //     },
    //     layers: [],
    //   },
    // ]);
    return { mapList };
  },
  methods: {
    updateSelected(event: Event, item: SavedMapInfo) {
      console.log(item);
      this.$store.commit("setCurrentExtent", item.extent);
      const element = event.target as HTMLElement;
      const siblings =
        element.parentElement?.getElementsByClassName("saved-map-item");
      if (siblings) {
        for (let i = 0; i < siblings.length; i++) {
          siblings[i].classList.remove("saved-map-item-selected");
          siblings[i].classList.add("saved-map-item-unselected");
        }
      }
      element.classList.remove("saved-map-item-unselected");
      element.classList.add("saved-map-item-selected");
    },

    saveList() {
      const value = JSON.stringify(this.mapList);
      setCookie("saved-map-list", value);
    },
  },
});
</script>

<style scoped>
.list-title {
  display: block;
  font-weight: bold;
}

.saved-map-item {
  display: block;
  text-decoration: none;
  margin: 0.2em;
  cursor: pointer;
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
</style>
