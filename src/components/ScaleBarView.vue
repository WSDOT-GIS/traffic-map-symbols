<!--Code for reusing esri default elements in vue component-->

<template>
    <div id="scalebar-widget-container">
      <div id="text" class="scaleBar" ref="ruler"></div>
      <div id="text" class="scaleBar" ref="line"></div>
    </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, onMounted, ref } from "vue";
import {mapView} from "@/esri-stuff/esriMap"
import ScaleBar from "@arcgis/core/widgets/ScaleBar"
/* eslint @typescript-eslint/no-var-requires: "off" */
export default defineComponent({
  components: {  },
  setup() {
    const ruler = ref<HTMLDivElement>()
    const line = ref<HTMLDivElement>()
    onMounted(()=>{
      const scaleBar = new ScaleBar({
        view:mapView,
        container:ruler.value,
        style:"ruler"
      })
      const scaleBar2 = new ScaleBar({
        view:mapView,
        container:line.value,
        style: "line"
      })
    })
    return {
      ruler,
      line
    };
  },
});
</script>
 <style scoped>
/*Defines the style of the basemap picker*/
#scalebar-widget-container{
  height: 100px;
  width: 200px;
  outline: 1pt solid red;
}
.scaleBar{
  padding: 5px 0px 0px 5px
}
</style>
