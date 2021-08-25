import AppConfig from "@/types/AppConfig"

let appConfig: AppConfig | undefined;


export const getConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        //include path where application was loaded from.  QA/Prod will be different than local dev.
        const href = window.location.pathname;
        const dir = href.substring(0, href.lastIndexOf('/'));
        const fetchResponse = await fetch(dir + "/appconfig.json");
        const config = await fetchResponse.json();
        appConfig = config as AppConfig;
    }
    return appConfig;

}
