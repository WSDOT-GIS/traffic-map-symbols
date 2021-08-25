<template>
  <div id="layerListWidget" title="Map Features" v-if="layerList.length > 0">
    <ul class="w3-ul" style="padding: 1px 0">
      <li class="w3-border-0 mapFeaturesLI" style="padding: 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 10].visible"
          :Value="layerList[layerList.length - 10].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 10].title"
        >
          <template v-slot>
            <!-- <div class="mapFeaturesIcon"></div> -->
            <span>Traffic Flow</span>
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
    <!-- https://www.emailonacid.com/blog/article/email-development/why-should-i-set-my-table-role-as-presentation/ -->
    <table class="trafficLegendTable" role="presentation">
      <tr class="trafficLegendRow">
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="fastLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="mediumFastLegendCell">
            &nbsp;
          </div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowMediumLegendCell">
            &nbsp;
          </div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowLegendCell">&nbsp;</div>
        </td>
      </tr>
      <tr>
        <td class="trafficLegendLabelCell">Clear</td>
        <td class="trafficLegendLabelCell">Moving</td>
        <td class="trafficLegendLabelCell">Slow</td>
        <td class="trafficLegendLabelCell">Stop &#38; Go</td>
      </tr>
    </table>
    <ul class="w3-ul">
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 1].visible"
          :Value="layerList[layerList.length - 1].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 1].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 1].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 1].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 2].visible"
          :Value="layerList[layerList.length - 2].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 2].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 2].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 2].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>

      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 3].visible"
          :Value="
            layerList[layerList.length - 3].index.toString() +
            ',' +
            layerList[layerList.length - 4].index.toString()
          "
          Title="Toggle Truck Restrictions"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 3].id
                )?.paths
              "
            ></div>
            <span class="listLabel" id="CommercialVehicleLabel"
              >Truck Restrictions</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 5].visible"
          :Value="layerList[layerList.length - 5].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 5].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 5].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 5].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 6].visible"
          :Value="layerList[layerList.length - 6].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 6].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 6].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 6].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 7].visible"
          :Value="layerList[layerList.length - 7].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 7].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 7].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 7].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 8].visible"
          :Value="layerList[layerList.length - 8].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 8].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 8].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 8].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[layerList.length - 9].visible"
          :Value="layerList[layerList.length - 9].index.toString()"
          :Title="'Toggle ' + layerList[layerList.length - 9].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) => x.id == layerList[layerList.length - 9].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[layerList.length - 9].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { store, useStore } from "@/store";
import { defineComponent } from "vue";
import { layerListIcons } from "@/symbols/IconDefinitions";
import ToggleSwitchView from "./ToggleSwitchView.vue";
import { webmap } from "@/esri-stuff/esriMap";
export default defineComponent({
  components: { ToggleSwitchView },
  setup() {
    const store = useStore();
    const layerIcons = layerListIcons;
    return { layerIcons, store };
  },
  computed: {
    layerList() {
      return store.state.layerList;
    },
  },
  methods: {
    //#region toggle layer on and off
    clickEvent: async (evt: { checked: boolean; value: string }) => {
      console.log("clickevent fired")
      console.log(store.state.layerList)
      store.state.layerList.map((layer, index) => {
        if (evt) {
          console.log(evt)
          const idxs = evt.value.split(",");
          console.log(idxs)
          console.log(index.toString())
          for (let i = 0; i < idxs.length; i++) {
            if (index.toString() === idxs[i]) {
              layer.visible = evt.checked;
            }
          }
        }
      });
      store.commit("setLayerList", store.state.layerList);
      /*
       setLayerList(state, payload) {
            state.layerList = payload;
            webmap.layers.map((layer, index) => {
                if (layer.title && state.layerList[index] && layer.title == state.layerList[index].title) {
                    layer.visible = state.layerList[index].visible
                }
            })
        },
      */
    },

    //#endregion
  },
});
</script>
<style scoped>
.listLabel-trafficFlow {
  font-size: small;
}
.listLabel {
  position: absolute;
  font-size: small;
  margin-left: 30px;
  text-align: left;
}
#slowLegendCell {
  background-color: #c80000;
}
#slowMediumLegendCell {
  background-color: #ffaa00;
}
#mediumFastLegendCell {
  background-color: #ffff00;
}
#fastLegendCell {
  background-color: #00d700;
}
.trafficLegendSymbolDiv {
  height: 10px;
  margin: 1px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-gray20);
}
.mapFeaturesLI {
  margin-bottom: 5px;
}
.trafficLegendTable {
  margin: auto;
  width: 95%;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-gray40);
  margin-bottom: 5px;
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
#CommercialVehicleLabel {
  font-size: 9pt;
  word-wrap: break-word;
}
.mapFeaturesIcon {
  height: 20px;
  width: 20px;
}
tr {
  border: none;
}
</style>
