export const getAppConfig = async (content) => {
    let appConfig;
    fetch(`${window.location.href}/appconfig.json`)
        .then(response => response.json())
        .then(data => {
        appConfig = data;
    });
    return appConfig;
};
//# sourceMappingURL=appConfigRequest.js.map