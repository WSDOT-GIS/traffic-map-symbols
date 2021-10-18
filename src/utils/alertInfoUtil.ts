import AlertInfo from "@/types/AlertInfo";
import FerryAlertInfo from "@/types/FerryAlertInfo";

/*** Statewide alerts *******************/
let startAlertUrl: string;
export const initStateAlerts = (url: string): void => {
    startAlertUrl = url;
}

export const getStateAlerts = async (): Promise<AlertInfo[]> => {
    if (!startAlertUrl) {
        throw "State alert URL is not set yet."
    }
    const alerts: AlertInfo[] = [];
    const fetchResponse = await fetch(startAlertUrl);
    const json = await fetchResponse.json();
    json.features.forEach((each: { attributes: AlertInfo; }) => {
        alerts.push(each.attributes);
    });
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
}

/*** Ferry Alerts ***************/
let ferryAlerts: FerryAlertInfo[] | undefined;
let ferryAlertUrl: string;

export const initFerryAlerts = (url: string): void => {
    ferryAlertUrl = url;
}

export const getFerryAlerts = async (routeId: number): Promise<FerryAlertInfo[]> => {
    if (!ferryAlertUrl) {
        throw "Ferry Alerts URL is not set yet.";
    }
    if (!ferryAlerts) {
        await reloadFerryAlerts(true);
    }
    let alerts: FerryAlertInfo[];
    if (ferryAlerts) {
        alerts = ferryAlerts.filter((each) => {
            return each.FerryRouteId === routeId;
        }).sort((a, b) => {
            return a.SortOrder - b.SortOrder;
        })
    } else {
        alerts = [];
    }
    return alerts;
}

export const reloadFerryAlerts = async (force?: boolean): Promise<void> => {
    if (!force && !ferryAlerts) {
        return;
    }
    const fetchResponse = await fetch(ferryAlertUrl);
    const json = await fetchResponse.json();
    ferryAlerts = [];
    json.features.forEach((each: { attributes: FerryAlertInfo; }) => {
        ferryAlerts?.push(each.attributes);
    });
}