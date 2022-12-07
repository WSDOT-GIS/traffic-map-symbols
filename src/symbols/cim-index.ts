// Export from all of the modules that do not have a default export
// and export multiple things.
export * from "./CIM/AlertSymbol.js";
export * from "./FerryRoutesSymbol.js";
export * from "./LineAlertSymbol.js";
export * from "./CIM/LinearClosureSymbol.js";
export * from "./LineRestrictionsSymbol.js";
export * from "./MyLocationSymbol.js";


// Import modules.
import * as AlertSymbol from "./CIM/AlertSymbol.js";
import * as FerryRoutesSymbol from "./FerryRoutesSymbol.js";
import * as LineAlertSymbol from "./LineAlertSymbol.js";
import * as LinearClosureSymbol from "./CIM/LinearClosureSymbol.js";
import * as LineRestrictionsSymbol from "./LineRestrictionsSymbol.js";
import * as MyLocationSymbol from "./MyLocationSymbol.js";

import BorderCrossingsSymbol from "./CIM/BorderCrossingsSymbol.js";
import CameraClusterSymbol from "./CIM/CameraClusterSymbol.js";
import CameraSymbol from "./CIM/CameraSymbol.js";
import FireIncidentSymbol from "./CIM/FireIncidentSymbol.js";
import FirePerimeterSymbol from "./FirePerimeterSymbol.js";
import HighlightSymbol from "./HighlightSymbol.js";
import MountainPassSymbol from "./CIM/MountainPassSymbol.js";
import ParkRideSymbol from "./CIM/ParkRideSymbol.js";
import PointRestrictionsSymbol from "./CIM/PointRestrictionsSymbol.js";
import RegionalAlertSymbol from "./CIM/RegionalAlertSymbol.js";
import RestAreasSymbol from "./CIM/RestAreasSymbol.js";
import TravelTimeSymbol from "./CIM/TravelTimeSymbol.js";
import TruckRestrictionSymbol from "./CIM/TruckRestrictionSymbol.js";
import WeatherAlertSymbol from "./CIM/WeatherAlertSymbol.js";
import WeatherStationSymbol from "./CIM/WeatherStationSymbol.js";

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