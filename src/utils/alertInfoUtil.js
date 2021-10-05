"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFerryAlerts = exports.getAlerts = void 0;
const tslib_1 = require("tslib");
const getAlerts = (url) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const alerts = [];
    const fetchResponse = yield fetch(url);
    const json = yield fetchResponse.json();
    json.features.forEach((each) => {
        alerts.push(each.attributes);
    });
    return alerts;
});
exports.getAlerts = getAlerts;
const getFerryAlerts = (url) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ferryAlerts = [];
    const fetchResponse = yield fetch(url);
    const json = yield fetchResponse.json();
    json.features.forEach((each) => {
        ferryAlerts.push(each.attributes);
    });
    return ferryAlerts;
});
exports.getFerryAlerts = getFerryAlerts;
//# sourceMappingURL=alertInfoUtil.js.map