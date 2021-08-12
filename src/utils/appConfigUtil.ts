import AppConfig from "@/types/AppConfig"

let appConfig: AppConfig | undefined;


export const getConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        console.log("************ Fetch config...");
        const fetchResponse = await fetch("/appconfig.json");
        const config = await fetchResponse.json();
        appConfig = config as AppConfig;
    }
    console.log("************ Got config...");
    return appConfig;

}
