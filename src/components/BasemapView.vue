<template>
  <div id="basemap-widget-container" class="bottom right ontop" @click="toggleStyleClass">
    <div @click="toggleBasemap">
      <img style="height:70px; width:100px" id="test" :src="imgSrc" @click="imgClicked = !imgClicked" />
      <!--svg xmlns="http://www.w3.org/2000/svg" :title="nextMapTitle" :class="styleClass"  viewBox="0 0 32 32" class="locateIcon"><path :d="nextMapIcon"/></svg-->
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import { mapMutations } from "vuex";
import {layerListIcons} from "@/symbols/IconDefinitions"

export default defineComponent({
  setup() {
    const expanded = ref<string>("block")
    const styleClass = ref<string>("basemapWidgetStyleWSDOT")
    //const nextMapIcon = ref<string>(satelliteLayerIcon)
    const imgClicked = false
   return {
      styleClass,
      expanded,
      //nextMapIcon,
      imgClicked
    };
  },
  computed:{
    /*imgSrc: function () {
      return this.imgClicked ? '../assets/menu.svg' : '../assets/cross.svg'
    }*/
  },
  methods: {
    // Using a utility function to get a mutation and make it available in the view.
    ...mapMutations(["toggleBasemap"]),
     toggleStyleClass:function(){
      this.styleClass=="basemapWidgetStyleWSDOT"?this.styleClass="basemapWidgetStyleSatellite":this.styleClass="basemapWidgetStyleWSDOT";
     // this.nextMapIcon == this.mapLayerIcon?this.nextMapIcon = require(this.satelliteLayerIcon):this.nextMapIcon =require(this.mapLayerIcon)
    }
    
  },
});
</script>
 <style scoped>
 #basemap-widget-container {
   right: 50px;
 }
 /*Defines the style of the basemap picker*/
.basemapWidgetStyleSatellite{
    fill: lightgreen;
}
.basemapWidgetStyleWSDOT{
    fill: lightblue
}
 </style>
