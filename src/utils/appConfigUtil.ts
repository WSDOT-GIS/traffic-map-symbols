import AppConfig from "@/types/AppConfig"

let appConfig: AppConfig | undefined;

export const loadConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        //include path where application was loaded from.  QA/Prod will be different than local dev.
        const href = window.location.pathname;
        let dir = href.substring(0, href.toLowerCase().lastIndexOf("/travel/real-time/map"));
        dir = !dir ? "" : dir;
        const fetchResponse = await fetch(dir + "/appConfig.json");
        const config = await fetchResponse.json();
        appConfig = config as AppConfig;
        console.log(appConfig)
    }
    return appConfig;

}

export const getConfig = (): AppConfig => {
    if (!appConfig) {
        throw "App.config is not loaded yet.";
    }
    return appConfig;
}
