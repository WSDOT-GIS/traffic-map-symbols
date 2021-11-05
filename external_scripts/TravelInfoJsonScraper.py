import json
import requests
import logging
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)#comment this line to reveal SSL warnings

targetPath = "//hqtob1webtmdev1/wwwroot/GISData"
targetPath2 = "//wsdot/resources/Topics/Publish/Web/Data/TravelCenter"
dataSources = [
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=OBJECTID%2CLot_Name%2CStreet_Location%2CAddress%2CCountyName%2CApprox_Numb_Spaces%2CPublishDate&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "ParkAndRides"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url":"https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CameraID%2CCameraTitle%2CImageURL&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "Cameras"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "url":"https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=restriction_comment%2CTType%2Cdate_effective%2CRecordUpdateDate%2Croute_nr%2Cbridge_name%2Ccardinal_direction%2CUniqueID&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "PointRestrictions"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=restriction_comment%2CTType%2Cdate_effective%2CRecordUpdateDate%2Croute_nr%2Cbridge_name%2Ccardinal_direction%2CUniqueID&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "LineRestrictions"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/4/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/4/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=WeatherStationDescription%2CWeatherStationId%2CSurfaceTemperature%2CTemperatureFarhenheit%2CTemperatureCelcius%2CVisibility%2CWindSpeed%2CNWSZoneId%2CCardinalCompassDirection%2CWeatherReportDateTime&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "WeatherStations"
    },
    {
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/5/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "MountainPasses"
    },
    {
        #~~~"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/7/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/7/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=EventID%2CEventCategoryDescription%2CEventPriorityID%2CRoad%2CRoadDirection%2CHeadlineMessage%2CLastModifiedDate&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "RoadAlerts"
    },
    {
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/8/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
        "title": "StatewideAlerts"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/9/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/9/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CurrentTime%2CAverageTime%2CTitle%2CTimeUpdated%2CHOVCurrentTime&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "TravelTimes"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/11/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/11/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=BorderCrossingDescription%2CWaitTimeText&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "BorderCrossingTimes"
    },
    {
        #"url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=RestAreaName%2CLocationName%2CAmenties&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
        "title": "RestAreas"
    },
    {      
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/6/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
	"title": "CountyAlerts"
    },
    {
        "url": "https://data.wsdot.wa.gov/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/12/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
        "title": "FerryRouteAlerts"
    }]
logging.basicConfig(filename='jsonScraper.log', level=logging.DEBUG, format='%(asctime)s:%(levelname)s:%(message)s')

def getGeoJson():
    i = 0
    for source in dataSources:
        try:
            geoJson = requests.get(source["url"], verify=False)
            dataSources[i]["response"] = geoJson.text
            logging.info(f'Request {source["url"]} succeeded')
        except requests.exceptions.Timeout:
            logging.warning(f'Request {source["url"]} timed out')
        except requests.exceptions.TooManyRedirects:
            logging.warning(f'Bad URL at {source["url"]}')
        except requests.exceptions.HTTPError as err:
            logging.warning(err)
        i += 1
    return dataSources

def addRestrictionMidpoints(dataSourcesWithJSON):#add midpoints of lines to points layer
    for idx, val in enumerate(dataSourcesWithJSON):
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
        print(middleCoord)
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

def writeFiles(jsonData):
    for file in jsonData:
        file["response"] = file["response"].replace('href=', "target='_blank' href=")
        file["response"] = file["response"].replace('&#x0D;', '')
        file["response"] = file["response"].replace('–', '-')
        file["response"] = file["response"].replace(':""', ':null')
        file["response"] = file["response"].replace(': ""', ': null')
        if "Invalid or missing input parameters" in file["response"]:
            continue
        else:
            txtFile = open(f'{targetPath}\\{file["title"]}.json', 'w')
            txtFile.write(file["response"])
            txtFile = open(f'{targetPath2}\\{file["title"]}.json', 'w')
            txtFile.write(file["response"])


if __name__ == '__main__':
    jsonResponse = getGeoJson()
    featuresWithLineMidpoints = addRestrictionMidpoints(jsonResponse)
    writeFiles(featuresWithLineMidpoints)
