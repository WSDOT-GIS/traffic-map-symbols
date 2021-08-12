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
//# sourceMappingURL=appConfigUtil.js.map