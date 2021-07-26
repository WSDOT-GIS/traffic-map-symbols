// <template>
//   <PopupView
//     :MapX="mapX"
//     :MapY="mapY"
//     BannerBackColor="#cce5df"
//     BannerBorderColor="#007b5f"
//     ref="popupRef"
//     @close="close"
//   >
//     <template v-slot:title> Park and Ride </template>
//     <template v-slot:default>
//       <table>
//         <tr>
//           <td class="popupKey">Address</td>
//           <td class="popupValue">{{ info?.Address }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Approximate Number of Spaces</td>
//           <td class="popupValue">{{ info?.Approx_Numb_Spaces }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">City</td>
//           <td class="popupValue">{{ info?.CityName }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">County</td>
//           <td class="popupValue">{{ info?.CountyName }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Lot Name</td>
//           <td class="popupValue">{{ info?.Lot_Name }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Date</td>
//           <td class="popupValue">
//             {{ info ? new Date(info.PublishDate) : "" }}
//           </td>
//         </tr>
//         <tr>
//           <td class="popupKey">Location</td>
//           <td class="popupValue">{{ info?.Street_Location }}</td>
//         </tr>
//         <tr>
//           <td class="popupKey">Zip Code</td>
//           <td class="popupValue">{{ info?.ZipCode }}</td>
//         </tr>
//       </table>
//     </template>
//   </PopupView>
// </template>
// <script lang="ts">
// import { defineComponent, PropType, ref, toRefs, watch } from "vue";
// import PopupView from "./PopupView.vue";
// import ParkRideInfo from "@/types/ParkRideInfo";
// import ParkRideLayer from "@/layers/ParkRideLayer";
// import { getFeatureInfoById } from "@/utils/featureInfoUtil";
// import FeaturesetInfo from "@/types/FeaturesetInfo";
// export default defineComponent({
//   components: { PopupView },
//   props: {
//     Info: {
//       type: Object as PropType<FeaturesetInfo>,
//       required: true,
//     },
//     MapX: {
//       type: Number,
//       required: true,
//     },
//     MapY: {
//       type: Number,
//       required: true,
//     },
//   },
//   setup(props) {
//     // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
//     const popupRef = ref<InstanceType<typeof PopupView>>();
//     const propsInfo = toRefs(props).Info;
//     const propsMapX = toRefs(props).MapX;
//     const propsMapY = toRefs(props).MapY;
//     const mapX = ref(0);
//     const mapY = ref(0);
//     const info = ref<ParkRideInfo>();

//     watch([propsInfo, propsMapX, propsMapY], () => {
//       if (props.Info.layerTitle === ParkRideLayer.title) {
//         show();
//       } else {
//         close();
//       }
//     });

//     const show = () => {
//       const setVal = () => {
//         getFeatureInfoById(props.Info.ids[0], ParkRideLayer).then((result) => {
//           if (result) {
//             info.value = result as ParkRideInfo;
//             mapX.value = props.MapX;
//             mapY.value = props.MapY;
//           }
//         });
//       };
//       if (mapX.value !== 0 || mapY.value !== 0 || info.value) {
//         // console.log("Clean and set popup value");
//         // Clean up the previous data...
//         close();
//         setVal();
//       } else {
//         // console.log("Set popup value.");
//         setVal();
//       }
//     };
//     // Setting XY to 0 closes the popup...
//     const close = () => {
//       mapX.value = 0;
//       mapY.value = 0;
//       // info.value = undefined;
//     };

//     return {
//       popupRef,
//       mapX,
//       mapY,
//       info,
//       close,
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
