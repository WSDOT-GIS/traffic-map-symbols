<template>
  <div class="top left2 ontop" id="legendDiv">
    <label>Layers</label>
    <table>
      <tr v-for="layer in layerList" :key="layer.index">
        <td>
          <input type="checkbox" @change="clickEvent" :checked="true" :value="layer.index"/>
        </td>
        <td>{{layer.title}}</td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { store, useStore } from "@/store";
import { defineComponent, onMounted, ref} from "vue";
import { mapState, mapMutations } from "vuex";
import {webmap} from "../esri-stuff/esriMap";
export default defineComponent({
  setup(){
    //#region populate the layer list
    const layerList = ref<{ index: number, title: string, visible: boolean }[]>([])
    webmap.layers.map((layer,index)=>{
        layerList.value.push({index: index,title: layer.title, visible: layer.visible})
    })
    return{layerList}
    //#endregion
  },
  methods:{
    //#region toggle layer on and off
    clickEvent: async(evt:Event)=>{
      webmap.layers.map((layer,index)=>{
        if(evt.target){
          const target = evt.currentTarget as HTMLInputElement
          if(index.toString() == target.value){
            layer.visible==true?layer.visible = false:layer.visible=true
          }
        }
      })
    }
    //#endregion
  }
});
</script>
<style scoped>
  #legendDiv{
    background-color: white;

  }
</style>
