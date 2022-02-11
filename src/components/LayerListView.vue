<template>
  <div id="layer-list-widget" title="Map Features" v-if="layerList.length > 0">
    <!-- Column headers -->
    <div class="layer-list-header-row">
      <h6>Data layers</h6>
      <h6>Turn on/off</h6>
    </div>
    <!-- Traffic Flow -->
    <ToggleSwitchView
      @toggle="clickEvent"
      :Enabled="true"
      :Checked="layerList[getLayerIndex('traffic-flow-layer')].visible"
      :Value="getLayerIndex('traffic-flow-layer').toString()"
      :Title="'Toggle ' + layerList[getLayerIndex('traffic-flow-layer')].title"
    >
      <template v-slot>
        <span class="layer-list-item-text">Traffic flow</span>
      </template>
    </ToggleSwitchView>
    <!-- Traffic Flow Legend -->
    <!-- https://www.emailonacid.com/blog/article/email-development/why-should-i-set-my-table-role-as-presentation/ -->
    <table class="trafficLegendTable" role="presentation">
      <tr class="trafficLegendRow">
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="fastLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="mediumFastLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowMediumLegendCell">&nbsp;</div>
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
    <!-- Road Alerts -->
    <ToggleSwitchView
      @toggle="clickEvent"
      :Enabled="true"
      :Checked="layerList[getLayerIndex('road-alerts-layer')].visible"
      :Value="
        getLayerIndex('road-alerts-layer').toString() +
        ',' +
        getLayerIndex('road-closures-layer').toString() +
        ',' +
        getLayerIndex('ferry-routes-points-layer').toString()
      "
      :Title="'Toggle ' + layerList[getLayerIndex('road-alerts-layer')].title"
    >
      <template v-slot>
        <span class="layer-list-item-text">Alerts</span>
      </template>
    </ToggleSwitchView>
    <!-- Road alerts legend -->
    <div class="alerts-legend-container">
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert')?.paths"
        ></div>
        <div class="alerts-legend-label">Low</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert-medium')?.paths"
        ></div>
        <div class="alerts-legend-label">Medium</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert-highest')?.paths"
        ></div>
        <div class="alerts-legend-label">High</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-closed')?.paths"
        ></div>
        <div class="alerts-legend-label">Closure</div>
      </div>
    </div>

    <!-- Traffic Cameras -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('traffic-camera-layer')].visible"
        :Value="getLayerIndex('traffic-camera-layer').toString()"
        :Title="'Toggle ' + layerList[getLayerIndex('traffic-camera-layer')].title"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="
                layerIcons.find((x) => x.id == layerList[getLayerIndex('traffic-camera-layer')].id)
                  ?.paths
              "
            ></div>
            <span class="layer-list-item-text">Cameras</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Truck Restrictions -->
    <div class="layer-list-row">
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
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'point-restrictions-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Truck restrictions (over size/weight)</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Mountain Passes -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('mountain-passes-layer')].visible"
        :Value="getLayerIndex('mountain-passes-layer').toString()"
        :Title="'Toggle ' + layerList[getLayerIndex('mountain-passes-layer')].title"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'mountain-passes-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Mountain pass reports</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Weather Stations -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('weather-stations-layer')].visible"
        :Value="getLayerIndex('weather-stations-layer').toString()"
        :Title="'Toggle ' + layerList[getLayerIndex('weather-stations-layer')].title"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'weather-stations-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Weather stations</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Rest Areas -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('rest-areas-layer')].visible"
        :Value="getLayerIndex('rest-areas-layer').toString()"
        :Title="'Toggle ' + layerList[getLayerIndex('rest-areas-layer')].title"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'rest-areas-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Rest areas</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Park And Rides -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('park-ride-layer')].visible"
        :Value="getLayerIndex('park-ride-layer').toString()"
        :Title="'Toggle ' + layerList[getLayerIndex('park-ride-layer')].title"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'park-ride-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Park &amp; Rides</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
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
              class="layer-list-item-icon"
              v-html="
                layerIcons.find((x) => x.id == 'travel-times-layer')?.paths
              "
            ></div>
            <span class="layer-list-item-text">
              Travel times</span
            >
          </template>
        </ToggleSwitchView>
      </li> -->
    <!--Border Crossings-->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('border-crossings-layer')].visible"
        :Value="getLayerIndex('border-crossings-layer').toString()"
        Title="Toggle Border Crossings"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'border-crossing')?.paths"
            ></div>
            <span class="layer-list-item-text">Border crossing wait times</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Wildland Fires -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="layerList[getLayerIndex('fire-perimeters-layer')].visible ?? false"
        Value="fire-perimeters-layer,fire-incidents-layer"
        Title="Toggle Wildland Fires"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'fire-incidents-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Wildland fires</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
    <!-- Mile Markers -->
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Checked="layerList[getLayerIndex('mile-markers')].visible ?? false"
        Value="mile-markers"
        :Title="'Toggle Mile Markers'"
        :Enabled="true"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'mile-markers-layer')?.paths"
            ></div>
            <div class="layer-list-item-text">Mileposts</div>
          </div>
        </template>
      </ToggleSwitchView>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { layerListIcons } from "@/symbols/IconDefinitions";
import ToggleSwitchView from "./ToggleSwitchView.vue";

export default defineComponent({
  components: { ToggleSwitchView },
  setup() {
    const store = useStore();
    const layerIcons = layerListIcons;
    const layerList = computed(() => store.state.layerList);
    //#region toggle layer on and off
    const clickEvent = async (evt: { checked: boolean; value: string }) => {
      console.log(evt.value);
      const ids = evt.value.split(",");
      store.dispatch("modifyLayerVisibility", {ids: ids, visible: evt.checked});
      // store.state.layerList.map((layer, index) => {
      //   if (evt) {
      //     const idxs = evt.value.split(",");
      //     for (let i = 0; i < idxs.length; i++) {
      //       if (index.toString() === idxs[i]) {
      //         layer.visible = evt.checked;
      //       }
      //     }
      //   }
      // });
      // store.commit("setLayerList", store.state.layerList);
    }
    const getLayerIndex = (id: string): number => {
      let layerIndex = -1;
      store.state.layerList.map((val, index) => {
        if (val.id == id) {
          layerIndex = index;
        }
      });
      return layerIndex;
    }

    return { layerIcons, layerList, clickEvent, getLayerIndex };
  },
  // computed: {
  //   layerList() {
  //     return store.state.layerList;
  //   },
  // },
  // methods: {
  //   //#region toggle layer on and off
  //   clickEvent: async (evt: { checked: boolean; value: string }) => {
  //     store.state.layerList.map((layer, index) => {
  //       if (evt) {
  //         const idxs = evt.value.split(",");
  //         for (let i = 0; i < idxs.length; i++) {
  //           if (index.toString() === idxs[i]) {
  //             layer.visible = evt.checked;
  //           }
  //         }
  //       }
  //     });
  //     store.commit("setLayerList", store.state.layerList);
  //   },
  //   getLayerIndex: (id: string): number => {
  //     let layerIndex = -1;
  //     store.state.layerList.map((val, index) => {
  //       if (val.id == id) {
  //         layerIndex = index;
  //       }
  //     });
  //     return layerIndex;
  //   },

  //   //#endregion
  // },
});
</script>
<style scoped>
#layer-list-widget {
  padding-bottom: 16px;
}
.layer-list-header-row {
  display: flex;
  justify-content: space-between;
}
.layer-list-header-row h6 {
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-heavy);
}
.layer-list-row {
  margin: 10px 0;
}
.layer-list-item-label {
  display: flex;
  align-items: left;
}
.layer-list-item-icon {
  margin-right: 1rem;
  height: 2rem;
  width: 2rem;
}
.layer-list-item-text {
  font-size: var(--type-scale-base3);
  line-height: var(--type-scale-base7);
  font-weight: var(--font-weight-normal);
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
  height: 8px;
  margin: 0;
  border-style: none;
}
.trafficLegendTable,
.roadAlertsLegendTable {
  margin-left: 14px;
  width: 80%;
  margin-bottom: 5px;
}
.trafficLegendCell {
  width: 25%;
  padding: 0;
  border: 0px;
}
.roadAlertsLegendCell {
  width: 25%;
  border: 0px;
}
.trafficLegendRow,
.roadAlertsLegendRow {
  height: 10px;
}
.trafficLegendLabelCell,
.roadAlertsLegendLabelCell {
  background-color: white;
  border: none;
  box-shadow: none;
  font-size: var(--type-scale-base0);
  line-height: var(--type-scale-base7);
  font-weight: var(--font-weight-normal);
  vertical-align: text-top;
}
tr {
  border: none;
}
.alerts-legend-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  max-width: 80%;
  margin-left: 14px;
  margin-bottom: 14px;
}
.alerts-legend-item {
  display: flex;
  flex-direction: column;
}

.alerts-legend-label {
  font-size: var(--type-scale-base0);
  line-height: var(--type-scale-base2);
  font-weight: var(--font-weight-normal);
}
</style>
