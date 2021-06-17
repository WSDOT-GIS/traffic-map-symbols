<template>
  <div id="legendWidget">
    <table>
      <td>
        <label style="font-size:large">Traffic Flow Legend</label>
      </td>
      <hr>
      <td>
        <svg @click="handleExpandClicked" id="expand" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 32 32" class="svg-icon"><path :d="expandIconPath"/></svg>      
      </td>
    </table>

    <table id="legendDiv" ref="legendDiv" :style="{display: expanded}">
      <tr v-for="flowState in legendItems" :key="flowState.id">
        <td id="symbolContainer">
          <div id="oval" :style="{ 'background-color': flowState.color }">
          </div>
        </td>
        <td style="font-size:small; text-align:left">{{flowState.title}}</td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref} from "vue";
import LegendInfo from "../types/LegendInfo";
export default defineComponent({
  setup(){
    //#region populate the legend
    const expandIconPath = ref<string>("M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z");
    const expanded = ref<string>("block")
    const legendItems = ref<LegendInfo[]>([
        {id:0,color:"rgb(0,0,0)",title:"Stop and Go"},
        {id:1,color:"rgb(255,0,0)",title:"Heavy"},
        {id:2,color:"rgb(255,255,0)",title:"Moderate"},
        {id:3,color:"rgb(0,255,0)",title:"Wide Open"},
        {id:4,color:"rgb(255,255,255)",title:"No Data"},
        {id:5,color:"rgb(100,100,100)",title:"No Equipment"}
    ]);
    return{expandIconPath, expanded, legendItems}
    //#endregion
  },
  methods:{
    //#region toggle layer on and off
    
    handleExpandClicked:function(){
      this.expanded=="block"?this.expanded="none":this.expanded="block";
      this.expanded=="block"?this.expandIconPath="M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z":this.expandIconPath="M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z";
    }    
    //#endregion
  }
});
</script>
<style scoped>
  #legendWidget{
    background-color: white;
  }
  #oval {
    border: 1pt solid black;
    width: 15px;
    height: 10px;
    border-radius: 15px / 10px;
  }
 
</style>
