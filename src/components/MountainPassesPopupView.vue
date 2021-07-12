<template>
  <PopupView :MapX="mapX" :MapY="mapY" ref="popupRef" @close="close">
    <template v-slot:title>
      Mountain Pass{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
        <table>
          <tr><td class="popupKey">Mountian Pass Id</td><td class="popupValue">{{infos["MountainPassId"]}}</td></tr>
          <tr><td class="popupKey">Pass Name</td><td class="popupValue">{{infos["PassName"]}}</td></tr>
          <tr><td class="popupKey">Elevation</td><td class="popupValue">{{infos["Elevation"]}}</td></tr>
          <tr><td class="popupKey">Elevation Unit</td><td class="popupValue">{{infos["ElevationUnit"]}}</td></tr>
          <tr><td class="popupKey">Travel Available</td><td class="popupValue">{{infos["TravelAdvisoryAvailable"]}}</td></tr>
          <tr><td class="popupKey">Latitude</td><td class="popupValue">{{infos["Latitude"]}}</td></tr>
          <tr><td class="popupKey">Longitude</td><td class="popupValue">{{infos["Longitude"]}}</td></tr>
          <tr><td class="popupKey">Temperature</td><td class="popupValue">{{infos["Temperature"]}}</td></tr>
          <tr><td class="popupKey">Temperature Unit</td><td class="popupValue">{{infos["TemperatureUnit"]}}</td></tr>
          <tr><td class="popupKey">Weather</td><td class="popupValue">{{infos["Weather"]}}</td></tr>
          <tr><td class="popupKey">Road Condition</td><td class="popupValue">{{infos["RoadCondition"]}}</td></tr>
          <tr><td class="popupKey">Display Date</td><td class="popupValue">{{infos["DisplayDate"]}}</td></tr>
          <tr><td class="popupKey">Travel Flag</td><td class="popupValue">{{infos["TravelAdvisoryFlag"]}}</td></tr>
          <tr><td class="popupKey">Travel Direction 1</td><td class="popupValue">{{infos["TravelDirection1"]}}</td></tr>
          <tr><td class="popupKey">Public Message 1</td><td class="popupValue">{{infos["PublicMessage1"]}}</td></tr>
          <tr><td class="popupKey">Travel Direction 2</td><td class="popupValue">{{infos["TravelDirection2"]}}</td></tr>
          <tr><td class="popupKey">Public Message 2</td><td class="popupValue">{{infos["PublicMessage2"]}}</td></tr>

        </table>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PopupView from "./PopupView.vue";
import { mapView } from "@/esri-stuff/esriMap";
import MountainPassesLayer from "@/layers/MountainPassesLayer";
import {getMountainPassesInfoById} from "@/layers/MountainPassesLayer";
import Point from "@arcgis/core/geometry/Point";
import MountainPassesInfo from "@/types/MountainPassesInfo";

export default defineComponent({
  components: { PopupView },
  setup() {
    // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const mapX = ref(0);
    const mapY = ref(0);
    const infos = ref<MountainPassesInfo>();

    const show = (pt: Point, MountainPassesInfos: MountainPassesInfo) => {
        mapX.value = pt.x;
        mapY.value = pt.y;
        infos.value = MountainPassesInfos;
    };
    // Setting XY to 0 closes the popup...
    const close = () => {
      mapX.value = 0;
      mapY.value = 0;
      infos.value;
    };

    const onImageLoaded = () => {
      popupRef.value?.adjustPositionSize();
    };
    // MapView click event handler...
    mapView.on("click", (event) => {
      // Check if Lineer is over one of the zoom extents...
      const opts = {
        include: [MountainPassesLayer],
      };
      mapView.hitTest(event, opts).then((response) => {
       if (response.results.length) {
            // Show custom popup...
            const g = response.results[0].graphic;
            const pt = g.geometry as Point;
            const MountainPassId = g.getObjectId();
            getMountainPassesInfoById(MountainPassId).then((results) => {
                results ? show(pt, results) : close();
            });
        }
      });
    });
    return {
      popupRef,
      mapX,
      mapY,
      infos,
      close,
      onImageLoaded,
    };
  },
});
</script>

<style scoped>
.camera-popup-img {
  max-width: 100%;
}
.popupKey{
    font-weight: bold;
    text-align: left;
    background-color: lightgrey;
}
.popupValue{
    text-align: left;
}

</style>
