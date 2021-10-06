import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import { geodesicBuffer } from "@arcgis/core/geometry/geometryEngine";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Extent from "@arcgis/core/geometry/Extent";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Layer from "@arcgis/core/layers/Layer";
import Graphic from "@arcgis/core/Graphic";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { difference } from "@arcgis/core/geometry/geometryEngine";
// Layers
import * as TrafficLayer from "@/layers/TrafficLayer";
import * as ParkRideLayer from "@/layers/ParkRideLayer";
import * as CameraLayer from "@/layers/CameraLayer";
import * as PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import * as LineRestrictionsLayer from "@/layers/LineRestrictionsLayer";
import * as RoadAlertsLayer from "@/layers/RoadAlertsLayer";
import * as WeatherLayer from "@/layers/WeatherStationsLayer";
import * as MountainLayer from "@/layers/MountainPassesLayer";
import * as TravelTimesLayer from "@/layers/TravelTimeLayer"
import * as FireIncidentsLayer from "@/layers/FireIncidentLayer";
import * as FirePerimetersLayer from "@/layers/FirePerimeterLayer";
import * as MileMakersLayer from "@/layers/MileMarkersLayer";
import * as RoadsReferenceLayer from "@/layers/RoadsReferenceLayer"
import * as BoundariesPlacesReferenceLayer from "@/layers/BoundariesPlacesReferenceLayer"
import * as StateRouteShieldsLayer from "@/layers/StateRouteShields"
import * as BorderCrossingsLayer from "@/layers/BorderCrossingsLayer"
import * as RegionalAlertLayer from "@/layers/RegionalAlertLayer";
import * as RestAreasLayer from "@/layers/RestAreasLayer";
import { initLayer as initLineFerryRoutesLayer } from "@/layers/LineFerryRoutesLayer"
import * as FerryRoutePointsLayer from "@/layers/PointFerryRoutesLayer"
//
import { getEsriExtent, getOutOfBoundDirection } from "@/utils/extentUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import FeatureInfo from "@/types/FeatureInfo";
import { getConfig } from "@/utils/appConfigUtil";
// import LayerInfo from "@/types/LayerInfo";
import firePerimeterFeatureIDs from "@/utils/firePerimeterQuery"
import { getBasemapInfo } from "@/layers/Basemaps";
import XY from "@/types/XY";
import * as layerUtil from "@/utils/layerUtil";

const fullExtent = getEsriExtent("full");

// Initialize empty map, and load layers later...
export const webmap = new WebMap({
});

export const mapView = new MapView({
    container: "esri-map-view",
    map: webmap,
    extent: fullExtent,
    constraints: {
        rotationEnabled: false, // Disables map rotation
        // Limit the map navigation. 
        // Note: This still allows navigation beyond the extent, but not infinitely.
        geometry: fullExtent,
    }
});
// Zoom buttons are replaced with the custom Vue components.
mapView.ui.remove("zoom");
//
export const init = (container: HTMLDivElement): void => {
    mapView.container = container;
    mapView.when()
        .then(() => {
            console.log("Map is ready.");
            // Somehow map does not zoom enough, so set extent again here...
            mapView.extent = fullExtent;
        })
        .catch(error => {
            console.warn("Failed to initialize map. Error: ", error);
        });
};
/** Store the default layer visibility. This is used by Saved Map function. */
export const defaultLayerProps: { id: string, visible: boolean }[] = []
/**
 * Get config and get apiKey and URL, then initialize layers and add to map...
 */
export const loadOperationalLayers = async (): Promise<void> => {
    const config = await getConfig();
    //EsriConfig.apiKey = config.apiKey;
    const trafficLyr = TrafficLayer.initLayer(config.traffic, config.layerRefreshMinute);
    const restAreasLyr = await RestAreasLayer.initLayer(config.restAreas);
    const parkRideLyr = await ParkRideLayer.initLayer(config.parkAndRides);
    const weatherLyr = await WeatherLayer.initLayer(config.weatherStations);
    const mtLyr = await MountainLayer.initLayer(config.mountainPasses);
    const travelTimesLyr = await TravelTimesLayer.initLayer(config.travelTimes);
    const lineRestrictionLyr = await LineRestrictionsLayer.initLayer(config.lineRestrictions);
    const pointRestrictionLyr = await PointRestrictionsLayer.initLayer(config.pointRestrictions);
    const cameraLyr = await CameraLayer.initLayer(config.cameras);
    const roadAlertLyrs = await RoadAlertsLayer.initLayer(config.roadAlerts);
    const fireIncidentLayer = FireIncidentsLayer.initLayer(config.fireIncidents);
    const firePerimeterIDs = await firePerimeterFeatureIDs(fireIncidentLayer);
    const firePerimetersLayer = FirePerimetersLayer.initLayer(config.firePerimeters, firePerimeterIDs);//Needed to filter fire perimeters to just those within the state
    const mileMarkersLayer = MileMakersLayer.initLayer(config.mileMarkers)
    const esriRoadsReferenceLayer = RoadsReferenceLayer.initLayer(config.esriRoadsReferenceLayer)
    const esriPlacesReferenceLayer = BoundariesPlacesReferenceLayer.initLayer(config.esriPlacesReferenceLayer)
    const stateRouteShieldsLayer = StateRouteShieldsLayer.initLayer(config.stateRouteShieldsLayer)
    // const regionalAlertLayer = await initRegionalAlertLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    // The first one in the array will be displayed at the bottom of the map... 
    // const borderCrossingsLayer = initBorderCrossingsLayer(config.borderCrossings)
    const ferryRouteLinesLayer = initLineFerryRoutesLayer(config.ferryRouteLines)
    const ferryRoutePointsLayer = FerryRoutePointsLayer.initLayer(config.ferryRoutePoints)
    // webmap.addMany([esriRoadsReferenceLayer, esriPlacesReferenceLayer, trafficLyr, stateRouteShieldsLayer,
    //     firePerimetersLayer, fireIncidentLayer,
    //     restAreasLyr, parkRideLyr, weatherLyr, mtLyr, travelTimesLyr, lineRestrictionLyr,
    //     pointRestrictionLyr, cameraLyr, roadAlertsLyr, roadClosuresLyr,
    //     mileMarkersLayer, borderCrossingsLayer, ferryRoutesLayer]);
    const borderCrossingsLayer = await BorderCrossingsLayer.initLayer(config.borderCrossings)
    webmap.addMany([esriRoadsReferenceLayer, esriPlacesReferenceLayer, trafficLyr, stateRouteShieldsLayer,
        firePerimetersLayer, fireIncidentLayer,
        restAreasLyr, parkRideLyr, weatherLyr, mtLyr, travelTimesLyr, lineRestrictionLyr,
        pointRestrictionLyr, cameraLyr, roadAlertLyrs.priority, roadAlertLyrs.closure,
        mileMarkersLayer, borderCrossingsLayer, ferryRouteLinesLayer, ferryRoutePointsLayer]);
    // Store the default visibility...
    webmap.layers.forEach((eachLyr) => {
        defaultLayerProps.push({ id: eachLyr.id, visible: eachLyr.visible });
    });
}
/** Load regional alert point and polygon layers separately from the other operation layers. */
export const loadRegionalAlert = async (): Promise<void> => {
    const config = await getConfig();
    const layers = await RegionalAlertLayer.initLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    webmap.add(layers.point);
    webmap.add(layers.polygon, 0);
}
/**
 * Reload data for some layers.
 */
export const refreshLayerData = async (): Promise<void> => {
    const config = await getConfig();
    RoadAlertsLayer.reloadData(config.roadAlerts);
    RegionalAlertLayer.reloadData(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    layerUtil.reloadData(config.pointRestrictions, PointRestrictionsLayer.default());
    layerUtil.reloadData(config.lineRestrictions, LineRestrictionsLayer.default());
    layerUtil.reloadData(config.travelTimes, TravelTimesLayer.default());
    layerUtil.reloadData(config.mountainPasses, MountainLayer.default());
    layerUtil.reloadData(config.weatherStations, WeatherLayer.default());
    layerUtil.reloadData(config.borderCrossings, BorderCrossingsLayer.default());
};

/**
 * Reload GeoJSON layers that are updated frequently.
 */
// export const reloadGeoJsonLayers = async (/*layerList: LayerInfo[]*/): Promise<void> => {
//     // const config = await getConfig();

//     // reloadGeoJsonLayer("road-alerts-layer", config.roadAlerts, initPriorityLayer);//, layerList);
//     // reloadGeoJsonLayer("road-closures-layer", config.roadAlerts, initClosureLayer);//, layerList);
//     // reloadGeoJsonLayer("line-restrictions-layer", config.lineRestrictions, initLineRestrictionsLayer);//, layerList);
//     // reloadGeoJsonLayer("point-restrictions-layer", config.pointRestrictions, initPointRestrictionsLayer);//, layerList);
//     // reloadGeoJsonLayer("mountain-passes-layer", config.mountainPasses, initMountainLayer);//, layerList);
//     // reloadGeoJsonLayer("travel-times-layer", config.travelTimes, initTravelTimesLayer);//, layerList);
//     // reloadGeoJsonLayer("weather-stations-layer", config.weatherStations, initWeatherLayer);//, layerList);
//     // reloadGeoJsonLayer("border-crossings-layer", config.borderCrossings, initBorderCrossingsLayer);//, layerList);
//     /* Camera layer is not updated frequently, but need to be reloaded. 
//     If not, the cluster label does not show after other layers are refreshed. */
//     // reloadGeoJsonLayer("traffic-camera-layer", config.cameras, initCameraLayer, layerList);
//     // setCluster(mapView.scale);
//     console.log("...Reloaded GeoJSON layers.")
//     //return layerList;
// }

// const reloadGeoJsonLayer = (id: string, layerUrl: string, initFunc: (url: string) => GeoJSONLayer/*, layerList: LayerInfo[]*/): void => {
//     const lyr = getLayer(id);
//     if (lyr.type === "geojson") {
//         const oldlyr = lyr as GeoJSONLayer
//         const lyrIdx = webmap.layers.indexOf(oldlyr);
//         const visible = oldlyr.visible;
//         const definitionExpression = oldlyr.definitionExpression
//         // Destroys the layer and remove it from the map...
//         // lyr.destroy();
//         webmap.remove(oldlyr);
//         oldlyr.destroy();
//         const newLyr = initFunc(layerUrl);
//         newLyr.visible = visible;
//         newLyr.definitionExpression = definitionExpression;
//         webmap.add(newLyr, lyrIdx);
//         // Update the layer list with the new layer object...
//         // updateLayerList(layerList, newLyr);
//     }
//     else {
//         throw id + " is not a GeoJSON layer."
//     }
// }

// export const refreshRegionAlert = async (/*layerList: LayerInfo[]*/): Promise<void> => {
//     // const oldPointLyr = getLayer("regional-alert-layer");
//     // const oldPolyLyr = getLayer("alert-area-layer");
//     // Recreate the layers...
//     const config = await getConfig();
//     // const layers = await initRegionalAlertLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
//     reloadRegionalAlert(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
//     // Swap the point layer...
//     // const pointLyrIdx = webmap.layers.indexOf(oldPointLyr);
//     // oldPointLyr.destroy();
//     // webmap.add(layers.point, pointLyrIdx);
//     // // Swap the polygon layer...
//     // const polyLyrIdx = webmap.layers.indexOf(oldPolyLyr);
//     // oldPolyLyr.destroy();
//     // webmap.add(layers.polygon, polyLyrIdx);
//     // Update the layer list with the new layer object...
//     // updateLayerList(layerList, layers.point);
//     // updateLayerList(layerList, layers.polygon);
//     console.log("...Reloaded region alert.");
//     // return layerList;
// }
/**
 * After a layer object is recreated, update the reference to the new layer object.
 * @param layerList 
 * @param layer 
 */
// const updateLayerList = (layerList: LayerInfo[], layer: Layer) => {
//     const lyrInfo = layerList.find((eachInfo) => {
//         return eachInfo.id === layer.id;
//     })
//     if (lyrInfo) {
//         lyrInfo.id = layer.id;
//         lyrInfo.title = layer.title;
//         lyrInfo.visible = layer.visible;
//     }
// }

export const tryZoomToPoint = (point: Point, numLevels?: number): boolean => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    mapView.center = point;
    const orgLevel = mapView.zoom;
    mapView.zoom = mapView.zoom += numLevels;
    if (mapView.zoom === orgLevel) {
        // Cannot zoom in any more.
        isSuccess = false;
    }
    return isSuccess;
}

export const tryZoomToPointAsync = async (point: Point, numLevels?: number): Promise<boolean> => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    const orgLevel = mapView.zoom;
    await mapView.goTo({
        target: point,
        zoom: mapView.zoom += 1
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("tryZoomToPointAsync failed: " + error);
    });
    if (mapView.zoom === orgLevel) {
        // Cannot zoom in any more.
        isSuccess = false;
    }
    return isSuccess;
}

export const zoomToMax = async (point: Point): Promise<void> => {
    await mapView.goTo({
        target: point,
        scale: getMaxScale()
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToMax failed: " + error);
    });
}

export const zoomToMetroArea = (extent: Extent): void => {
    mapView.extent = extent.expand(2);
    ZoomExtentLayer.visible = false;
    // Remember the scale zoomed into so it can detect when map is zoomed out.
    const zoomExtentLayerMaxZoom = mapView.zoom;
    // Set watch to make the layer visible again when user zoom out 2+ levels.
    const watchHandle = whenTrue(mapView, "stationary", () => {
        // Note: Allow users to zoom out one level without showing the extent box, so they still click on features.
        if (mapView.zoom < zoomExtentLayerMaxZoom - 1) {
            ZoomExtentLayer.visible = true;
            // Watch is no longer needed.
            watchHandle.remove();
        }
    });
};

export const zoomToExtent = async (extent: Extent): Promise<void> => {
    await mapView.goTo(extent, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToExtent failed: " + error);
    });
}

let maxScale = 0;

export const getMaxScale = (): number => {
    if (maxScale > 0) {
        return maxScale;
    } else {
        const info = getBasemapInfo("wsdot");
        const lyr = info.basemap.baseLayers.getItemAt(0);
        const tile = lyr as TileLayer;
        maxScale = tile.maxScale;
        return maxScale;
    }
}

export const toScreenXY = (mapX: number, mapY: number): { x: number, y: number } => {
    //const pt = new Point({ x: mapX, y: mapY, spatialReference: SpatialReference.WebMercator });
    const pt = toPoint(mapX, mapY);
    const screenPt = mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
}

export const toPoint = (mapX: number, mapY: number): Point => {
    const pt = new Point({ x: mapX, y: mapY, spatialReference: mapView.spatialReference });//SpatialReference.WebMercator });
    // console.log(JSON.stringify(pt));
    return pt;
}
/**
 * Check the new extent after panning against the max extent allowed and report the direction from the extent.
 * @param shiftX 
 * @param shiftY 
 * @returns
 * First char: vertical direction = i/n/s (inside/north/south)
 * Second char: horizontal direction = i/w/e (inside/west/east)
 */
export const checkPannedExtent = (shiftX: number, shiftY: number): string => {
    const topLeft = mapView.toMap({ x: -1 * shiftX, y: -1 * shiftY });
    const bottomRight = mapView.toMap({ x: mapView.width - shiftX, y: mapView.height - shiftY });
    // console.log("Top left...");
    const topLeftDir = getOutOfBoundDirection(topLeft, fullExtent);
    // console.log("Bottom right...");
    const bottomRightDir = getOutOfBoundDirection(bottomRight, fullExtent);
    // Positive = panning down/south => check the top, otherwise check the bottom...
    let outOfBoundsDir = shiftY > 0 ? topLeftDir[0] : bottomRightDir[0];
    // Positive = panning east/right => check the left, otherwise check the right side...
    outOfBoundsDir += shiftX > 0 ? topLeftDir[1] : bottomRightDir[1];
    // console.log("checkPannedExtent " + outOfBoundsDir);
    return outOfBoundsDir;
}
/**
 * Pan Map using GoTo()
 * @param shiftX 
 * positive = pan east, negative = pan west
 * @param shiftY
 * Positive = pan south, negative = pan north
 * @returns 
 * If successful or exception, return true/false. Otherwise return the actual amount pan was panned.
 */
export const panMap = async (shiftX: number, shiftY: number): Promise<{ actualShift: XY/*, outOfBoundsDir: string*/ } | boolean> => {
    // console.log("***Pan Map X:" + shiftX + ", Y:" + shiftY);
    const screenCenter = mapView.toScreen(mapView.center);
    const newCenter = mapView.toMap({
        x: screenCenter.x - shiftX,
        y: screenCenter.y - shiftY,
    });
    const oldCenter = mapView.center;
    let tryCount = 0;
    const diffShift = { x: -1, y: -1 };
    const actualShift = { x: 0, y: 0 };
    try {
        while (tryCount < 4 && (Math.abs(diffShift.x) >= 1 || Math.abs(diffShift.y) >= 1)) {
            // console.log("Try " + tryCount + " pan start");
            tryCount++;
            // GoTo() does not work as expected for various reasons, so try it a few times if not successful.
            try {
                await mapView.goTo(newCenter, {
                    duration: 300,
                    easing: "ease-in"
                });
            } catch (err) {
                console.error("mapView.goTo failed: " + err);
            }
            // console.log("Try " + tryCount + " pan finished");
            // Figure out the amount moved in reality...
            const newScreen = mapView.toScreen(mapView.center);
            const oldScreen = mapView.toScreen(oldCenter);
            // console.log("Try " + tryCount + " converted to screen");
            actualShift.x = oldScreen.x - newScreen.x;
            actualShift.y = oldScreen.y - newScreen.y;
            // console.log("Try " + tryCount + " Actual shift " + JSON.stringify(actualShift));
            diffShift.x = shiftX - actualShift.x;
            diffShift.y = shiftY - actualShift.y;
        }
        if (Math.abs(diffShift.x) < 1 && Math.abs(diffShift.y) < 1) {
            //console.log("panMap: success " + JSON.stringify(diffShift));
            return true;
        } else {
            console.log("panMap: fail " + JSON.stringify(diffShift));
            return { actualShift: actualShift };
        }
    } catch (err) {
        console.error("panMap failed: " + err);
        return false;
    }
}

export const getLayer = (id: string): Layer => {
    return webmap.findLayerById(id);
}
/**  
NOTE: This function only returns each feature if one of the following coditions is met:
- maxCount is not set 
- The number of features is less than the maxCount.
- All the features are at the identical location.
*/
export const getIdsFromCluster = async (clusterGraphic: Graphic, layer: Layer, maxCount?: number): Promise<number[] | undefined> => {
    const lyr = layer as FeatureLayer;
    if (!lyr) {
        throw "Invalid layer type was specified.";
    }
    const layerView = await mapView.whenLayerView(lyr);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    query.aggregateIds = [clusterGraphic.getObjectId()];
    query.outFields = [lyr.objectIdField];
    const result = await layerView.queryFeatures(query);
    let doReturn = false;
    if (!maxCount || result.features.length <= maxCount) {
        doReturn = true;
    }
    else {
        let identical = true;
        const pt0 = result.features[0].geometry as Point;
        for (let i = 1; i < result.features.length; i++) {
            identical = pt0.equals(result.features[i].geometry as Point)
            if (!identical) { break; }
        }
        if (identical) {
            // All points are located on the same spot!
            doReturn = true;
        }
        //else { //console.log("Points are not identical."); }
    }
    if (doReturn) {
        const ids = result.features.map((feature) => { return feature.attributes[lyr.objectIdField]; })
        return ids;
    }
}

export const bufferByPixels = (distancePixel: number, screenPoint?: { x: number, y: number }, mapPoint?: Point): Polygon => {
    if (!screenPoint && mapPoint) {
        screenPoint = mapView.toScreen(mapPoint);
    }
    if (!mapPoint && screenPoint) {
        mapPoint = mapView.toMap(screenPoint);
    }
    if (screenPoint && mapPoint) {
        const ptShift = mapView.toMap({ x: screenPoint.x + distancePixel, y: screenPoint.y });
        const mapDist = Math.abs(ptShift.x - mapPoint.x);
        const outBuff = geodesicBuffer(
            mapPoint,
            mapDist,
            "meters"
        ) as Polygon;
        return outBuff;
    }
    else {
        throw "Need to specify either screen or map point.";
    }

}
/** Highlight feature */
let highlight: __esri.Handle;
export const highlightFeature = (featureInfo: FeatureInfo): void => {
    //console.log("layer id: " + featureInfo.layerId);
    const layer = getLayer(featureInfo.layerId) as FeatureLayer;
    //console.log("highlight layer: " + layer.title);
    mapView.whenLayerView(layer).then((layerView) => {
        const query = layer.createQuery();
        query.where = `${layer.objectIdField} = ${featureInfo.id}`;
        layer.queryFeatures(query).then((result) => {
            if (highlight) {
                highlight.remove();
            }
            highlight = layerView.highlight(result.features);
        })

    })
}

export const removeHighlight = (): void => {
    if (highlight) {
        highlight.remove();
    }
}
/*** grey out outside ***/
const outOfExtentLayer = new GraphicsLayer();
const displayExtent = getEsriExtent("full").expand(1.2);
export const addOutOfExtentLayer = (): void => {
    webmap.add(outOfExtentLayer);
}
export const updateOutOfExtentLayer = (): void => {
    outOfExtentLayer.removeAll();
    const symbol = new SimpleFillSymbol({
        style: "solid",
        color: [128, 128, 128, 0.5],
        outline: {
            style: "none"
        }
    });
    const diffGeoms = difference(mapView.extent, displayExtent);
    if (Array.isArray(diffGeoms)) {
        for (const each of diffGeoms) {
            const g = new Graphic({
                geometry: each,
                symbol: symbol,
            })
            outOfExtentLayer.add(g);
        }
    } else {
        const g = new Graphic({
            geometry: diffGeoms,
            symbol: symbol,
        })
        outOfExtentLayer.add(g);
    }
}

