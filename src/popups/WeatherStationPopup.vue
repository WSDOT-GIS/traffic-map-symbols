// <template>
//   <PopupView
//     :MapX="mapX"
//     :MapY="mapY"
//     BannerBackColor="#cce5df"
//     BannerBorderColor="#007b5f"
//     ref="popupRef"
//     @close="close"
//   >
//     <template v-slot:title>
//       Weather Station{{ feature.length > 1 ? " (" + feature.length + ")" : "" }}
//     </template>
//     <template v-slot:subtitle>
//       <label class="popup-subtitle">
//         {{ feature["WeatherStationDescription"] }}
//       </label>
//     </template>
//     <template v-slot:default>
//       <table>
//         <tr>
//           <td class="popupKey">Id</td>
//           <td class="popupValue">{{ feature["WeatherStationId"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Priority</td>
//           <td class="popupValue">{{ feature["WeatherNetworkPriority"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Code</td>
//           <td class="popupValue">{{ feature["WeatherStationCode"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Description</td>
//           <td class="popupValue">{{ feature["WeatherStationDescription"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Elevation (Ft)</td>
//           <td class="popupValue">{{ feature["ElevationFeet"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Elevation (M)</td>
//           <td class="popupValue">{{ feature["ElevationMeters"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Weather Report Time</td>
//           <td class="popupValue">{{ feature["WeatherReportDateTime"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Temperature (F)</td>
//           <td class="popupValue">{{ feature["TemperatureFarhenheit"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Temperature ©</td>
//           <td class="popupValue">{{ feature["TemperatureCelcius"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Surface Temperature</td>
//           <td class="popupValue">{{ feature["SurfaceTemperature"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Minimum Temperature</td>
//           <td class="popupValue">{{ feature["MinTemperature"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Maximum Temperature</td>
//           <td class="popupValue">{{ feature["MaxTemperature"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Dew Point</td>
//           <td class="popupValue">{{ feature["DewPoint"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Wind Speed</td>
//           <td class="popupValue">{{ feature["WindSpeed"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Cardinal Compass Direction</td>
//           <td class="popupValue">{{ feature["CardinalCompassDirection"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Barometric Pressure</td>
//           <td class="popupValue">{{ feature["BarometricPressure"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Relative Humidity</td>
//           <td class="popupValue">{{ feature["RelativeHumidity"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Visibility</td>
//           <td class="popupValue">{{ feature["Visibility"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Latitude</td>
//           <td class="popupValue">{{ feature["Latitude"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Longitude</td>
//           <td class="popupValue">{{ feature["Longitude"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Percipitation Accumulated</td>
//           <td class="popupValue">{{ feature["PrecipitationAccumulated"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Icon Display Name</td>
//           <td class="popupValue">{{ feature["WeatherIconDisplayName"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Icon File Name</td>
//           <td class="popupValue">{{ feature["WeatherIconFileName"] }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Condition</td>
//           <td class="popupValue">{{ feature["Condition"] }}</td>
//         </tr>
//       </table>
//     </template>
//   </PopupView>
// </template>
// <script lang="ts">
// import { defineComponent, ref } from "vue";
// import PopupView from "./PopupView.vue";
// import { mapView } from "@/esri-stuff/esriMap";
// import WeatherStationsLayer from "@/layers/WeatherStationsLayer";
// //import {getWeatherStationInfoById} from "@/layers/WeatherStationsLayer";
// import Point from "@arcgis/core/geometry/Point";
// import { getGraphicsInfoById } from "@/utils/featureInfoUtil";
// import WeatherStationInfo from "@/types/WeatherStationsInfo";
// import FeatureInfo from "@/types/FeatureInfo";
// export default defineComponent({
//   components: { PopupView },
//   setup() {
//     // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
//     const popupRef = ref<InstanceType<typeof PopupView>>();
//     const mapX = ref(0);
//     const mapY = ref(0);
//     const feature = ref<FeatureInfo>();

//     const show = (pt: Point, featureInfo: FeatureInfo) => {
//       mapX.value = pt.x;
//       mapY.value = pt.y;
//       feature.value = featureInfo;
//     };
//     // Setting XY to 0 closes the popup...
//     const close = () => {
//       mapX.value = 0;
//       mapY.value = 0;
//       feature.value;
//     };

//     const onImageLoaded = () => {
//       popupRef.value?.adjustPositionSize();
//     };
//     // MapView click event handler...
//     mapView.on("click", (event) => {
//       // Check if pointer is over one of the zoom extents...
//       const opts = {
//         include: [WeatherStationsLayer],
//       };
//       mapView.hitTest(event, opts).then((response) => {
//         if (response.results.length) {
//           const pt = response.results[0].graphic.geometry as Point;
//           getGraphicsInfoById(
//             response.results[0].graphic,
//             WeatherStationsLayer
//           ).then((result) => {
//             result ? show(pt, result) : close();
//           });
//         } else {
//           close();
//         }
//       });
//     });
//     return {
//       popupRef,
//       mapX,
//       mapY,
//       feature,
//       close,
//       onImageLoaded,
//     };
//   },
// });
// </script>

// <style scoped>
// .camera-popup-img {
//   max-width: 100%;
// }
// .popupKey {
//   font-weight: bold;
//   text-align: left;
//   background-color: lightgrey;
// }
// .popupValue {
//   text-align: left;
// }
// </style>
