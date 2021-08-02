interface WeatherStationInfo {
    WeatherStationId: number,
    WeatherNetworkPriority: number,
    WeatherStationCode: string,
    WeatherStationDescription: string,
    ElevationFeet: number,
    ElevationMeters: number,
    WeatherReportDateTime: number,
    TemperatureFarhenheit: string,
    TemperatureCelcius: string,
    SurfaceTemperature: string,
    MinTemperature: string,
    MaxTemperature: string,
    DewPoint: string,
    WindSpeed: string,
    CardinalCompassDirection: string,
    BarometricPressure: string,
    RelativeHumidity: string,
    Visibility: string,
    Latitude: number,
    Longitude: number,
    PrecipitationAccumulated: string,
    WeatherIconDisplayName: string,
    WeatherIconFileName: string,
    Condition: string,
    NWSZoneId: string
}

export default WeatherStationInfo;