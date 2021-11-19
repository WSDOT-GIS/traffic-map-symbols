import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import { geodesicBuffer } from "@arcgis/core/geometry/geometryEngine";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Extent from "@arcgis/core/geometry/Extent";
import Collection from "@arcgis/core/core/Collection";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Layer from "@arcgis/core/layers/Layer";
import Graphic from "@arcgis/core/Graphic";
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
import * as FireIncidentsLayer from "@/layers/FireIncidentLayer";
import * as FirePerimetersLayer from "@/layers/FirePerimeterLayer";
import * as MileMakersLayer from "@/layers/MileMarkersLayer";
import * as RoadsReferenceLayer from "@/layers/RoadsReferenceLayer"
import * as BoundariesPlacesReferenceLayer from "@/layers/BoundariesPlacesReferenceLayer"
import * as StateRouteShieldsLayer from "@/layers/StateRouteShields"
import * as BorderCrossingsLayer from "@/layers/BorderCrossingsLayer"
import * as RegionalAlertLayer from "@/layers/RegionalAlertLayer";
import * as RestAreasLayer from "@/layers/RestAreasLayer";
import * as FerryRoutesReferenceLayer from "@/layers/ferryRoutesReferenceLayer"
import * as LineFerryRoutesLayer from "@/layers/LineFerryRoutesLayer"
import * as FerryRoutePointsLayer from "@/layers/PointFerryRoutesLayer"
//
import { getEsriExtent, getOutOfBoundDirection } from "@/utils/extentUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import FeatureInfo from "@/types/FeatureInfo";
import { getConfig } from "@/utils/appConfigUtil";
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
    },
    highlightOptions: {
        color: "#00ffff", // Fill color
        haloColor: "#0000ff", // Outline color
        fillOpacity: 0.25,
        haloOpacity: 1
    }
});
// Zoom buttons are replaced with the custom Vue components.
mapView.ui.remove("zoom");
//
export const init = (container: HTMLDivElement): void => {
    mapView.container = container;
    mapView.when()
        .then(() => {
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
    const config = getConfig();
    // Removed since do not need API Key for now...
    const trafficLyr = TrafficLayer.initLayer(config.traffic, config.layerRefreshMinute);
    const restAreasLyr = await RestAreasLayer.initLayer(config.restAreas);
    const parkRideLyr = await ParkRideLayer.initLayer(config.parkAndRides);
    const weatherLyr = await WeatherLayer.initLayer(config.weatherStations, mapView);
    const mtLyr = await MountainLayer.initLayer(config.mountainPasses);
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
    const ferryRoutesReferenceLayer = FerryRoutesReferenceLayer.initLayer(config.ferryRoutesReferenceLayer)
    const ferryRouteLinesLayer = await LineFerryRoutesLayer.initLayer(config.ferryRouteLines)
    const ferryRoutePointsLayer = FerryRoutePointsLayer.initLayer(config.ferryRoutePoints)
    const borderCrossingsLayer = await BorderCrossingsLayer.initLayer(config.borderCrossings)
    // The first one in the array will be displayed at the bottom of the map... 
    webmap.addMany([esriRoadsReferenceLayer, esriPlacesReferenceLayer, ferryRoutesReferenceLayer, trafficLyr,
        ferryRouteLinesLayer, stateRouteShieldsLayer,
        firePerimetersLayer, fireIncidentLayer,
        restAreasLyr, parkRideLyr, weatherLyr, mtLyr, lineRestrictionLyr,
        pointRestrictionLyr, cameraLyr,
        ferryRoutePointsLayer, roadAlertLyrs,
        mileMarkersLayer, borderCrossingsLayer]);
    // Store the default visibility...
    webmap.layers.forEach((eachLyr) => {
        defaultLayerProps.push({ id: eachLyr.id, visible: eachLyr.visible });
    });

}
/** Load regional alert point and polygon layers separately from the other operation layers. */
export const loadRegionalAlert = async (): Promise<void> => {
    const config = getConfig();
    const layers = await RegionalAlertLayer.initLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    webmap.add(layers.point);
    webmap.add(layers.polygon, 0);
}
/**
 * Reload data for some layers.
 */
export const refreshLayerData = async (): Promise<void> => {
    const config = getConfig();
    RegionalAlertLayer.reloadData(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    layerUtil.reloadData(config.roadAlerts, RoadAlertsLayer.default())
    layerUtil.reloadData(config.pointRestrictions, PointRestrictionsLayer.default());
    layerUtil.reloadData(config.lineRestrictions, LineRestrictionsLayer.default());
    layerUtil.reloadData(config.mountainPasses, MountainLayer.default());
    layerUtil.reloadData(config.weatherStations, WeatherLayer.default());
    layerUtil.reloadData(config.borderCrossings, BorderCrossingsLayer.default());
};

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
/**
 * Zoom centered at the specified location
 * @param point The center location
 * @param zoomLevel The zoom level to zoom into.
 * If numLevels is also specified, that will take precedence over this value.
 * @returns 
 */
export const tryZoomToPointAsync = async (point: Point, zoomLevel: number): Promise<boolean> => {
    let isSuccess = true;
    const orgLevel = mapView.zoom;
    await mapView.goTo({
        target: point,
        zoom: zoomLevel
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
        scale: getZoomLevel(-1).scale
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
/** Zoom levels and corresponding scales */
let zoomLevels: { level: number, scale: number }[];
/**
 * Get the scale by the number levels from the minimum scale.
 * @param numLevelsFromMin Number of levels from the minimum scale. 
 * For example, 0 is the min scale. 3 is the fourth level from the min scale.
 * You can also specify number of levels from the maximum scale by using the negative value.
 * For example -1 is the max scale. -2 is the second level from the max scale.
 */
export const getZoomLevel = (numLevelsFromMin: number): { level: number, scale: number } => {
    if (!zoomLevels) {
        const info = getBasemapInfo("wsdot");
        const lyr = info.basemap.baseLayers.getItemAt(0);
        const tile = lyr as TileLayer;
        const lods = tile.tileInfo.lods;
        zoomLevels = lods.map((x) => {
            return { level: x.level, scale: x.scale };
        })
        zoomLevels.sort((a, b) => a.level - b.level);
    }
    const item = zoomLevels.slice(numLevelsFromMin);
    if (item) {
        return item[0];
    } else if (numLevelsFromMin < 0) {
        return zoomLevels[0];
    } else {
        return zoomLevels.slice(-1)[0];
    }
}

export const toScreenXY = (mapX: number, mapY: number): { x: number, y: number } => {
    const pt = toPoint(mapX, mapY);
    const screenPt = mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
}

export const toPoint = (mapX: number, mapY: number): Point => {
    const pt = new Point({ x: mapX, y: mapY, spatialReference: mapView.spatialReference });
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
    const topLeftDir = getOutOfBoundDirection(topLeft, fullExtent);
    const bottomRightDir = getOutOfBoundDirection(bottomRight, fullExtent);
    // Positive = panning down/south => check the top, otherwise check the bottom...
    let outOfBoundsDir = shiftY > 0 ? topLeftDir[0] : bottomRightDir[0];
    // Positive = panning east/right => check the left, otherwise check the right side...
    outOfBoundsDir += shiftX > 0 ? topLeftDir[1] : bottomRightDir[1];
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
export const panMap = async (shiftX: number, shiftY: number): Promise<{ actualShift: XY } | boolean> => {
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
            // Figure out the amount moved in reality...
            const newScreen = mapView.toScreen(mapView.center);
            const oldScreen = mapView.toScreen(oldCenter);
            actualShift.x = oldScreen.x - newScreen.x;
            actualShift.y = oldScreen.y - newScreen.y;
            diffShift.x = shiftX - actualShift.x;
            diffShift.y = shiftY - actualShift.y;
        }
        if (Math.abs(diffShift.x) < 1 && Math.abs(diffShift.y) < 1) {
            return true;
        } else {
            console.warn("panMap: fail " + JSON.stringify(diffShift));
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
export const getLayers = (): Collection<Layer> => {
    return webmap.layers;
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
    const layer = getLayer(featureInfo.layerId) as FeatureLayer;
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
        color: [256, 256, 256, 0.95],
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

