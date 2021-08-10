"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppConfig = void 0;
const tslib_1 = require("tslib");
const getAppConfig = (content) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let appConfig;
    fetch(`${window.location.href}/appconfig.json`)
        .then(response => response.json())
        .then(data => {
        appConfig = data;
    });
    return appConfig;
});
exports.getAppConfig = getAppConfig;
//# sourceMappingURL=appConfigRequest.js.map