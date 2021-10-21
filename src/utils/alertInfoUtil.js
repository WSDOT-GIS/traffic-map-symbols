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
    // const fetchResponse = await fetch(stateAlertUrl);
    //const json = await fetchResponse.json();
    if (typeUtil_1.isEsriRows(json)) {
        json.features.forEach((each) => {
            alerts.push(each.attributes);
        });
    }
    // quadrupling one alert for testing...
    // result.push(...result);
    // result.push(...result);
    // result = JSON.parse(JSON.stringify(result));
    // // Testing long text...
    // result[0].ExtendedMessage =
    //   "300 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accums";
    // result[1].ExtendedMessage =
    //   "2000 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convalliss";
    // result[2].ExtendedMessage = "";
    // result[3].ExtendedMessage =
    //   "5000 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis ve";
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