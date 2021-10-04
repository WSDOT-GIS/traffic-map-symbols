interface AppConfig {
   // basemap: string;
    // Operation layer URLs...
    cameras: string;
    lineRestrictions: string;
    mountainPasses: string;
    parkAndRides: string;
    pointRestrictions: string;
    restAreas: string;
    roadAlerts: string;
    borderCrossings: string;
    traffic: string;
    weatherStations: string;
    travelTimes: string;
    // Additional layer URLs...
    countyBoundaries: string;
    regionBoundaries: string;
    // JSON data...
    regionalAlerts: string;
    stateAlerts: string;
    // ESRI API Key...
    apiKey: string;
    // Weather forecast API...
    forecastSummaryAPI: string;
    forecastExtendedAPI: string,
    fireIncidents: string,
    firePerimeters: string,
    mileMarkers: string,
    esriPlacesReferenceLayer: string,
    esriRoadsReferenceLayer: string,
    stateRouteShieldsLayer: string,
    ferryRouteLines: string, 
    ferryRoutePoints: string,
    // Layer refresh interval in minutes...
    layerRefreshMinute: number;
}

export default AppConfig;