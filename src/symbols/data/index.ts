// Export from all of the modules that do not have a default export
// and export multiple things.
export * from "./AlertSymbol";
export * from "./FerryRoutesSymbol";
export * from "./LineAlertSymbol";
export * from "./LinearClosureSymbol";
export * from "./LineRestrictionsSymbol";
export * from "./MyLocationSymbol";


// Import modules.
import * as AlertSymbol from "./AlertSymbol";
import * as FerryRoutesSymbol from "./FerryRoutesSymbol";
import * as LineAlertSymbol from "./LineAlertSymbol";
import * as LinearClosureSymbol from "./LinearClosureSymbol";
import * as LineRestrictionsSymbol from "./LineRestrictionsSymbol";
import * as MyLocationSymbol from "./MyLocationSymbol";

import BorderCrossingsSymbol from "./BorderCrossingsSymbol";
import CameraClusterSymbol from "./CameraClusterSymbol";
import CameraSymbol from "./CameraSymbol";
import FireIncidentSymbol from "./FireIncidentSymbol";
import FirePerimeterSymbol from "./FirePerimeterSymbol";
import HighlightSymbol from "./HighlightSymbol";
import MountainPassSymbol from "./MountainPassSymbol";
import ParkRideSymbol from "./ParkRideSymbol";
import PointRestrictionsSymbol from "./PointRestrictionsSymbol";
import RegionalAlertSymbol from "./RegionalAlertSymbol";
import RestAreasSymbol from "./RestAreasSymbol";
import TravelTimeSymbol from "./TravelTimeSymbol";
import TruckRestrictionSymbol from "./TruckRestrictionSymbol";
import WeatherAlertSymbol from "./WeatherAlertSymbol";
import WeatherStationSymbol from "./WeatherStationSymbol";

// Export the imported modules.
export {
    AlertSymbol,
    BorderCrossingsSymbol,
    CameraClusterSymbol,
    CameraSymbol,
    FerryRoutesSymbol,
    FireIncidentSymbol,
    FirePerimeterSymbol,
    HighlightSymbol,
    LineAlertSymbol,
    LinearClosureSymbol,
    LineRestrictionsSymbol,
    MountainPassSymbol,
    MyLocationSymbol,
    ParkRideSymbol,
    PointRestrictionsSymbol,
    RegionalAlertSymbol,
    RestAreasSymbol,
    TravelTimeSymbol,
    TruckRestrictionSymbol,
    WeatherAlertSymbol,
    WeatherStationSymbol,
}