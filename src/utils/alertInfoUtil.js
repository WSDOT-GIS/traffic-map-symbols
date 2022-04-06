import { fetchJson } from "@/utils/miscUtil";
import { isEsriRows } from "@/utils/typeUtil";
/*** Statewide alerts *******************/
let stateAlertUrl;
export const initStateAlerts = (url) => {
    stateAlertUrl = url;
};
export const getStateAlerts = async () => {
    if (!stateAlertUrl) {
        throw "State alert URL is not set yet.";
    }
    const json = await fetchJson(stateAlertUrl);
    const alerts = [];
    if (isEsriRows(json)) {
        json.features.forEach((each) => {
            alerts.push(each.attributes);
        });
    }
    return alerts;
};
/*** Ferry Alerts ***************/
let ferryAlerts;
let ferryAlertUrl;
export const initFerryAlerts = (url) => {
    ferryAlertUrl = url;
};
export const getFerryAlerts = async (routeId) => {
    if (!ferryAlertUrl) {
        throw "Ferry Alerts URL is not set yet.";
    }
    if (!ferryAlerts) {
        await reloadFerryAlerts(true);
    }
    let alerts;
    if (ferryAlerts) {
        alerts = ferryAlerts.filter((each) => {
            return each.FerryRouteId === routeId;
        }).sort((a, b) => {
            return a.SortOrder - b.SortOrder;
        });
    }
    else {
        alerts = [];
    }
    return alerts;
};
export const reloadFerryAlerts = async (force) => {
    if (!force && !ferryAlerts) {
        return;
    }
    const json = await fetchJson(ferryAlertUrl);
    ferryAlerts = [];
    if (isEsriRows(json)) {
        json.features.forEach((each) => {
            ferryAlerts === null || ferryAlerts === void 0 ? void 0 : ferryAlerts.push(each.attributes);
        });
    }
};
//# sourceMappingURL=alertInfoUtil.js.map