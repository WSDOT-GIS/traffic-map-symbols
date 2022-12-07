import {
    alertSymbol,
    alertSymbolHigh,
    alertSymbolHighest,
    alertSymbolMedium,
    roadClosedSymbol,
} from "./CIM/AlertSymbol.js";
import {
    linearCIMClosureBoth,
    linearCIMClosureDecreasing,
    linearCIMClosureIncreasing,
    linearCIMClosureSymbol,
} from "./CIM/LinearClosureSymbol.js";

import BorderCrossingsSymbol from "./CIM/BorderCrossingsSymbol.js"
import CameraClusterSymbol from "./CIM/CameraClusterSymbol.js"
import CameraSymbol from "./CIM/CameraSymbol.js"
import FireIncidentSymbol from "./CIM/FireIncidentSymbol.js"
import FirePerimeterSymbol from "./FirePerimeterSymbol.js"
import HighlightSymbol from "./HighlightSymbol.js"
import MountainPassSymbol from "./CIM/MountainPassSymbol.js"
import ParkRideSymbol from "./CIM/ParkRideSymbol.js"
import PointRestrictionsSymbol from "./CIM/PointRestrictionsSymbol.js"
import RegionalAlertSymbol from "./CIM/RegionalAlertSymbol.js"
import RestAreasSymbol from "./CIM/RestAreasSymbol.js"
import TravelTimeSymbol from "./CIM/TravelTimeSymbol.js"
import TruckRestrictionSymbol from "./CIM/TruckRestrictionSymbol.js"
import WeatherAlertSymbol from "./CIM/WeatherAlertSymbol.js"
import WeatherStationSymbol from "./CIM/WeatherStationSymbol.js"

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
    FirePerimeterSymbol,
    HighlightSymbol,
    MountainPassSymbol,
    ParkRideSymbol,
    PointRestrictionsSymbol,
    RegionalAlertSymbol,
    RestAreasSymbol,
    TravelTimeSymbol,
    TruckRestrictionSymbol,
    WeatherAlertSymbol,
    WeatherStationSymbol,
}

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