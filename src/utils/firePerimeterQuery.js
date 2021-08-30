"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const firePerimeterFeatureIDs = (fireIncidentLayer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fireIncidentQuery = fireIncidentLayer.createQuery();
    fireIncidentQuery.where = `POOState= 'US-WA'`;
    fireIncidentQuery.outFields = ["IrwinID"];
    const response = yield fireIncidentLayer.queryFeatures(fireIncidentQuery);
    let queryString = "IrwinID = ";
    for (let i = 0; i < response.features.length; i++) {
        if (i == 0) {
            queryString = queryString + `'${response.features[i].attributes.IrwinID}'`;
        }
        else {
            queryString = queryString + ` OR IrwinID = '${response.features[i].attributes.IrwinID}'`;
        }
    }
    return queryString;
});
exports.default = firePerimeterFeatureIDs;
//# sourceMappingURL=firePerimeterQuery.js.map