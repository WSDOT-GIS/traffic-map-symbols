"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadFerryAlerts = exports.getFerryAlerts = exports.initFerryAlerts = exports.getStateAlerts = exports.initStateAlerts = void 0;
const tslib_1 = require("tslib");
const miscUtil_1 = require("@/utils/miscUtil");
const typeUtil_1 = require("@/utils/typeUtil");
/*** Statewide alerts *******************/
let stateAlertUrl;
const initStateAlerts = (url) => {
    stateAlertUrl = url;
};
exports.initStateAlerts = initStateAlerts;
const getStateAlerts = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!stateAlertUrl) {
        throw "State alert URL is not set yet.";
    }
    const json = yield miscUtil_1.fetchJson(stateAlertUrl);
    const alerts = [];
    if (typeUtil_1.isEsriRows(json)) {
        json.features.forEach((each) => {
            alerts.push(each.attributes);
        });
    }
    return alerts;
});
exports.getStateAlerts = getStateAlerts;
/*** Ferry Alerts ***************/
let ferryAlerts;
let ferryAlertUrl;
const initFerryAlerts = (url) => {
    ferryAlertUrl = url;
};
exports.initFerryAlerts = initFerryAlerts;
const getFerryAlerts = (routeId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!ferryAlertUrl) {
        throw "Ferry Alerts URL is not set yet.";
    }
    if (!ferryAlerts) {
        yield exports.reloadFerryAlerts(true);
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
});
exports.getFerryAlerts = getFerryAlerts;
const reloadFerryAlerts = (force) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!force && !ferryAlerts) {
        return;
    }
    const json = yield miscUtil_1.fetchJson(ferryAlertUrl);
    ferryAlerts = [];
    if (typeUtil_1.isEsriRows(json)) {
        json.features.forEach((each) => {
            ferryAlerts === null || ferryAlerts === void 0 ? void 0 : ferryAlerts.push(each.attributes);
        });
    }
});
exports.reloadFerryAlerts = reloadFerryAlerts;
//# sourceMappingURL=alertInfoUtil.js.map