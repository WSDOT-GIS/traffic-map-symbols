<template>
  <div id="layerListWidget" title="Map Features">
    <table>
      <td>
        <label style="font-size:large">Map Features</label>
      </td>
      <hr>
      <td>
        <svg @click="handleExpandClicked" id="expand" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 32 32" class="svg-icon"><path :d="expandIconPath"/></svg>      
      </td>
    </table>

    <table id="mapFeaturesDiv" ref="mapFeaturesDiv" :style="{display: expanded}">
      <tr v-for="layer in layerList" :key="layer.index">
        <td style="font-size:small; text-align:left">{{layer.title}}</td>
        <td>
          <label class="switch">
            <input type="checkbox" @change="clickEvent" :checked="layer.visible" :value="layer.index"/>
            <span class="slider round"></span>
          </label>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { store, useStore } from "@/store";
import { defineComponent, onMounted, ref} from "vue";
import LayerInfo from "../types/LayerInfo";
import {webmap} from "../esri-stuff/esriMap";
export default defineComponent({
  setup(){
    //#region populate the layer list
    let layerList = ref<LayerInfo[]>([]);
    const expandIconPath = ref<string>("M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z");
    const expanded = ref<string>("block")
    const store = useStore()
    /*if(store.state.layerList.length>0){
      layerList.value = store.state.layerList
    }*/
   // else{
      webmap.layers.map((layer,index)=>{
        layerList.value.push({index: index,title: layer.title, visible: layer.visible});
      })
   // }
    store.commit("setLayerList",layerList)
    return{layerList, expandIconPath, expanded}
    //#endregion
  },
  methods:{
    //#region toggle layer on and off
    clickEvent: async(evt:Event)=>{
      store.state.layerList.map((layer, index)=>{
        if(evt.target){
          const target = evt.currentTarget as HTMLInputElement;
          if(index.toString() == target.value){
            layer.visible==true?layer.visible = false:layer.visible=true;
          }
        }
      })
      store.commit("setLayerList",store.state.layerList)
    },
    handleExpandClicked:function(){
      this.expanded=="block"?this.expanded="none":this.expanded="block";
      this.expanded=="block"?this.expandIconPath="M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z":this.expandIconPath="M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z";
    }    
    //#endregion
  }
});
</script>
<style scoped>
  #layerListWidget{
    background-color: white;
    box-shadow: 1pt solid grey;
  }
</style>
