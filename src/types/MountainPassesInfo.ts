interface MountainPassesInfo {
    MountainPassId: number,
    PassName: string,
    Elevation: number,
    ElevationUnit: string,
    TravelAdvisoryAvailable: number,
    Latitude: number,
    Longitude: number,
    Temperature: number,
    TemperatureUnit: string,
    Weather: string,
    RoadCondition: string,
    DisplayDate: number,
    TravelAdvisoryFlag: number,
    TravelDirection1: string,
    PublicMessage1: string,
    TravelDirection2: string,
    PublicMessage2: string
}

export default MountainPassesInfo;