<template>
  <div id="basemap-widget-container">
    <MapButtonView @click="onClick" :Height="imgSize"  AriaLabel="Change basemap">
      <template v-slot >
        <div class="basemap-img-container">
          <img :src="imgSrc" :height="imgSize" alt="" />
          <label :class="topLabelClass" :id="labelStyle">{{iconTitle}}</label>
          <label :class="bottomLabelClass" :id="labelStyle">Basemap</label>
        </div>
      </template>
    </MapButtonView>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import MapButtonView from "@/components/MapButtonView.vue";
import { webmap } from "@/esri-stuff/esriMap";
/* eslint @typescript-eslint/no-var-requires: "off" */
export default defineComponent({
  components: { MapButtonView },
  setup() {
    const store = useStore();//create reference to vuex store
    const tileImage = require("@/assets/icons/tileBasemap.png")//use wsdot basemap icon
    const satelliteImage = require("@/assets/icons/worldImagery.png")//use imagery basemap icon
    const imgSrc = ref<string>(satelliteImage)//reference to image used in icon
    const imgSize = ref<string>("100")//reference to icon size determined by screen size
    const iconTitle = ref<string>("Imagery")//reference to text used in icon, determined by selected basemap
    const labelStyle = ref<string>("iconLabelWhite")//reference to class used to define label color, determined by selected basemap
    const topLabelClass = ref<string>()//reference to class used to define top label size and placement, determined by selected basemap
    const bottomLabelClass = ref<string>()//reference to class used to define bottom label size and placement, determined by selected basemap
    const toggleImageryReference= ()=>{
      store.state.layerList.map((x)=>{
        if(webmap.basemap.title=="Basemap"||webmap.basemap.title=="WSDOT Basemap"){
          if(x.id=="roads-reference-layer"||x.id=="boundaries-places-reference-layer"||x.id=="ferry-routes-reference-layer"){
            x.visible=true
          }
        }
        else{
          if(x.id=="roads-reference-layer"||x.id=="boundaries-places-reference-layer"||x.id=="ferry-routes-reference-layer"){
            x.visible=false
          }
        }
      })
      store.commit("setLayerList", store.state.layerList);
    }
    const updateBasemapIcon = ()=>{
      imgSrc.value == satelliteImage
        ? (imgSrc.value = tileImage)
        : (imgSrc.value = satelliteImage);
      iconTitle.value == "Imagery"
      ? (iconTitle.value = "WSDOT")
      : (iconTitle.value = "Imagery");
      labelStyle.value == "iconLabelWhite"
      ? (labelStyle.value = "iconLabelBlack"):
      (labelStyle.value = "iconLabelWhite");
    }
    const onClick = () => {
      toggleImageryReference()
      store.commit("toggleBasemap");//fire "toggleBasemap" mutation in store.ts
      updateBasemapIcon()
    };

    return {
      imgSrc,
      iconTitle,
      onClick,
      labelStyle,
      imgSize,
      topLabelClass,
      bottomLabelClass
    };
  },
  mounted() {
    if(window.innerWidth <=500){
      this.imgSize = "50";
      this.topLabelClass = "basemap-img-Top-Small"
      this.bottomLabelClass = "basemap-img-Bottom-Small"
    }
    if(window.innerWidth >=500){
      this.imgSize= "100"
      this.topLabelClass = "basemap-img-Top-Large"
      this.bottomLabelClass = "basemap-img-Bottom-Large"
    }
    window.addEventListener("resize",() => {
      if(window.innerWidth <=500){
        this.imgSize = "50";
        this.topLabelClass = "basemap-img-Top-Small"
        this.bottomLabelClass = "basemap-img-Bottom-Small"
      }
      if(window.innerWidth >=500){
        this.imgSize= "100"
        this.topLabelClass = "basemap-img-Top-Large"
        this.bottomLabelClass = "basemap-img-Bottom-Large"
      }
    })
  }
});
</script>
 <style scoped>
/*Defines the style of the basemap picker*/
#iconImage{
  height:100px
  }
#iconLabelWhite{
  color: white;
  text-shadow: 2px 2px 4px #000000;
  position: absolute;
}
#iconLabelBlack{
  color: black;
  text-shadow: 2px 2px 4px white;
  position: absolute;
}
.basemap-img-container {
  position: relative;
  text-align: center;
  color: white;
}
.basemap-img-Top-Large {
  position: absolute;
  bottom: 30px;
  left: 5px;
}
.basemap-img-Bottom-Large{
  position: absolute;
  bottom: 5%;
  left: 5px;
}
.basemap-img-Top-Small {
  font-size: small;
  position: absolute;
  bottom: 30%;
  left: 5px;
}
.basemap-img-Bottom-Small{
  font-size: small;
  position: absolute;
  bottom: 2%;
  left: 5px;
}
</style>
