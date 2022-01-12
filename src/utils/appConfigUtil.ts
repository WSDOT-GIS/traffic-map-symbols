import AppConfig from "@/types/AppConfig"

let appConfig: AppConfig | undefined;

export const loadConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        //include path where application was loaded from.  QA/Prod will be different than local dev.
        // const href = window.location.pathname;
        // const dir = href.substring(0, href.lastIndexOf('/'));
        const fetchResponse = await fetch("/appConfig.json");
        const config = await fetchResponse.json();
        appConfig = config as AppConfig;
    }
    return appConfig;

}

export const getConfig = (): AppConfig => {
    if (!appConfig) {
        throw "App.config is not loaded yet.";
    }
    return appConfig;
}
