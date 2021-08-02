export const getForecastSummary = async (NWSZoneId) => {
    console.log(`https://webteamtest/travel/service/api/ForecastSummary/${NWSZoneId}`);
    fetch(`https://webteamtest/travel/service/api/ForecastSummary/${NWSZoneId}`)
        .then((response) => {
        response.json().then(data => {
            console.log(data);
            return data;
        });
    });
};
//# sourceMappingURL=weatherForecastRequests.js.map