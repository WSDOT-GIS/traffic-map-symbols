let appConfig;
export const getConfig = async () => {
    if (!appConfig) {
        console.log("************ Fetch config...");
        const fetchResponse = await fetch("/appconfig.json");
        const config = await fetchResponse.json();
        appConfig = config;
    }
    console.log("************ Got config...");
    return appConfig;
};
// export const loadOperationalLayers = async (): Promise<void> => {
//     const fetchResponse = await fetch("/appconfig.json");
//     const config = await fetchResponse.json();
//     EsriConfig.apiKey = config.apiKey;
//     const trafficLyr = initTrafficLayer(config.traffic);
//     const restAreasLyr = initRestAreaLayer(config.restAreas);
//     const parkRideLyr = initParkRideLayer(config.parkAndRides);
//     const weatherLyr = initWeatherLayer(config.weatherStations);
//     const mtLyr = initMountainLayer(config.mountainPasses);
//     const lineRestrictionLyr = initLineRestrictionsLayer(config.lineRestrictions);
//     const pointRestrictionLyr = initPointRestrictionsLayer(config.pointRestrictions);
//     const cameraLyr = initCameraLayer(config.cameras)
//     const roadAlertsLyr = initRoadAlertsLayer(config.roadAlerts)
//# sourceMappingURL=appConfigUtil.js.map