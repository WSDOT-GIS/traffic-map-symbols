"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const tslib_1 = require("tslib");
let appConfig;
const getConfig = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!appConfig) {
        const fetchResponse = yield fetch("/appconfig.json");
        const config = yield fetchResponse.json();
        appConfig = config;
    }
    return appConfig;
});
exports.getConfig = getConfig;
//# sourceMappingURL=appConfigUtil.js.map