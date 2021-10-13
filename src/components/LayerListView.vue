<template>
  <!-- Traffic Flow -->
  <div id="layerListWidget" title="Map Features" v-if="layerList.length > 0">
    <ul class="w3-ul" style="padding: 1px 0">
      <li class="w3-border-0 mapFeaturesLI" style="padding: 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('traffic-flow-layer')].visible"
          :Value="getLayerIndex('traffic-flow-layer').toString()"
          :Title="
            'Toggle ' + layerList[getLayerIndex('traffic-flow-layer')].title
          "
        >
          <template v-slot>
            <!-- <div class="mapFeaturesIcon"></div> -->
            <span>Traffic flow</span>
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
    <!-- Traffic Flow Legend -->
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
      <!-- Travel Alerts -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('road-alerts-layer')].visible"
          :Value="
            getLayerIndex('road-alerts-layer').toString()+
            ',' +
            getLayerIndex('road-closures-layer').toString()+
            ',' +
            getLayerIndex('ferry-routes-points-layer').toString()"
          :Title="
            'Toggle ' + layerList[getLayerIndex('road-alerts-layer')].title
          "
        >
          <template v-slot>
            <!-- <div class="mapFeaturesIcon"></div> -->
            <span>Alerts</span>
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
    <table class="roadAlertsLegendTable" role="presentation">
      <tr class="roadAlertsLegendRow">
        <td class="roadAlertsLegendCell">
           <div
              class="roadAlertsIcon"
              v-html="
                layerIcons.find(
                  (x) =>
                    x.id == 'road-alert'
                )?.paths
              "
            ></div>
        </td>
        <td class="roadAlertsLegendCell">
          <div
              class="roadAlertsIcon"
              v-html="
                layerIcons.find(
                  (x) =>
                    x.id == 'road-alert-medium'
                )?.paths
              "
            ></div>
        </td>
        <td class="roadAlertsLegendCell">
         <div
              class="roadAlertsIcon"
              v-html="
                layerIcons.find(
                  (x) =>
                    x.id == 'road-alert-high'
                )?.paths
              "
            ></div>
        </td>
        <td class="roadAlertsLegendCell">
         <div
              class="roadAlertsIcon"
              v-html="
                layerIcons.find(
                  (x) =>
                    x.id == 'road-alert-highest'
                )?.paths
              "
            ></div>
        </td>
        <td class="roadAlertsLegendCell">
          <div
              class="roadAlertsIcon"
              v-html="
                layerIcons.find(
                  (x) =>
                    x.id == 'road-closed'
                )?.paths
              "
            ></div>
        </td>
      </tr>
      <tr>
        <td class="roadAlertsLegendLabelCell">Alert</td>
        <td class="roadAlertsLegendLabelCell">Medium</td>
        <td class="roadAlertsLegendLabelCell">High</td>
        <td class="roadAlertsLegendLabelCell">Highest</td>
        <td class="roadAlertsLegendLabelCell">Closed</td>
      </tr>
    </table>
    <ul class="w3-ul">
      <!-- Traffic Cameras -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('traffic-camera-layer')].visible"
          :Value="
            getLayerIndex('traffic-camera-layer').toString()
          "
          :Title="
            'Toggle ' + layerList[getLayerIndex('traffic-camera-layer')].title
          "
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find(
                  (x) =>
                    x.id == layerList[getLayerIndex('traffic-camera-layer')].id
                )?.paths
              "
            ></div>
            <span class="listLabel">
              {{ layerList[getLayerIndex("traffic-camera-layer")].title }}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Truck Restrictions -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('point-restrictions-layer')].visible"
          :Value="
            getLayerIndex('point-restrictions-layer').toString() +
            ',' +
            getLayerIndex('line-restrictions-layer').toString()
          "
          Title="Toggle Truck Restrictions"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'point-restrictions-layer')
                  ?.paths
              "
            ></div>
            <span class="listLabel" id="CommercialVehicleLabel"
              >Truck restrictions</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Mountain Passes -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('mountain-passes-layer')].visible"
          :Value="getLayerIndex('mountain-passes-layer').toString()"
          :Title="
            'Toggle ' + layerList[getLayerIndex('mountain-passes-layer')].title
          "
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'mountain-passes-layer')?.paths
              "
            ></div>
            <span class="listLabel">
              Mountain pass reports</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Weather Stations -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('weather-stations-layer')].visible"
          :Value="getLayerIndex('weather-stations-layer').toString()"
          :Title="
            'Toggle ' + layerList[getLayerIndex('weather-stations-layer')].title
          "
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'weather-stations-layer')?.paths
              "
            ></div>
            <span class="listLabel">
              Weather stations</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Rest Areas -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('rest-areas-layer')].visible"
          :Value="getLayerIndex('rest-areas-layer').toString()"
          :Title="
            'Toggle ' + layerList[getLayerIndex('rest-areas-layer')].title
          "
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="layerIcons.find((x) => x.id == 'rest-areas-layer')?.paths"
            ></div>
            <span class="listLabel">
              Rest areas</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Park And Rides -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('park-ride-layer')].visible"
          :Value="getLayerIndex('park-ride-layer').toString()"
          :Title="'Toggle ' + layerList[getLayerIndex('park-ride-layer')].title"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="layerIcons.find((x) => x.id == 'park-ride-layer')?.paths"
            ></div>
            <span class="listLabel">
              {{`Park & Rides`}}</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Travel Times -->
      <!-- <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('travel-times-layer')].visible"
          :Value="getLayerIndex('travel-times-layer').toString()"
          :Title="
            'Toggle ' + layerList[getLayerIndex('travel-times-layer')].title
          "
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'travel-times-layer')?.paths
              "
            ></div>
            <span class="listLabel">
              Travel times</span
            >
          </template>
        </ToggleSwitchView>
      </li> -->
      <!--Border Crossings-->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('border-crossings-layer')].visible"
          :Value="
            getLayerIndex('border-crossings-layer').toString()
          "
          Title="Toggle Border Crossings"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'border-crossing')
                  ?.paths
              "
            ></div>
            <span class="listLabel" id="CommercialVehicleLabel"
              >Border crossings</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Wildland Fires -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
        <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="true"
          :Checked="layerList[getLayerIndex('fire-perimeters-layer')].visible"
          :Value="
            getLayerIndex('fire-perimeters-layer').toString() +
            ',' +
            getLayerIndex('fire-incidents-layer').toString()
          "
          Title="Toggle Wildland Fires"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'fire-incidents-layer')?.paths
              "
            ></div>
            <span class="listLabel" id="WildlandFireeLabel"
              >Wildland fires</span
            >
          </template>
        </ToggleSwitchView>
      </li>
      <!-- Mile Markers -->
      <li class="w3-border-0 mapFeaturesLI" style="padding: 1px 0">
       <!-- <ToggleSwitchView
          @toggle="clickEvent"
          :Enabled="mileMarkerToggleEnabled"
          :Checked="layerList[getLayerIndex('mile-markers')].visible"
          :Value="getLayerIndex('mile-markers').toString()"
          :Title="mileMarkerToggleEnabled==true?'Toggle Mile Markers':'Zoom in to enable mile marker toggle'"
        >-->
        <ToggleSwitchView
          @toggle="clickEvent"
          :Checked="layerList[getLayerIndex('mile-markers')].visible"
          :Value="getLayerIndex('mile-markers').toString()"
          :Title="'Toggle Mile Markers'"
          :Enabled="true"
        >
          <template v-slot>
            <div
              class="mapFeaturesIcon"
              v-html="
                layerIcons.find((x) => x.id == 'mile-markers-layer')?.paths
              "
            ></div>
            <span class="listLabel" id="mileMarkersLabel"
              >Mileposts</span
            >
          </template>
        </ToggleSwitchView>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { store, useStore } from "@/store";
import { defineComponent, ref} from "vue";
import { layerListIcons } from "@/symbols/IconDefinitions";
import ToggleSwitchView from "./ToggleSwitchView.vue";
import { mapView } from "@/esri-stuff/esriMap";

export default defineComponent({
  components: { ToggleSwitchView },
  setup() {
    const store = useStore();
    const layerIcons = layerListIcons;
    return { layerIcons, store /*mileMarkerToggleEnabled*/ };
  },
  computed: {
    layerList() {
      return store.state.layerList;
    },
  },
  methods: {
    //#region toggle layer on and off
    clickEvent: async (evt: { checked: boolean; value: string }) => {
      store.state.layerList.map((layer, index) => {
        if (evt) {
          const idxs = evt.value.split(",");
          for (let i = 0; i < idxs.length; i++) {
            if (index.toString() === idxs[i]) {
              layer.visible = evt.checked;
              //console.log(layer.title + ": " + layer.visible);
            }
          }
        }
      });
      store.commit("setLayerList", store.state.layerList);
    },
    getLayerIndex: (id: string): number => {
      let layerIndex = -1;
      // console.log(store.state.layerList)
      //console.log(id)
     // console.log(store.state.layerList)
      store.state.layerList.map((val, index) => {
        if (val.id == id) {
          layerIndex = index;
        }
      });
      return layerIndex;
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
.trafficLegendTable, .roadAlertsLegendTable {
  margin: auto;
  width: 95%;
  /* border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-gray40); */
  margin-bottom: 5px;
}
.trafficLegendCell{
  width: 25%;
  padding: 2px 0px 2px 0px;
  border: 0px;
}
.roadAlertsLegendCell {
  width: 25%;;
  border: 0px;
}
.trafficLegendRow, .roadAlertsLegendRow{
  height: 10px;
}
.trafficLegendLabelCell,.roadAlertsLegendLabelCell {
  background-color: white;
  border: none;
  box-shadow: none;
  font-size: small;
  vertical-align:text-top;
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
