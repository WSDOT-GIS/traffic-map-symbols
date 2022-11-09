import * as AlertSymbols from "./AlertSymbol";
import BorderCrossingsSymbol from "./BorderCrossingsSymbol";
import CameraClusterSymbol from "./CameraClusterSymbol";
import CameraSymbol from "./CameraSymbol";
import FerryRoutesSymbol from "./FerryRoutesSymbol";
import FireIncidentSymbol from "./FireIncidentSymbol";
import FirePerimeterSymbol from "./FirePerimeterSymbol";
import HighlightSymbol from "./HighlightSymbol";
import * as IconDefinitions from "./IconDefinitions";
import * as LineAlertSymbols from "./LineAlertSymbol";
import * as LinearClosureSymbols from "./LinearClosureSymbol";
import * as LineRestrictionsSymbols from "./LineRestrictionsSymbol";
import MountainPassSymbol from "./MountainPassSymbol";
import MyLocationSymbol from "./MyLocationSymbol";
import ParkRideSymbol from "./ParkRideSymbol";
import PointRestrictionsSymbol from "./PointRestrictionsSymbol";
import RegionalAlertSymbol from "./RegionalAlertSymbol";
import RestAreasSymbol from "./RestAreasSymbol";
import TravelTimeSymbol from "./TravelTimeSymbol";
import TruckRestrictionSymbol from "./TruckRestrictionSymbol";
import WeatherAlertSymbol from "./WeatherAlertSymbol";
import WeatherStationSymbol from "./WeatherStationSymbol";
export { AlertSymbols, IconDefinitions, LineAlertSymbols, LinearClosureSymbols, LineRestrictionsSymbols, BorderCrossingsSymbol, CameraClusterSymbol, CameraSymbol, FerryRoutesSymbol, FireIncidentSymbol, FirePerimeterSymbol, HighlightSymbol, MountainPassSymbol, MyLocationSymbol, ParkRideSymbol, PointRestrictionsSymbol, RegionalAlertSymbol, RestAreasSymbol, TravelTimeSymbol, TruckRestrictionSymbol, WeatherAlertSymbol, WeatherStationSymbol };
const allSymbols = new Map([
    ["BorderCrossings", BorderCrossingsSymbol],
    ["CameraCluster", CameraClusterSymbol],
    ["Camera", CameraSymbol],
    ["FerryRoutes", FerryRoutesSymbol],
    ["FireIncident", FireIncidentSymbol],
    ["FirePerimeter", FirePerimeterSymbol],
    ["Highlight", HighlightSymbol],
    ["MountainPass", MountainPassSymbol],
    ["MyLocation", MyLocationSymbol],
    ["ParkRide", ParkRideSymbol],
    ["PointRestrictions", PointRestrictionsSymbol],
    ["RegionalAlert", RegionalAlertSymbol],
    ["RestAreas", RestAreasSymbol],
    ["TravelTime", TravelTimeSymbol],
    ["TruckRestriction", TruckRestrictionSymbol],
    ["WeatherAlert", WeatherAlertSymbol],
    ["WeatherStation", WeatherStationSymbol]
]);
/**
 * Enumerates through all of the symbols and
 * yields output that can be used to add items
 * to a JavaScript Map.
 *
 * @yields arrays with a string as first element
 * and a symbol definition as the second element.
 */
function* enumerateSymbolsForMapping() {
    const symbolGroups = [
        AlertSymbols,
        LineAlertSymbols,
        LinearClosureSymbols,
        LineRestrictionsSymbols
    ];
    for (const sg of symbolGroups) {
        for (const name in sg) {
            if (Object.prototype.hasOwnProperty.call(sg, name)) {
                const symbol = sg[name];
                yield [name, symbol];
            }
        }
    }
}
for (const item of enumerateSymbolsForMapping()) {
    allSymbols.set(...item);
}
export default allSymbols;
