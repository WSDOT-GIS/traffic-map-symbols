interface AppConfig {
    // DOT root URL
    wsdotRoot: string;
    // DOT basemap URL
    basemap: string;
    // Operation layer URLs...
    cameras: string;
    lineRestrictions: string;
    mountainPasses: string;
    parkAndRides: string;
    pointRestrictions: string;
    restAreas: string;
    roadAlerts: string;
    lineRoadAlerts: string;
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
    // ESRI API Key... Do not need this right now...
    // apiKey: string;
    // Weather forecast API...
    //forecastSummaryAPI: string;
    forecastExtendedAPI: string,
    fireIncidents: string,
    firePerimeters: string,
    mileMarkers: string,
    esriPlacesReferenceLayer: string,
    esriRoadsReferenceLayer: string,
    stateRouteShieldsLayer: string,
    ferryRoutesReferenceLayer: string,
    ferryRouteLines: string,
    ferryRoutePoints: string,
    ferryAlerts: string,
    // Layer refresh interval in minutes...
    layerRefreshMinute: number;
    googleAnalyticsID: string;
    appTheme: string
}

export default AppConfig;