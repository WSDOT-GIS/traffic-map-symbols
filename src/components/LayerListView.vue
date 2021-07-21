<template>
  <div id="layerListWidget" title="Map Features">
    <ul class="w3-ul" style="padding: 1px 0">
      <li class="w3-border-0" style="padding: 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[0].visible"
          :Value="layerList[0].index.toString()"
        >
          <template v-slot>
            <span class="listLabel"> {{ layerList[0].title }}</span>
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
    <!-- https://www.emailonacid.com/blog/article/email-development/why-should-i-set-my-table-role-as-presentation/ -->
    <table class="trafficLegendTable" role="presentation">
      <tr class="trafficLegendRow">
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowMediumLegendCell">
            &nbsp;
          </div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="mediumFastLegendCell">
            &nbsp;
          </div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="fastLegendCell">&nbsp;</div>
        </td>
      </tr>
      <tr>
        <td class="trafficLegendLabelCell">Slow</td>
        <td class="trafficLegendLabelCell"></td>
        <td class="trafficLegendLabelCell"></td>
        <td class="trafficLegendLabelCell">Fast</td>
      </tr>
    </table>
    <ul class="w3-ul">
      <li
        class="w3-border-0"
        style="padding: 1px 0"
        v-for="layer in layerList.slice(1)"
        :key="layer.index"
      >
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layer.visible"
          :Value="layer.index.toString()"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="layerIcons.find((x) => x.title == layer.title)?.paths"
            ></div>
            <span class="listLabel"> {{ layer.title }}</span>
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { store, useStore } from "@/store";
import { defineComponent, ref } from "vue";
import LayerInfo from "../types/LayerInfo";
import { webmap } from "../esri-stuff/esriMap";
// import { mapState } from "vuex";
import { layerListIcons } from "@/symbols/IconDefinitions";
import ToggleSwitchView from "./ToggleSwitchView.vue";
export default defineComponent({
  components: { ToggleSwitchView },
  setup() {
    //#region populate the layer list
    const store = useStore();
    let layerList = ref<LayerInfo[]>([]);
    const layerIcons = layerListIcons;
    webmap.layers.map((layer, index) => {
      if (layer.title !== "Metro Areas") {
        layerList.value.push({
          index: index,
          title: layer.title,
          visible: layer.visible,
        });
      }
    });
    store.commit("setLayerList", layerList);
    return { layerList, layerIcons, store };
    //#endregion
  },
  methods: {
    //#region toggle layer on and off
    clickEvent: async (evt: { checked: boolean; value: string }) => {
      store.state.layerList.map((layer, index) => {
        if (evt) {
          if (index.toString() === evt.value) {
            layer.visible = evt.checked;
          }
        }
      });
      store.commit("setLayerList", store.state.layerList);
    },

    //#endregion
  },
});
</script>
<style scoped>
/* #layerListWidget {
  background-color: white;
  box-shadow: 1pt solid grey;
  width: 100%;
} */
.listLabel {
  font-size: small;
}
#slowLegendCell {
  background-color: firebrick;
}
#slowMediumLegendCell {
  background-color: orange;
}
#mediumFastLegendCell {
  background-color: yellow;
}
#fastLegendCell {
  background-color: limegreen;
}
.trafficLegendSymbolDiv {
  height: 8px;
}
/* .layerSwitchCell {
  align-content: center;
  width: 10px;
}
.layerLabelCell {
  align-content: center;
  font-size: small;
  text-align: left;
  width: 95%;
}
.mapFeatureTable {
  width: 100%;
} */
.trafficLegendTable {
  margin: auto;
  width: 95%;
  border-collapse: collapse;
}
.trafficLegendCell {
  width: 25%;
  padding: 2px 0px 2px 0px;
  border: 0px;
}
.trafficLegendRow {
  height: 10px;
}
.trafficLegendLabelCell {
  background-color: white;
  border: none;
  box-shadow: none;
  font-size: small;
}
/* .mapFeatureCell {
  padding: 2px 2px 2px 0px;
}*/
.mapFeaturesIcon {
  height: 20px;
  width: 20px;
}
tr {
  border: none;
}
</style>
