"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const firePerimeterFeatureIDs = (fireIncidentLayer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fireIncidentQuery = fireIncidentLayer.createQuery();
    fireIncidentQuery.outFields = ["IncidentName"];
    const response = yield fireIncidentLayer.queryFeatures(fireIncidentQuery);
    console.log(response.features[0].attributes);
    let queryString = 'IncidentName IN(';
    for (let i = 0; i < response.features.length; i++) {
        if (i == 0) {
            queryString = queryString + `'${response.features[i].attributes.IncidentName}',`;
        }
        else {
            queryString = queryString + `'${response.features[i].attributes.IncidentName}',`;
        }
        if (i == response.features.length - 1) {
            queryString = queryString + `'${response.features[i].attributes.IncidentName}')`;
        }
    }
    return queryString;
});
exports.default = firePerimeterFeatureIDs;
//# sourceMappingURL=firePerimeterQuery.js.map