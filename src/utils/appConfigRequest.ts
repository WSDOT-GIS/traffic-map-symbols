import AppConfig from "@/types/AppConfig"
export const getAppConfig = async(content:string)=>{
    let appConfig
    fetch(`${window.location.href}/appconfig.json`)
    .then(response => response.json())
    .then(data => {
        appConfig = data as AppConfig
    })
    return appConfig
}