"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForecastSummary = void 0;
const tslib_1 = require("tslib");
const getForecastSummary = (NWSZoneId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    //console.log(`https://webteamtest/travel/service/api/ForecastSummary/${NWSZoneId}`)
    fetch(`https://webteamtest/travel/service/api/ForecastSummary/${NWSZoneId}`)
        .then((response) => {
        response.json().then(data => {
            //console.log(data)
            return data;
        });
    });
});
exports.getForecastSummary = getForecastSummary;
//# sourceMappingURL=weatherForecastRequests.js.map