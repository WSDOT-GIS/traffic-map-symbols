export default interface ForecastInfo{
    forecastNumber: number; // Object ID. Can be used as v-for key.
    forecastText: string;
    periodText: string;
    weatherIconFileName: string;
    weatherDescription: string;
}