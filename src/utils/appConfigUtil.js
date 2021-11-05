"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.loadConfig = void 0;
const tslib_1 = require("tslib");
let appConfig;
const loadConfig = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!appConfig) {
        //include path where application was loaded from.  QA/Prod will be different than local dev.
        const href = window.location.pathname;
        const dir = href.substring(0, href.lastIndexOf('/'));
        const fetchResponse = yield fetch(dir + "/appconfig.json");
        const config = yield fetchResponse.json();
        appConfig = config;
    }
    return appConfig;
});
exports.loadConfig = loadConfig;
const getConfig = () => {
    if (!appConfig) {
        throw "App.config is not loaded yet.";
    }
    return appConfig;
};
exports.getConfig = getConfig;
//# sourceMappingURL=appConfigUtil.js.map