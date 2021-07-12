<template>
  <PopupView :MapX="mapX" :MapY="mapY" ref="popupRef" @close="close">
    <template v-slot:title>
      Park and Ride{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
        <table>
            <tr>
              <td class="popupKey">Address</td><td class="popupValue">{{infos["Address"]}}</td>
            </tr>
            <tr>
              <td class="popupKey">Approximate Number of Spaces</td><td class="popupValue">{{infos["Approx_Numb_Spaces"]}}</td>
            </tr>
            <tr>
              <td class="popupKey">City</td><td class="popupValue">{{infos["CityName"]}}</td>
            </tr>
            <tr>
              <td class="popupKey">County</td><td class="popupValue">{{infos["CountyName"]}}</td>
            </tr>
            <tr>
              <td class="popupKey">Lot Name</td><td class="popupValue">{{infos["Lot_Name"]}}</td>
            </tr>
            <tr>
              <td class="popupKey">Date</td><td class="popupValue">{{Date(infos["PublishDate"])}}</td>
            </tr>
            <tr>
              <td class="popupKey">Location</td><td class="popupValue">{{infos["Street_Location"]}}</td>
            </tr>
            <tr>
              <td class="popupKey">Zip Code</td><td class="popupValue">{{infos["ZipCode"]}}</td>
            </tr>
        </table>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PopupView from "./PopupView.vue";
import ParkRideInfo from "@/types/ParkRideInfo";
import { mapView } from "@/esri-stuff/esriMap";
import ParkRideLayer from "@/layers/ParkRideLayer";
import {getParkRideInfoById} from "@/layers/ParkRideLayer";
import Point from "@arcgis/core/geometry/Point";

export default defineComponent({
  components: { PopupView },
  setup() {
    // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const mapX = ref(0);
    const mapY = ref(0);
    const infos = ref<ParkRideInfo>();

    const show = (pt: Point, parkRideInfos: ParkRideInfo) => {
        mapX.value = pt.x;
        mapY.value = pt.y;
        infos.value = parkRideInfos;
        Object.entries(infos.value).forEach(
            ([key, value]) => console.log(key, value)
        );
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
      // Check if pointer is over one of the zoom extents...
      const opts = {
        include: [ParkRideLayer],
      };
      mapView.hitTest(event, opts).then((response) => {
       if (response.results.length) {
            // Show custom popup...
            console.log( response.results)
            const g = response.results[0].graphic;
            const pt = g.geometry as Point;
            const parkRideId = g.getObjectId();
            getParkRideInfoById(parkRideId).then((results) => {
                console.log(results)
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
