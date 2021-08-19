import AppConfig from "@/types/AppConfig"

let appConfig: AppConfig | undefined;


export const getConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        //include path where application was loaded from
        var href = window.location.pathname;
        var dir = href.substring(0, href.lastIndexOf('/'));
        const fetchResponse = await fetch(dir + "/appconfig.json");
        const config = await fetchResponse.json();
        appConfig = config as AppConfig;
    }
    return appConfig;

}
