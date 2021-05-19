import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Symbol from "@/symbols/ParkRideSymbol";
import Popup from "@/popup-templates/ParkRidePopup"; 

const rdrParkRide = new SimpleRenderer({ symbol: Symbol });

const layer = new GeoJSONLayer({
    //   url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
    url: "/data/park-ride.geojson",
    renderer: rdrParkRide,
    popupTemplate: Popup,
});

export default layer