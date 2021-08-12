interface WeatherForecastInfo {
    nwsZoneId: string;
    forecastNumber: number; // Object ID. Can be used as v-for key.
    weatherIconFileName: string;
    weatherDescription: string;
    periodText: string;
}

export default WeatherForecastInfo;

/*export const getAttribute = (info: WeatherForecastInfo, fieldName: string) => {
    const x = info.attributes[fieldName];
}*/
