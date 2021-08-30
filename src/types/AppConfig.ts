interface AppConfig {
    basemap: string;
    // Operation layer URLs...
    cameras: string;
    lineRestrictions: string;
    mountainPasses: string;
    parkAndRides: string;
    pointRestrictions: string;
    restAreas: string;
    roadAlerts: string;
    traffic: string;
    weatherStations: string;
    travelTimes: string;
    // ESRI API Key...
    apiKey: string;
    // Weather forecast API...
    forecastSummaryAPI: string;
    forecastExtendedAPI: string,
    fireIncidents:string,
    firePerimeters:string,
    mileMarkers: string,
    // Layer refresh interval in minutes...
    layerRefreshMinute: number;
}

export default AppConfig;