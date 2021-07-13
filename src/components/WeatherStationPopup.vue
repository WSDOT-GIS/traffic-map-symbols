<template>
  <PopupView :MapX="mapX" :MapY="mapY" ref="popupRef" @close="close">
    <template v-slot:title>
      Weather Station{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
        <table>
            <tr><td class="popupKey">Id</td><td class="popupValue">{{infos["WeatherStationId"]}}</td></tr>
            <tr><td class="popupKey">Priority</td><td class="popupValue">{{infos["WeatherNetworkPriority"]}}</td></tr>
            <tr><td class="popupKey">Code</td><td class="popupValue">{{infos["WeatherStationCode"]}}</td></tr>
            <tr><td class="popupKey">Description</td><td class="popupValue">{{infos["WeatherStationDescription"]}}</td></tr>
            <tr><td class="popupKey">Elevation (Ft)</td><td class="popupValue">{{infos["ElevationFeet"]}}</td></tr>
            <tr><td class="popupKey">Elevation (M)</td><td class="popupValue">{{infos["ElevationMeters"]}}</td></tr>
            <tr><td class="popupKey">Weather Report Time</td><td class="popupValue">{{infos["WeatherReportDateTime"]}}</td></tr>
            <tr><td class="popupKey">Temperature (F)</td><td class="popupValue">{{infos["TemperatureFarhenheit"]}}</td></tr>
            <tr><td class="popupKey">Temperature ©</td><td class="popupValue">{{infos["TemperatureCelcius"]}}</td></tr>
            <tr><td class="popupKey">Surface Temperature</td><td class="popupValue">{{infos["SurfaceTemperature"]}}</td></tr>
            <tr><td class="popupKey">Minimum Temperature</td><td class="popupValue">{{infos["MinTemperature"]}}</td></tr>
            <tr><td class="popupKey">Maximum Temperature</td><td class="popupValue">{{infos["MaxTemperature"]}}</td></tr>
            <tr><td class="popupKey">Dew Point</td><td class="popupValue">{{infos["DewPoint"]}}</td></tr>
            <tr><td class="popupKey">Wind Speed</td><td class="popupValue">{{infos["WindSpeed"]}}</td></tr>
            <tr><td class="popupKey">Cardinal Compass Direction</td><td class="popupValue">{{infos["CardinalCompassDirection"]}}</td></tr>
            <tr><td class="popupKey">Barometric Pressure</td><td class="popupValue">{{infos["BarometricPressure"]}}</td></tr>
            <tr><td class="popupKey">Relative Humidity</td><td class="popupValue">{{infos["RelativeHumidity"]}}</td></tr>
            <tr><td class="popupKey">Visibility</td><td class="popupValue">{{infos["Visibility"]}}</td></tr>
            <tr><td class="popupKey">Latitude</td><td class="popupValue">{{infos["Latitude"]}}</td></tr>
            <tr><td class="popupKey">Longitude</td><td class="popupValue">{{infos["Longitude"]}}</td></tr>
            <tr><td class="popupKey">Percipitation Accumulated</td><td class="popupValue">{{infos["PrecipitationAccumulated"]}}</td></tr>
            <tr><td class="popupKey">Icon Display Name</td><td class="popupValue">{{infos["WeatherIconDisplayName"]}}</td></tr>
            <tr><td class="popupKey">Icon File Name</td><td class="popupValue">{{infos["WeatherIconFileName"]}}</td></tr>
            <tr><td class="popupKey">Condition</td><td class="popupValue">{{infos["Condition"]}}</td></tr>
        </table>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PopupView from "./PopupView.vue";
import { mapView } from "@/esri-stuff/esriMap";
import WeatherStationsLayer from "@/layers/WeatherStationsLayer";
//import {getWeatherStationInfoById} from "@/layers/WeatherStationsLayer";
import Point from "@arcgis/core/geometry/Point";
import {getGraphicsInfoById} from "@/utils/getGraphicsInfoByID"
import WeatherStationInfo from "@/types/WeatherStationsInfo";
export default defineComponent({
  components: { PopupView },
  setup() {
    // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const mapX = ref(0);
    const mapY = ref(0);
    const infos = ref<WeatherStationInfo>();

    const show = (pt: Point, WeatherStationInfos: WeatherStationInfo) => {
        mapX.value = pt.x;
        mapY.value = pt.y;
        infos.value = WeatherStationInfos;
   
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
        include: [WeatherStationsLayer],
      };
      mapView.hitTest(event, opts).then((response) => {
       if (response.results.length) {
            const pt = response.results[0].graphic.geometry as Point;
            getGraphicsInfoById(response.results[0].graphic, "WeatherStationId", WeatherStationsLayer).then((results)=>{
                results ? show(pt, results as WeatherStationInfo) : close();
            })
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
