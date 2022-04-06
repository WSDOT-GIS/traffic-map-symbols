let appConfig;
export const loadConfig = async () => {
    if (!appConfig) {
        //include path where application was loaded from.  QA/Prod will be different than local dev.
        const href = window.location.pathname;
        const dir = href.substring(0, href.lastIndexOf('/'));
        const fetchResponse = await fetch(dir + "/appConfig.json");
        const config = await fetchResponse.json();
        appConfig = config;
    }
    return appConfig;
};
export const getConfig = () => {
    if (!appConfig) {
        throw "App.config is not loaded yet.";
    }
    return appConfig;
};
//# sourceMappingURL=appConfigUtil.js.map