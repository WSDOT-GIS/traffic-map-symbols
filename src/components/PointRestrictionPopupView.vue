<template>
  <PopupView :MapX="mapX" :MapY="mapY" ref="popupRef" @close="close">
    <template v-slot:title>
      Vehicle Restriction{{ infos.length > 1 ? " (" + infos.length + ")" : "" }}
    </template>
    <template v-slot:default>
        <table>
            <tr><td class="popupKey">Unique Id</td><td class="popupValue">{{infos["UniqueId"]}}</td></tr>
            <tr><td class="popupKey">State</td><td class="popupValue">{{infos["state"]}}</td></tr>
            <tr><td class="popupKey">Route</td><td class="popupValue">{{infos["route_nr"]}}</td></tr>
            <tr><td class="popupKey">Sequence</td><td class="popupValue">{{infos["seq_nr"]}}</td></tr>
            <tr><td class="popupKey">Direction</td><td class="popupValue">{{infos["direction"]}}</td></tr>
            <tr><td class="popupKey">Cardinal Direction</td><td class="popupValue">{{infos["cardinal_direction"]}}</td></tr>
            <tr><td class="popupKey">Start Milepost</td><td class="popupValue">{{infos["restriction_start_mp"]}}</td></tr>
            <tr><td class="popupKey">End Milepost</td><td class="popupValue">{{infos["restriction_end_mp"]}}</td></tr>
            <tr><td class="popupKey">Comment</td><td class="popupValue">{{infos["restriction_comment"]}}</td></tr>
            <tr><td class="popupKey">Location</td><td class="popupValue">{{infos["location_name"]}}</td></tr>
            <tr><td class="popupKey">Description</td><td class="popupValue">{{infos["location_description"]}}</td></tr>
            <tr><td class="popupKey">Date Posted</td><td class="popupValue">{{infos["date_posted"]}}</td></tr>
            <tr><td class="popupKey">Date Effective</td><td class="popupValue">{{infos["date_effective"]}}</td></tr>
            <tr><td class="popupKey">Date Expires</td><td class="popupValue">{{infos["date_expires"]}}</td></tr>
            <tr><td class="popupKey">Width</td><td class="popupValue">{{infos["restriction_width"]}}</td></tr>
            <tr><td class="popupKey">Height</td><td class="popupValue">{{infos["restriction_height"]}}</td></tr>
            <tr><td class="popupKey">Length</td><td class="popupValue">{{infos["restriction_length"]}}</td></tr>
            <tr><td class="popupKey">Weight</td><td class="popupValue">{{infos["restriction_weight"]}}</td></tr>
            <tr><td class="popupKey">Vehicle Type</td><td class="popupValue">{{infos["road_veh_type"]}}</td></tr>
            <tr><td class="popupKey">Commerical Vehicle</td><td class="popupValue">{{infos["commercial_veh_yn"]}}</td></tr>
            <tr><td class="popupKey">Detour Available</td><td class="popupValue">{{infos["detour_available_yn"]}}</td></tr>
            <tr><td class="popupKey">Permanent</td><td class="popupValue">{{infos["permanent_restriction_yn"]}}</td></tr>
            <tr><td class="popupKey">Exceptions Allowed</td><td class="popupValue">{{infos["exceptions_allowed_yn"]}}</td></tr>
            <tr><td class="popupKey">Warning</td><td class="popupValue">{{infos["warning_yn"]}}</td></tr>
            <tr><td class="popupKey">Bridge Number</td><td class="popupValue">{{infos["bridge_nr"]}}</td></tr>
            <tr><td class="popupKey">Max Gross Vehicle Weight</td><td class="popupValue">{{infos["max_gvw"]}}</td></tr>
            <tr><td class="popupKey">Bridge Type</td><td class="popupValue">{{infos["bridge_type"]}}</td></tr>
            <tr><td class="popupKey">Bridge Name</td><td class="popupValue">{{infos["bridge_name"]}}</td></tr>
            <tr><td class="popupKey">bl_max_axle</td><td class="popupValue">{{infos["bl_max_axle"]}}</td></tr>
            <tr><td class="popupKey">cl8_max_axle</td><td class="popupValue">{{infos["cl8_max_axle"]}}</td></tr>
            <tr><td class="popupKey">sa_max_axle</td><td class="popupValue">{{infos["sa_max_axle"]}}</td></tr>
            <tr><td class="popupKey">td_max_axle</td><td class="popupValue">{{infos["td_max_axle"]}}</td></tr>
            <tr><td class="popupKey">Type</td><td class="popupValue">{{infos["TType"]}}</td></tr>
            <tr><td class="popupKey">Posted Restriction Flag</td><td class="popupValue">{{infos["PostedRestrictionFlag"]}}</td></tr>
            <tr><td class="popupKey">Record Update Date</td><td class="popupValue">{{Date(infos["RecordUpdateDate"])}}</td></tr>
            <tr><td class="popupKey">Related Route Type</td><td class="popupValue">{{infos["RelatedRouteType"]}}</td></tr>
            <tr><td class="popupKey">Related Route Qualifier</td><td class="popupValue">{{infos["RelatedRouteQualifier"]}}</td></tr>
            <tr><td class="popupKey">Ahead Back Indicator</td><td class="popupValue">{{infos["AheadBackIndicator"]}}</td></tr>
            <tr><td class="popupKey">ESRI_OID</td><td class="popupValue">{{infos["ESRI_OID"]}}</td></tr>
            <tr><td class="popupKey"></td><td class="popupValue">{{infos[""]}}</td></tr>

        </table>
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PopupView from "./PopupView.vue";
import { mapView } from "@/esri-stuff/esriMap";
import PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import Point from "@arcgis/core/geometry/Point";
import RestrictionInfo from "@/types/RestrictionInfo";
import {getGraphicsInfoById} from "@/utils/getGraphicsInfoByID"
export default defineComponent({
  components: { PopupView },
  setup() {
    // https://forum.vuejs.org/t/vue3-accessing-child-component-data-values-and-methods/111329/5
    const popupRef = ref<InstanceType<typeof PopupView>>();
    const mapX = ref(0);
    const mapY = ref(0);
    const infos = ref<RestrictionInfo>();

    const show = (pt: Point, RestrictionInfos: RestrictionInfo) => {
        mapX.value = pt.x;
        mapY.value = pt.y;
        infos.value = RestrictionInfos;
   
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
        include: [PointRestrictionsLayer],
      };
       mapView.hitTest(event, opts).then((response) => {
       if (response.results.length) {
            const pt = response.results[0].graphic.geometry as Point;
            getGraphicsInfoById(response.results[0].graphic, "ESRI_OID", PointRestrictionsLayer).then((results)=>{
                results ? show(pt, results as RestrictionInfo) : close();
            })
        }
         else {
          close();
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
