import json
import requests
import logging
from logging.handlers import TimedRotatingFileHandler
from logging import Formatter
import urllib3
import numpy
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)#comment this line to reveal SSL warnings

targetPath = "//hqtob1webtmdev1/wwwroot/GISData"
targetPath2 = "//wsdot/resources/Topics/Publish/Web/Data/TravelCenter"

dataSources = [
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=OBJECTID%2CLot_Name%2CStreet_Location%2CAddress%2CCountyName%2CApprox_Numb_Spaces%2CPublishDate&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "ParkAndRides",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url":"https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CameraID%2CCameraTitle%2CImageURL&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "Cameras",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "url":"https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=location_description%2Crestriction_comment%2Clocation_description%2CTType%2Cdate_effective%2CRecordUpdateDate%2Croute_nr%2Cbridge_name%2Ccardinal_direction%2CUniqueID&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "PointRestrictions",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=location_description%2Crestriction_comment%2CTType%2Cdate_effective%2CRecordUpdateDate%2Croute_nr%2Cbridge_name%2Ccardinal_direction%2CUniqueID&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "LineRestrictions",
        "type": "Polyline"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/4/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/4/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=WeatherStationDescription%2CWeatherNetworkPriority%2CWeatherStationId%2CSurfaceTemperature%2CTemperatureFarhenheit%2CTemperatureCelcius%2CVisibility%2CWindSpeed%2CNWSZoneId%2CCardinalCompassDirection%2CWeatherReportDateTime&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "WeatherStations",
        "type": "Point"
    },
    {
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/5/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "MountainPasses",
        "type": "Point"
    },
    {
        #~~~"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/7/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/7/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=EventID%2CTravelCenterPriorityId%2CEventCategoryDescription%2CEventCategoryTypeDescription%2CEventPriorityID%2CRoad%2CRoadDirection%2CHeadlineMessage%2CLastModifiedDate&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "RoadAlerts",
        "type": "Point"
    },
    {
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/8/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
        "title": "StatewideAlerts",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/9/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/9/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CurrentTime%2CAverageTime%2CTitle%2CTimeUpdated%2CHOVCurrentTime&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "TravelTimes",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/11/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/11/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=InventoryDirection%2CESRI_OID%2CBorderCrossingDescription%2CStateRouteID%2CBorderReadingTime%2CWaitTimeText&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "BorderCrossingTimes",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=RestAreaName%2CLocationName%2CAmenties&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "RestAreas",
        "type": "Point"
    },
    {      
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/6/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
	"title": "CountyAlerts",
        "type": "Table"
    },
    {
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/12/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
        "title": "FerryRouteAlerts",
        "type": "Table"
    }]
logger = logging.getLogger(__name__)
handler = TimedRotatingFileHandler(filename='./jsonScraper_StaticCopy', when='S', interval=60, backupCount=10, encoding='utf-8', delay=False)
formatter = Formatter(fmt='%(asctime)s:%(levelname)s:%(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)
#logging.basicConfig(filename=f'jsonScraper_StaticCopy.log', level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')
#Debug>Info>Warning>Error>Critical
logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~Task Start~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
def getGeoJson():
    i = 0
    for source in dataSources:
        try:
            rawJsonData = requests.get(source["url"], verify=False)
            if source["title"] in ["Cameras","PointRestrictions","LineRestrictions","MountainPasses","WeatherStations","RestAreas","ParkAndRides","BorderCrossingTimes","RoadAlerts","TravelTimes"]:
                cleanJsonData = removeNullGeometries(rawJsonData.text, source["title"], source["type"])
                source["response"] = cleanJsonData
                print(cleanJsonData)
            else:
                source["response"] = rawJsonData.text
                print(source["response"])
        except requests.exceptions.Timeout:
            print("~~~~~~~~~~~~~~~~~~~~~ "+"logger1")
            logger.error(f'Request {source["url"]} timed out')
        except requests.exceptions.TooManyRedirects:
            print("~~~~~~~~~~~~~~~~~~~~~ "+"logger2")
            logger.error(f'Bad URL at {source["url"]}')
        except requests.exceptions.HTTPError as err:
            print("~~~~~~~~~~~~~~~~~~~~~ "+"logger3")
            logger.warning(err)
        except Exception as e:
            print("~~~~~~~~~~~~~~~~~~~~~ "+ "logger4")
            print(e)
            logger.error(e)
        i += 1
    return dataSources

def addRestrictionMidpoints(dataSourcesWithJSON):#add midpoints of lines to points layer
    for idx, val in enumerate(dataSourcesWithJSON):
        #print(val["title"])
        if val["title"]=="PointRestrictions":
            parsedRestrictionPointsLayer = json.loads(dataSourcesWithJSON[idx]["response"])
        if val["title"] == "LineRestrictions":
            parsedRestrictionLinesLayer = json.loads(dataSourcesWithJSON[idx]["response"])
    i = len(parsedRestrictionPointsLayer["features"])
    for feature in parsedRestrictionPointsLayer["features"]:
        feature['attributes']["lineMarker"] = "False"
    for feature in parsedRestrictionLinesLayer["features"]:
        newFeature = feature
        middleIndex = float(len(feature["geometry"]["paths"][0])) / 2
        if middleIndex % 2 != 0:
            middleCoord= feature["geometry"]["paths"][0][int(middleIndex - .5)]
        else:
            middleCoord= (feature["geometry"]["paths"][0][int(middleIndex)])
        newFeature["geometry"] = {"x": middleCoord[0], "y": middleCoord[1]}
        newFeature["id"] = i
        newFeature['attributes']["ESRI_OID"] = i
        newFeature['attributes']["lineMarker"] = "True"
        parsedRestrictionPointsLayer["features"].append(newFeature)
        i+=1
    for idx, val in enumerate(dataSourcesWithJSON):
        if val["title"]=="PointRestrictions":
            dataSources = json.loads(dataSourcesWithJSON[idx]["response"])
            dataSources["features"] = parsedRestrictionPointsLayer["features"]
            encodedResponse = json.dumps(dataSources)
            dataSourcesWithJSON[idx]["response"] = encodedResponse
    return dataSourcesWithJSON
def combineBorderCrossings(featuresWithLineMidpoints):
    for idx, val in enumerate(featuresWithLineMidpoints):
        if val["title"]=="BorderCrossingTimes":
            BorderCrossingsLayer = json.loads(featuresWithLineMidpoints[idx]["response"])
    borderCrossingIDs = []
    completedCrossings = []
    selectedBorderCrossing = {}
    borderCrossingsToRemove = []
    borderCrossingHTMLAttributes=[]
    uniqueIDs = []
    for feature in BorderCrossingsLayer["features"]:
        borderCrossingIDs.append(feature['attributes']["StateRouteID"].strip()) #add ID to list of IDs already checked
    for x in borderCrossingIDs:
        if x not in uniqueIDs:
            uniqueIDs.append(x)
    '''generate html'''
    for ID in uniqueIDs: #for each route in the layer
        z=0
        selectedBorderCrossingTableHTML = ''
        for feature in BorderCrossingsLayer["features"]:#for each feature in the layer
            direction = 'unknown'
            if feature["attributes"]["InventoryDirection"] == 'N':
               direction='North'
            if feature["attributes"]["InventoryDirection"] == 'S':
               direction='South'
            if feature["attributes"]["InventoryDirection"] == 'E':
               direction='East'
            if feature["attributes"]["InventoryDirection"] == 'W':
               direction='West'
            if feature['attributes']["StateRouteID"].strip() == ID: #if that feature is from the current route
                if z==0:#if first record of this route
                    selectedBorderCrossingTableHTML = f'<table class="waitTimeTable"><tr><td class="waitTimeTitleCell">Lane</td><td class="waitTimeTitleCell">Direction</td><td class="waitTimeTitleCell">Travel Time</td></tr><tr><td class="waitTimeCell">{feature["attributes"]["BorderCrossingDescription"]}</td><td class="waitTimeCell">{direction}</td><td class="waitTimeCell">{feature["attributes"]["WaitTimeText"]}</td></tr>'
                if z==borderCrossingIDs.count(feature['attributes']["StateRouteID"].strip())-1:#if last record of this route
                    borderCrossingsToRemove.append(feature['attributes']["ESRI_OID"])
                    selectedBorderCrossingTableHTML = selectedBorderCrossingTableHTML + f'<tr><td class="waitTimeCell">{feature["attributes"]["BorderCrossingDescription"]}</td><td class="waitTimeCell">{direction}</td><td class="waitTimeCell">{feature["attributes"]["WaitTimeText"]}</td></tr></table>'
                if z!=0 and z!=borderCrossingIDs.count(feature['attributes']["StateRouteID"].strip())-1:
                    selectedBorderCrossingTableHTML += f'<tr><td class="waitTimeCell">{feature["attributes"]["BorderCrossingDescription"]}</td><td class="waitTimeCell">{direction}</td><td class="waitTimeCell">{feature["attributes"]["WaitTimeText"]}</td></tr>'
                    borderCrossingsToRemove.append(feature['attributes']["ESRI_OID"])
            else:
                continue
            z+=1
        borderCrossingHTMLAttributes.append({'Route':ID,'table':selectedBorderCrossingTableHTML})
    '''create array of non-duplicate features'''
    newFeatures = []
    for feature in BorderCrossingsLayer["features"]:
        if feature['attributes']["ESRI_OID"] not in borderCrossingsToRemove:
            newFeatures.append(feature)
    '''assign table to new features array'''
    for feature in newFeatures:
        for record in borderCrossingHTMLAttributes:
            if str(feature['attributes']["StateRouteID"].strip())==str(record["Route"]):
                feature['attributes']["HTMLTable"] = record["table"]
    '''assign formatted features to layer'''
    BorderCrossingsLayer["features"]=(newFeatures)
    for idx, val in enumerate(featuresWithLineMidpoints):
        print(featuresWithLineMidpoints[idx]["title"])
        if val["title"]=="FerryRouteAlerts":
            print(val)
        if val["title"]=="RestAreas":
            print(val)
        if val["title"]=="BorderCrossingTimes":
            dataSources = json.loads(featuresWithLineMidpoints[idx]["response"])
            dataSources["features"] = newFeatures
            encodedResponse = json.dumps(dataSources)
            featuresWithLineMidpoints[idx]["response"] = encodedResponse
            
    featuresWithCombinedBorderCrossings = featuresWithLineMidpoints
    
    return featuresWithCombinedBorderCrossings
def writeFiles(jsonData):
    for file in jsonData:
        if "response" in file:
            file["response"] = file["response"].replace('href=', "target='_blank' href=")
            file["response"] = file["response"].replace('&#x0D;', '')
            file["response"] = file["response"].replace(':""', ':null')
            file["response"] = file["response"].replace(': ""', ': null')
            if "Invalid or missing input parameters" in file["response"]:
                logger.error(f'Invalid or missing input parameters in {file["title"]}.json')
                continue
            else:
                try:
                    txtFile = open(f'{targetPath}\\{file["title"]}.json', 'w')
                    try:
                        txtFile.write(file["response"])
                    except:
                        logger.error(f'Unable to write file {file["title"]}.json')
                except FileNotFoundError:
                    logger.error(f'Unable to open {targetPath}\\{file["title"]}.json')
                try:
                    txtFile = open(f'{targetPath2}\\{file["title"]}.json', 'w')
                    try:
                        txtFile.write(file["response"])
                    except:
                        logger.error(f'Unable to write file {file["title"]}.json')
                except FileNotFoundError:
                    logger.error(f'Unable to open {targetPath2}\\{file["title"]}.json')
        else:
            logger.error(f'Unable to process {file["title"]} layer. Missing response from map service.')
def removeNullGeometries(rawJsonData, layerTitle, layerType):
     newFeatures = []
     loadedData = json.loads(rawJsonData)
     i=0
     for feature in loadedData['features']:
         if layerType=="Point":
             if len(feature['geometry'])>1:
                 newFeatures.append(feature)
             else:
                 logger.error(f'feature at index {i} in layer {layerTitle} has null geometry')
         if layerType=="Polyline":
             print(len(feature['geometry']['paths'][0]))
             if len(feature['geometry']['paths'][0])>1:
                 newFeatures.append(feature)
             else:
                 logger.error(f'feature at index {i} in layer {layerTitle} has null geometry')
         i+=1
     loadedData['features'] = newFeatures
     newData = json.dumps(loadedData)
     return newData
     
if __name__ == '__main__':
    jsonResponse = getGeoJson()
    featuresWithLineMidpoints = addRestrictionMidpoints(jsonResponse)
    featuresWithCombinedBorderCrossings = combineBorderCrossings(featuresWithLineMidpoints)
    writeFiles(featuresWithCombinedBorderCrossings)

'''
# DEBUG: Detailed information, typically of interest only when diagnosing problems.

# INFO: Confirmation that things are working as expected.

# WARNING: An indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low’). The software is still working as expected.

# ERROR: Due to a more serious problem, the software has not been able to perform some function.

# CRITICAL: A serious error, indicating that the program itself may be unable to continue running.'''

