<template>
  <div id="basemap-widget-container">
    <MapButtonView @click="onClick" Height="100px" Width="150px">
      <template v-slot >
        <div class="container">
          <img :src="imgSrc" id="iconImage"/>
          <label class="centered" :id="labelStyle">{{iconTitle}}</label>
        </div>
      </template>
    </MapButtonView>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import MapButtonView from "@/components/MapButtonView.vue";
/* eslint @typescript-eslint/no-var-requires: "off" */
export default defineComponent({
  components: { MapButtonView },
  setup() {
    const store = useStore();
    const expanded = ref<string>("block");
    const tileImage = require("@/assets/icons/tileBasemap.png")
    const satelliteImage = require("@/assets/icons/worldImagery.png")
    const imgSrc = ref<any>(satelliteImage)
    const iconTitle = ref<string>("Imagery Basemap")
    const labelStyle = ref<string>("iconLabelWhite")

    const onClick = () => {
      store.commit("toggleBasemap");
      console.log("Clicked basemap: " + store.state.basemap);
      imgSrc.value == satelliteImage
        ? (imgSrc.value = tileImage)
        : (imgSrc.value = satelliteImage);
      iconTitle.value == "Imagery Basemap"
      ? (iconTitle.value = "WSDOT Basemap")
      : (iconTitle.value = "Imagery Basemap");
      labelStyle.value == "iconLabelWhite"
      ? (labelStyle.value = "iconLabelBlack"):
      (labelStyle.value = "iconLabelWhite");
    };

    return {
      expanded,
      imgSrc,
      iconTitle,
      onClick,
      labelStyle
    };
  },
  computed: {
    nextMapTitle() {
      const store = useStore();
      return "click for " + store.state.basemap;
    },
  },
});
</script>
 <style scoped>
/*Defines the style of the basemap picker*/
#iconImage{
  width:1250x;
  height:100px
  }
#iconLabelWhite{
  color: white;
  text-shadow: 2px 2px 4px #000000;
  position: absolute;
  bottom: 5%;
  left: 5%;
}
#iconLabelBlack{
  color: black;
  text-shadow: 2px 2px 4px white;
  position: absolute;
  bottom: 5%;
  left: 5%;
}
.container {
  position: relative;
  text-align: center;
  color: white;
}
.centered {
  position: absolute;
  bottom: 5%;
  left: 5%;
}

</style>
