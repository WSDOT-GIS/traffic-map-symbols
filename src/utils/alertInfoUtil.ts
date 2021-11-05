import AlertInfo from "@/types/AlertInfo";
import FerryAlertInfo from "@/types/FerryAlertInfo";
import { fetchJson } from "@/utils/miscUtil"
import { isEsriRows } from "@/utils/typeUtil"

/*** Statewide alerts *******************/
let stateAlertUrl: string;
export const initStateAlerts = (url: string): void => {
    stateAlertUrl = url;
}

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

export const initFerryAlerts = (url: string): void => {
    ferryAlertUrl = url;
}

export const getFerryAlerts = async (routeId: number): Promise<FerryAlertInfo[]> => {
    if (!ferryAlertUrl) {
        throw "Ferry Alerts URL is not set yet.";
    }
    if (!ferryAlerts) {
        await reloadFerryAlerts(true);
    }
    let alerts: FerryAlertInfo[];
    if (ferryAlerts) {
        alerts = ferryAlerts.filter((each) => {
            return each.FerryRouteId === routeId;
        }).sort((a, b) => {
            return a.SortOrder - b.SortOrder;
        })
    } else {
        alerts = [];
    }
    return alerts;
}

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