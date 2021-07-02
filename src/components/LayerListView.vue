<template>
  <div id="layerListWidget" title="Map Features">
    <div :style="{ display: mapFeaturesExpanded }">
      <div class="w3-display-container">
      <label class="w3-large">Map Features</label>
      <svg
        @click="handleExpandClicked(store)"
        id="expand"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 32 32"
        class="svg-icon w3-display-right"
      >
        <path :d="expandIconPath" />
      </svg>
      </div>
      <hr class="horizontal-divider" />
    </div>
    <div id="mapFeaturesDiv" :style="{ display: mapFeaturesExpanded }">
      <table class="mapFeatureTable">
        <tr>
          <td class="layerSwitchCell mapFeatureCell">
            <label class="switch">
              <input
                type="checkbox"
                @change="clickEvent"
                :checked="layerList[0].visible"
                :value="layerList[0].index"
              />
              <span class="slider round"></span>
            </label>
          </td>
          <td class="layerLabelCell mapFeatureCell">
            {{ layerList[0].title }}
          </td>
        </tr>
      </table>
      <table class="trafficLegendTable">
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
      <table class="mapFeatureTable">
        <tr v-for="layer in layerList.slice(1)" :key="layer.index">
          <td class="layerSwitchCell mapFeatureCell">
            <label class="switch">
              <input
                type="checkbox"
                @change="clickEvent"
                :checked="layer.visible"
                :value="layer.index"
              />
              <span class="slider round"></span>
            </label>
          </td>
          <td>
            <svg
              preserveAspectRatio="none"
              width="25"
              height="25"
              viewBox="-2 -2 30 30"
              class="mapFeaturesIcon"
            >
              <path
                width="15"
                height="15"
                :d="layerIcons.find((x) => x.title == layer.title).path"
              />
              <path fill="none" />
            </svg>
          </td>
          <td class="layerLabelCell mapFeatureCell">{{ layer.title }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { store, useStore } from "@/store";
import { defineComponent, onMounted, ref } from "vue";
import LayerInfo from "../types/LayerInfo";
import { webmap } from "../esri-stuff/esriMap";
import { mapState } from "vuex";
import { layerListIcons } from "@/symbols/SVGIconDefinitions";
export default defineComponent({
  setup() {
    //#region populate the layer list
    const store = useStore();
    let layerList = ref<LayerInfo[]>([]);
    const layerIcons = layerListIcons;
    const expandIconPath = ref<string>(
      "M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z"
    );
    // const expanded = ref<string>(store.state.mapFeaturesExpanded)
    webmap.layers.map((layer, index) => {
      layerList.value.push({
        index: index,
        title: layer.title,
        visible: layer.visible,
      });
    });
    store.commit("setLayerList", layerList);
    return { layerList, layerIcons, expandIconPath, store };
    //#endregion
  },
  computed: {
    ...mapState(["mapFeaturesExpanded"]),
  },
  methods: {
    //#region toggle layer on and off
    clickEvent: async (evt: Event) => {
      store.state.layerList.map((layer, index) => {
        if (evt.target) {
          const target = evt.currentTarget as HTMLInputElement;
          if (index.toString() == target.value) {
            layer.visible == true
              ? (layer.visible = false)
              : (layer.visible = true);
          }
        }
      });
      store.commit("setLayerList", store.state.layerList);
    },
    handleExpandClicked: function () {
      console.log(store);
      store.state.mapFeaturesExpanded == "block"
        ? (this.expandIconPath =
            "M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z")
        : (this.expandIconPath =
            "M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z");
      store.commit("setMapFeaturesExpanded");
    },
    //#endregion
  },
});
</script>
<style scoped>
#layerListWidget {
  background-color: white;
  box-shadow: 1pt solid grey;
  width: 150px;
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
.layerSwitchCell {
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
  width: 150px;
}
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
}
.mapFeatureCell {
  padding: 2px 2px 2px 0px;
}
.mapFeaturesIcon {
}
tr {
  border: none;
}
</style>
