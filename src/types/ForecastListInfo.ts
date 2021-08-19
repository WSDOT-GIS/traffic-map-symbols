import ForecastInfo from "@/types/ForecastInfo"

interface ForecastListInfo {
    forecasts:ForecastInfo[];
    forecastDateTime: string;
    forecastExpirationDateTime: string;
    nwsZoneId: string;
    nwsZoneRegionName: string;
};
export default ForecastListInfo