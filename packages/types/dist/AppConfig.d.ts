/**
 * Configuration settings for the application.
 */
export default interface AppConfig {
    /** DOT root URL */
    wsdotRoot: string;
    /** DOT basemap URL */
    basemap: string;
    /** cameras operational layer */
    cameras: string;
    /** lineRestrictions operational layer */
    lineRestrictions: string;
    /** mountainPasses operational layer */
    mountainPasses: string;
    /** parkAndRides operational layer */
    parkAndRides: string;
    /** pointRestrictions operational layer */
    pointRestrictions: string;
    /** restAreas operational layer */
    restAreas: string;
    /** currentRoadAlertPoint operational layer */
    currentRoadAlertPoint: string;
    /** currentRoadAlertLine operational layer */
    currentRoadAlertLine: string;
    /** currentRoadClosureLine operational layer */
    currentRoadClosureLine: string;
    /** borderCrossings operational layer */
    borderCrossings: string;
    /** traffic operational layer */
    traffic: string;
    /** weatherStations operational layer */
    weatherStations: string;
    /** travelTimes operational layer */
    travelTimes: string;
    /** countyBoundaries layer */
    countyBoundaries: string;
    /** regionBoundaries layer */
    regionBoundaries: string;
    /** regionalAlerts JSON data URL */
    regionalAlerts: string;
    /** stateAlerts JSON data URL */
    stateAlerts: string;
    apiKey: string;
    forecastSummaryAPI: string;
    /** forecastExtendedAPI JSON data URL */
    forecastExtendedAPI: string;
    /** fireIncidents JSON data URL */
    fireIncidents: string;
    /** firePerimeters JSON data URL */
    firePerimeters: string;
    /** mileMarkers JSON data URL */
    mileMarkers: string;
    /** esriPlacesReferenceLayer JSON data URL */
    esriPlacesReferenceLayer: string;
    /** esriRoadsReferenceLayer JSON data URL */
    esriRoadsReferenceLayer: string;
    /** stateRouteShieldsLayer JSON data URL */
    stateRouteShieldsLayer: string;
    /** ferryRoutesReferenceLayer JSON data URL */
    ferryRoutesReferenceLayer: string;
    /** ferryRouteLines JSON data URL */
    ferryRouteLines: string;
    /** ferryRoutePoints JSON data URL */
    ferryRoutePoints: string;
    /** ferryAlerts JSON data URL */
    ferryAlerts: string;
    /** Layer refresh interval in minutes… */
    layerRefreshMinute: number;
    /** Google Analytics ID */
    googleAnalyticsID: string;
    /** Application theme. E.g. "Go Orange" */
    appTheme: string;
}
//# sourceMappingURL=AppConfig.d.ts.map