import type AlertInfo from "../types/AlertInfo";
import type FerryAlertInfo from "../types/FerryAlertInfo";
import { fetchJson } from "../utils/miscUtil"
import { isEsriRows } from "../utils/typeUtil"

/*** Statewide alerts *******************/
let stateAlertUrl: string;

/**
 * Initialize state alerts
 * 
 * @param url  - State Alert URL
 */
export const initStateAlerts = (url: string): void => {
    stateAlertUrl = url;
}

/**
 * Gets the state alerts.
 */
export const getStateAlerts = async (): Promise<AlertInfo[]> => {
    if (!stateAlertUrl) {
        throw "State alert URL is not set yet."
    }
    const json = await fetchJson(stateAlertUrl);
    const alerts: AlertInfo[] = [];
    if (isEsriRows(json)) {
        json.features.forEach((each: { attributes: unknown }) => {
            alerts.push(each.attributes as AlertInfo);
        });
    }
    return alerts;
}

/*** Ferry Alerts ***************/
let ferryAlerts: FerryAlertInfo[] | undefined;
let ferryAlertUrl: string;

/**
 * Initialize the ferry alerts.
 * 
 * @param url  - Ferry alerts URL
 */
export const initFerryAlerts = (url: string): void => {
    ferryAlertUrl = url;
}

/**
 * Get the ferry alerts corresponding to the given route ID.
 * 
 * @param routeId  - Route identifier.
 * @returns an array of {@link FerryAlertInfo} objects.
 */
export const getFerryAlerts = async (routeId: number|"all"): Promise<FerryAlertInfo[]> => {
    if (!ferryAlertUrl) {
        throw "Ferry Alerts URL is not set yet.";
    }
    if (!ferryAlerts) {
        await reloadFerryAlerts(true);
    }
    let alerts: FerryAlertInfo[];
    if (ferryAlerts) {
        if(routeId!="all"){
            alerts = ferryAlerts.filter((each) => {
                return each.FerryRouteId === routeId;
            }).sort((a, b) => {
                return a.SortOrder - b.SortOrder;
            })
        }
        else{
            alerts = ferryAlerts 
        }
        
    } else {
        alerts = [];
    }
    return alerts;
}

/**
 * Reloads the ferry alerts.
 * 
 * @param force  - Forces the alerts to be reloaded even if they have already been loaded.
 */
export const reloadFerryAlerts = async (force?: boolean): Promise<void> => {
    if (!force && !ferryAlerts) {
        return;
    }
    const json = await fetchJson(ferryAlertUrl);
    ferryAlerts = [];
    if (isEsriRows(json)) {
        json.features.forEach((each: { attributes: unknown; }) => {
            ferryAlerts?.push(each.attributes as FerryAlertInfo);
        });
    }
}