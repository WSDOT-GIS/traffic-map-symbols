import AlertInfo from "@/types/AlertInfo";

export const getAlerts = async (url: string):Promise<AlertInfo[]> => {
    const alerts: AlertInfo[] = [];
    const fetchResponse = await fetch(url);
    const json = await fetchResponse.json();
    json.features.forEach((each: { attributes: AlertInfo; }) => {
        alerts.push(each.attributes);
    });
    
    return alerts;
}