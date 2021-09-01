import json
import os

import requests

targetPath = "//hqtob1webtmdev1/wwwroot/GISData"
targetPath2 = "//wsdot/resources/Topics/Publish/Web/Data/TravelCenter"
dataSources = [
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "ParkAndRides"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "Cameras"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "PointRestrictions"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "LineRestrictions"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/4/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "WeatherStations"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/5/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "MountainPasses"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/7/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "RoadAlerts"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/8/query?f=json&where=1%3D1&returnGeometry=false&outFields=*",
        "title": "StatewideAlerts"
    },
    {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/9/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "TravelTimes"
    }

]
''' {
        "url": "https://hqolymgis30s.wsdot.loc/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/6/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson",
        "title": "CountyAlerts"
    },

    '''


def getGeoJson():
    i = 0
    for source in dataSources:
        geoJson = requests.get(source["url"], verify=False)
        dataSources[i]["response"] = geoJson.text
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
        feature["properties"]["lineMarker"] = False
    for feature in parsedRestrictionLinesLayer["features"]:
        newFeature = feature
        middleIndex = float(len(feature["geometry"]["coordinates"])) / 2
        if middleIndex % 2 != 0:
            middleCoord= feature["geometry"]["coordinates"][int(middleIndex - .5)]
        else:
            middleCoord= (feature["geometry"]["coordinates"][int(middleIndex)])
        newFeature["geometry"]["coordinates"] = middleCoord
        newFeature["geometry"]["type"] = "Point"
        newFeature["id"] = i
        newFeature['properties']["ESRI_OID"] = i
        newFeature['properties']["lineMarker"] = True
        parsedRestrictionPointsLayer["features"].append(newFeature)
        i+=1
    for idx, val in enumerate(dataSourcesWithJSON):
        if val["title"]=="PointRestrictions":
            dataSources = json.loads(dataSourcesWithJSON[idx]["response"])
            dataSources["features"] = parsedRestrictionPointsLayer["features"]
            encodedResponse = json.dumps(dataSources)
            dataSourcesWithJSON[idx]["response"] = encodedResponse
    print(dataSourcesWithJSON[2]["response"])
    return dataSourcesWithJSON

def writeFiles(jsonData):
    for file in jsonData:
        file["response"] = file["response"].replace(':""', ':null')
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
