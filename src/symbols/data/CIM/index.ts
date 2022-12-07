// Export from all of the modules that do not have a default export
// and export multiple things.
import {
    alertSymbol,
    alertSymbolHigh,
    alertSymbolHighest,
    alertSymbolMedium,
    roadClosedSymbol,
} from "./AlertSymbol";
import {
    linearCIMClosureBoth,
    linearCIMClosureDecreasing,
    linearCIMClosureIncreasing,
    linearCIMClosureSymbol,
} from "./LinearClosureSymbol";

// Import modules.
import BorderCrossingsSymbol from "./BorderCrossingsSymbol";
import CameraClusterSymbol from "./CameraClusterSymbol";
import CameraSymbol from "./CameraSymbol";
import FireIncidentSymbol from "./FireIncidentSymbol";
import MountainPassSymbol from "./MountainPassSymbol";
import ParkRideSymbol from "./ParkRideSymbol";
import PointRestrictionsSymbol from "./PointRestrictionsSymbol";
import RegionalAlertSymbol from "./RegionalAlertSymbol";
import RestAreasSymbol from "./RestAreasSymbol";
import TravelTimeSymbol from "./TravelTimeSymbol";
import TruckRestrictionSymbol from "./TruckRestrictionSymbol";
import WeatherAlertSymbol from "./WeatherAlertSymbol";
import WeatherStationSymbol from "./WeatherStationSymbol";

export {
    alertSymbol,
    alertSymbolHigh,
    alertSymbolHighest,
    alertSymbolMedium,
    roadClosedSymbol,
    linearCIMClosureBoth,
    linearCIMClosureDecreasing,
    linearCIMClosureIncreasing,
    linearCIMClosureSymbol,
    BorderCrossingsSymbol,
    CameraClusterSymbol,
    CameraSymbol,
    FireIncidentSymbol,
    MountainPassSymbol,
    ParkRideSymbol,
    PointRestrictionsSymbol,
    RegionalAlertSymbol,
    RestAreasSymbol,
    TravelTimeSymbol,
    TruckRestrictionSymbol,
    WeatherAlertSymbol,
    WeatherStationSymbol,
};

export type CimSymbol = 
    typeof alertSymbol |
    typeof alertSymbolHigh |
    typeof alertSymbolHighest |
    typeof alertSymbolMedium |
    typeof roadClosedSymbol |
    typeof linearCIMClosureBoth |
    typeof linearCIMClosureDecreasing |
    typeof linearCIMClosureIncreasing |
    typeof linearCIMClosureSymbol |
    typeof BorderCrossingsSymbol |
    typeof CameraClusterSymbol |
    typeof CameraSymbol |
    typeof FireIncidentSymbol |
    typeof MountainPassSymbol |
    typeof ParkRideSymbol |
    typeof PointRestrictionsSymbol |
    typeof RegionalAlertSymbol |
    typeof RestAreasSymbol |
    typeof TravelTimeSymbol |
    typeof TruckRestrictionSymbol |
    typeof WeatherAlertSymbol |
    typeof WeatherStationSymbol

export const symbolMap = new Map<string, CimSymbol>([
    ["alertSymbol", alertSymbol],
    ["alertSymbolHigh", alertSymbolHigh],
    ["alertSymbolHighest", alertSymbolHighest],
    ["alertSymbolMedium", alertSymbolMedium],
    ["roadClosedSymbol", roadClosedSymbol],
    ["linearCIMClosureBoth", linearCIMClosureBoth],
    ["linearCIMClosureDecreasing", linearCIMClosureDecreasing],
    ["linearCIMClosureIncreasing", linearCIMClosureIncreasing],
    ["linearCIMClosureSymbol", linearCIMClosureSymbol],
    ["BorderCrossingsSymbol", BorderCrossingsSymbol],
    ["CameraClusterSymbol", CameraClusterSymbol],
    ["CameraSymbol", CameraSymbol],
    ["FireIncidentSymbol", FireIncidentSymbol],
    ["MountainPassSymbol", MountainPassSymbol],
    ["ParkRideSymbol", ParkRideSymbol],
    ["PointRestrictionsSymbol", PointRestrictionsSymbol],
    ["RegionalAlertSymbol", RegionalAlertSymbol],
    ["RestAreasSymbol", RestAreasSymbol],
    ["TravelTimeSymbol", TravelTimeSymbol],
    ["TruckRestrictionSymbol", TruckRestrictionSymbol],
    ["WeatherAlertSymbol", WeatherAlertSymbol],
    ["WeatherStationSymbol", WeatherStationSymbol],
])