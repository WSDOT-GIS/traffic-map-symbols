<template>
  <div class="top right ontop">
    <h3>My saved maps</h3>
    <table>
        <tr v-for="(eachMap, index) in mapList" :key="index">
            <td>{{eachMap.title}}</td>
        </tr>
    </table>
    <button>Save current map view</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SavedMapInfo from "@/types/SavedMapInfo";
// import ExtentInfo from "@/types/ExtentInfo";
// import LayerInfo from "@/types/LayerInfo";

export default defineComponent({
  setup() {
    const mapList = ref<SavedMapInfo[]>([
      {
        title: "test 1",
        extent: {
          xmin: -13690939.537010245,
          xmax: -13666569.30389912,
          ymin: 5935927.002373494,
          ymax: 5949179.247262843,
        },
        layers: [],
      },
      {
        title: "test 2",
        extent: {
          xmin: -13604963.712901168,
          xmax: -13598167.95639842,
          ymin: 6043726.623441402,
          ymax: 6047422.075551856,
        },
        layers: [],
      },
    ]);
    return { mapList };
  },
});
</script>
