<template>
  <div id="locationWidget">
    <MapButtonView Height="32px" Width="32px" AriaLabel="Show my location">
      <template v-slot>
        <div title="My Location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="getLocation"
            viewBox="-4 -7 40 40"
            class="locateIcon"
            height="32px"
            width="32px"
          >
            <path
              d="M16.047.447c-8.615 0-15.6 6.983-15.6 15.6s6.984 15.6 15.6 15.6c8.617 0 15.6-6.983 15.6-15.6s-6.982-15.6-15.6-15.6zM18 29.079v-5.032h-3.953v5.032C8.371 28.21 3.883 23.722 3.016 18.047L8 18v-3.953H3.016C3.883 8.371 8.371 3.884 14.047 3.015V8H18V3.015c5.676.869 10.209 5.356 11.078 11.032h-5.031L24 18h5.078C28.209 23.676 23.676 28.21 18 29.079z"
            />
          </svg>
        </div>
      </template>
    </MapButtonView>
    <div :title="errorMessage">
      <svg
        id="warningIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        :class="warningDisplayClass"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M16.5 29.8A13.3 13.3 0 1 0 3.2 16.5a13.3 13.3 0 0 0 13.3 13.3zM16 9h1v11h-1zm.5 13.5a1 1 0 1 1-1 1 1.002 1.002 0 0 1 1-1z"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapView } from "../esri-stuff/esriMap";
import { useStore } from "@/store";
import MapButtonView from "@/components/MapButtonView.vue";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import {displayGraphicsByType, removeGraphicsByType} from "../utils/graphicLayerUtil"
export default defineComponent({
  components: { MapButtonView },
  setup() {
    const store = useStore();
    const location = ref<any>();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const errorMessage = ref<string>(
      "testing error message Locating failed for the following reason"
    );
    const warningDisplayClass = ref<string>("warningOff");
    return { location, options, errorMessage, warningDisplayClass, store };
    //#endregion
  },
  methods: {
    //#region toggle layer on and off

    getLocation: function () {
      removeGraphicsByType("myLocation")
      this.warningDisplayClass = "warningOff";
      if (this.store.state.userLocation == null) {
        navigator.geolocation.getCurrentPosition(
          this.success,
          this.error,
          this.options
        );
      } else {
        this.success(this.store.state.userLocation);
      }
    },
    success: function (location: any) {
      // console.log(location)
      this.store.commit("setUserLocation", location);
      this.warningDisplayClass = "warningOff";
      this.errorMessage = "";
      mapView
        .goTo(
          {
            center: [location.coords.longitude, location.coords.latitude],
            zoom: 6,
          },
          { duration: 1000, easing: "ease-in-out" }
        )
        .then(() => {
          displayGraphicsByType("myLocation",location.coords)
        });
    },
    error: function (error: any) {
      this.warningDisplayClass = "warningOn";
      this.errorMessage = `Locating failed for the following reason: ${error.message}`;
    },
    //#endregion
  },
});
</script>
<style scoped>
.warningOff {
  display: none;
}
.warningOn {
  display: block;
}
/* .locateIcon {
  width: 30px;
  height: 30px;
  border-radius: 30px / 30px;
  padding: 0px;
  background-color: white;
} */
svg {
  fill: grey;
}
#warningIcon {
  width: 20px;
  height: 20px;
  position: relative;
  right: 10px;
  top: -22px;
  border-radius: 20px / 20px;
  z-index: 9;
  margin: 2px;
  background-color: white;
  fill: red;
}
</style>
