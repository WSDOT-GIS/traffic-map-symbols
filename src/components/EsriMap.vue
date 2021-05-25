<template>
  <div id="map_view"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EsriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import ScaleBar from "@arcgis/core/widgets/ScaleBar"
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion"
import Expand from "@arcgis/core/widgets/Expand";
import Locate from "@arcgis/core/widgets/Locate"
import WsdotBasemap from "@/layers/WsdotBasemap";
import TrafficLayer from "@/layers/TrafficLayer";
import ParkRideLayer from "@/layers/ParkRideLayer";
import {basemapWidget} from "@/mapwidgets/basemapWidget";
import {legendWidget} from "@/mapwidgets/legendWidget"

// What is this used for?
//EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export default defineComponent({
  components: {},
  async mounted() {
    const webMap = new WebMap({
      basemap: WsdotBasemap,
      layers: [TrafficLayer, ParkRideLayer],
    });

    const mapView = new MapView({
      container: "map_view", // https://v3.vuejs.org/api/instance-properties.html
      map: webMap,
      extent: {
        ymax: 6316025.98739708,
        xmin: -13911155.7073957,
        xmax: -12984203.1967109,
        ymin: 5704865.77272526,
        spatialReference: { wkid: 102100 },
      },
    });
//#region bookmarks widget
    const bookmarks = new Bookmarks({
      view: mapView,
      editingEnabled: true,
    });

    const bookmarkExpand = new Expand({
      view: mapView,
      content: bookmarks,
      expanded: false,
    });
    mapView.ui.add(bookmarkExpand, "top-right");
//#endregion
//#region scalebar widget
    const scaleBar = new ScaleBar({
      view: mapView,
      style: "ruler"
    })
    mapView.ui.add(scaleBar, "bottom-left");
//#endregion
//#region basemap switcher widget
    const _basemapWidget = document.getElementById("basemapWidget")
    _basemapWidget?.appendChild(new basemapWidget(webMap).widgetDiv)
//#endregion
//#region basemap switcher widget
    const _legendWidget = document.getElementById("legendWidget")
    _legendWidget?.appendChild(new legendWidget(webMap).widgetDiv)
//#endregion
//#region CoordinateConversion widget
    const coordinateConversionWidget = new CoordinateConversion({
      view: mapView
    })
    mapView.ui.add(coordinateConversionWidget,"bottom-left")
//#endregion
//#region locate widget
    const locateWidget = new Locate({
      view: mapView
    })
    mapView.ui.add(locateWidget,"bottom-right")
//#endregion
  },
});
</script>

<style scoped>
@import "https://js.arcgis.com/4.19/@arcgis/core/assets/esri/themes/light/main.css";
div#map_view {
    padding: 0;
    margin: 0;
    height: 70%;
    width: 100%;
}


</style>
