import AlertInfo from "@/types/AlertInfo";
import FerryAlertInfo from "@/types/FerryAlertInfo";

export const getAlerts = async (url: string):Promise<AlertInfo[]> => {
    const alerts: AlertInfo[] = [];
    const fetchResponse = await fetch(url);
    const json = await fetchResponse.json();
    json.features.forEach((each: { attributes: AlertInfo; }) => {
        alerts.push(each.attributes);
    });
    
    return alerts;
}

export const getFerryAlerts = async (url: string):Promise<FerryAlertInfo[]> => {
    const ferryAlerts: FerryAlertInfo[] = [];
    const myHeaders = new Headers();
    myHeaders.append('Content-Type','text/plain; charset=unicode');
    const fetchResponse = await fetch(url, {headers: myHeaders});
    const json = await fetchResponse.json();
    json.features.forEach((each: { attributes: FerryAlertInfo; }) => {
        console.log(each.attributes)
        ferryAlerts.push(each.attributes);
    });
    return ferryAlerts;
}