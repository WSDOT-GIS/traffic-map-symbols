import json
import requests
import logging
from logging.handlers import TimedRotatingFileHandler
from logging import Formatter
from datetime import datetime
import urllib3
import numpy
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)#comment this line to reveal SSL warnings

targetPath = "//wsdot/resources/Topics/Publish/Web/Data/TravelCenter"

dataSources = [
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=OBJECTID%2CLot_Name%2CStreet_Location%2CAddress%2CCountyName%2CApprox_Numb_Spaces%2CPublishDate&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "title": "ParkAndRides",
        "type": "Point"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
        "url":"https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CameraID%2CCompassDirection%2CCameraTitle%2CImageURL&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
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
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=RestAreaId%2CRestAreaName%2CLocationName%2CAmenties&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",
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
handler = TimedRotatingFileHandler(filename='D:\\Jobs\\TravelInfojsonScraper\\jsonScraper_Prod.log', when='M', interval=720, backupCount=60, encoding='utf-8', delay=False)#12 hour turnover
formatter = Formatter(fmt='%(asctime)s:%(levelname)s:%(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)
#Debug>Info>Warning>Error>Critical
logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~Task Start~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
def getGeoJson():
    i = 0
    for source in dataSources:
        try:
            rawJsonData = requests.get(source["url"], verify=False)
            source['response'] = rawJsonData.text
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
def addRestrictionMidpoints(pointRestrictionsResponseData, lineRestrictionsResponseData, pointRestrictionLayerIndex):#add midpoints of lines to points layer
    i = len(pointRestrictionsResponseData["features"])
    for feature in pointRestrictionsResponseData["features"]:
        feature['attributes']["lineMarker"] = "False"# add 'false' to all existing point features
    for feature in lineRestrictionsResponseData["features"]:
        newFeature = {}
        newFeature['attributes'] = feature['attributes']# duplicate the line restriction feature to preserve attributes, before calculaing the geometry of its midpoint, for the feature to be added to the points layer
        middleIndex = float(len(feature["geometry"]["paths"][0])) / 2
        if middleIndex % 2 != 0:
            middleCoord= feature["geometry"]["paths"][0][int(middleIndex - .5)]
        else:
            middleCoord= (feature["geometry"]["paths"][0][int(middleIndex)])
        newFeature["geometry"] = {"x": middleCoord[0], "y": middleCoord[1]}
        newFeature["id"] = i
        newFeature['attributes']["ESRI_OID"] = i
        newFeature['attributes']["lineMarker"] = "True"
        pointRestrictionsResponseData["features"].append(newFeature)
        i+=1
def combineBorderCrossings(loadedJsonResponseData):
    BorderCrossingsLayer = loadedJsonResponseData
    borderCrossingIDs = []
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
def writeFiles(responseData,title):
    responseData = responseData.replace('href=', "target='_blank' href=")
    responseData = responseData.replace('&#x0D;', '')
    responseData = responseData.replace(':""', ':null')
    responseData = responseData.replace(': ""', ': null')
    if title == "CountyAlerts":
        print(responseData)
    if "Invalid or missing input parameters" in responseData:
        logger.error(f'Invalid or missing input parameters in {file["title"]}.json')
    else:
        try:
            txtFile = open(f'{targetPath}\\{title}.json', 'w')
            try:
                txtFile.write(responseData)
            except:
                logger.error(f'Unable to write file {title}.json')
        except FileNotFoundError:
            logger.error(f'Unable to open {targetPath}\\{title}.json')
def addTimeStamps(loadedJsonResponseData):
    loadedJsonResponseData["timestamp"] = f'{datetime.now()}'
def removeNullGeometries(loadedData, layerTitle, layerType):
    newFeatures = []
    for feature in loadedData['features']:
        if layerType=="Point":
            if len(feature['geometry'])>1:
                newFeatures.append(feature)
            else:
                logger.error(f'feature at index {i} in layer {layerTitle} has null geometry')
        if layerType=="Polyline":
            if len(feature['geometry']['paths'][0])>1:
                newFeatures.append(feature)
            else:
                logger.error(f'feature at index {i} in layer {layerTitle} has null geometry')
    loadedData['features'] = newFeatures
def loadJson(val) :
    loadedJson = json.loads(val['response'])
    return loadedJson
if __name__ == '__main__':
    jsonResponse = getGeoJson()
    pointRestrictionsResponseData=''#to be reassigned if the point restriction layer response is valid
    lineRestrictionsResponseData=''#to be reassigned if the line restriction layer response is valid
    pointRestrictionLayerIndex = ''#to be reassigned if the point restriction layer response is valid, used for replacement of original "response" data in datasources array
    for idx, val in enumerate(jsonResponse):
        if "response" in val:#if json fetch succeeded
            loadedJsonResponseData = loadJson(val)
            addTimeStamps(loadedJsonResponseData)
            if len(loadedJsonResponseData['features'])>0:# if features exist in the json response
                if val['title'] in ["Cameras","PointRestrictions","LineRestrictions","MountainPasses","WeatherStations","RestAreas","ParkAndRides","BorderCrossingTimes","RoadAlerts","TravelTimes"]:
                    removeNullGeometries(loadedJsonResponseData, val["title"], val['type'])
                if val["title"]=="BorderCrossingTimes":
                    combineBorderCrossings(loadedJsonResponseData)
                if val["title"]=="LineRestrictions":
                    lineRestrictionsResponseData=loadedJsonResponseData# assigned for check before line midpoints are added
                if val["title"]=="PointRestrictions":
                    pointRestrictionLayerIndex = idx
                    pointRestrictionsResponseData=loadedJsonResponseData# assigned for check before line midpoints are added
            print(val['title'])
            val['response'] = json.dumps(loadedJsonResponseData, ensure_ascii=False)
            writeFiles(val['response'],val['title'])
        else:
            logger.error(f'Unable to process {val["title"]} layer. Missing response from map service.')
    if pointRestrictionsResponseData!='' and lineRestrictionsResponseData!='' and pointRestrictionLayerIndex!='':# if point AND line restriction layers contain valid json with features, and index is assigned...
        addRestrictionMidpoints(pointRestrictionsResponseData, lineRestrictionsResponseData, pointRestrictionLayerIndex)
        dataSources[pointRestrictionLayerIndex]['response'] = json.dumps(pointRestrictionsResponseData, ensure_ascii=False)
        writeFiles(dataSources[pointRestrictionLayerIndex]['response'],dataSources[pointRestrictionLayerIndex]['title'])
    logging.shutdown()
'''
# DEBUG: Detailed information, typically of interest only when diagnosing problems.

# INFO: Confirmation that things are working as expected.

# WARNING: An indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low’). The software is still working as expected.

# ERROR: Due to a more serious problem, the software has not been able to perform some function.

# CRITICAL: A serious error, indicating that the program itself may be unable to continue running.'''
