define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var weatherStationsPopup = {
        title: "<div class='popup_header_text'>Weather Station {WeatherStationCode}</div>",
        outFields: ["*"],
        content: myContent,
        fieldInfos: [
            {
                fieldName: "WeatherStationId",
                label: "WeatherStationId",
                type: "oid"
            }, {
                fieldName: "WeatherNetworkPriority",
                label: "Weather Network Priority",
                type: "number"
            }, {
                fieldName: "WeatherStationCode",
                label: "Weather Station Code",
                type: "string"
            }, {
                fieldName: "WeatherStationDescription",
                label: "Weather Station Description",
                type: "string"
            }, {
                fieldName: "ElevationFeet",
                label: "Elevation Feet",
                type: "number"
            }, {
                fieldName: "ElevationMeters",
                label: "Elevation Meters",
                type: "number"
            }, {
                fieldName: "WeatherReportDateTime",
                label: "Weather Report Date Time",
                type: "date"
            }, {
                fieldName: "TemperatureFarhenheit",
                label: "Temperature Farhenheit",
                type: "string"
            }, {
                fieldName: "TemperatureCelcius",
                label: "Temperature Celcius",
                type: "string"
            }, {
                fieldName: "SurfaceTemperature",
                label: "Surface Temperature",
                type: "string"
            }, {
                fieldName: "MinTemperature",
                label: "Min Temperature",
                type: "string"
            }, {
                fieldName: "MaxTemperature",
                label: "Max Temperature",
                type: "string"
            }, {
                fieldName: "DewPoint",
                label: "Dew Point",
                type: "string"
            }, {
                fieldName: "WindSpeed",
                label: "Wind Speed",
                type: "string"
            }, {
                fieldName: "CardinalCompassDirection",
                label: "Cardinal Compass Direction",
                type: "string"
            }, {
                fieldName: "BarometricPressure",
                label: "Barometric Pressure",
                type: "string"
            }, {
                fieldName: "RelativeHumidity",
                label: "Relative Humidity",
                type: "string"
            }, {
                fieldName: "Visibility",
                label: "Visibility",
                type: "string"
            }, {
                fieldName: "Latitude",
                label: "Latitude",
                type: "number"
            }, {
                fieldName: "Longitude",
                label: "Longitude",
                type: "number"
            }, {
                fieldName: "PrecipitationAccumulated",
                label: "Precipitation Accumulated",
                type: "string"
            }, {
                fieldName: "WeatherIconDisplayName",
                label: "Weather Icon Display Name",
                type: "string"
            }, {
                fieldName: "WeatherIconFileName",
                label: "Weather Icon File Name",
                type: "string"
            }, {
                fieldName: "Condition",
                label: "Condition",
                type: "string"
            }
        ]
    };
    function myContent(feature) {
        var popupDiv = document.createElement("div");
        var attributesDiv = document.createElement("div");
        attributesDiv.setAttribute("id", "attributesDiv");
        var attributesTable = document.createElement("table");
        for (var i = 0; i < weatherStationsPopup.fieldInfos.length; i++) {
            var value = void 0;
            var label = void 0;
            if (weatherStationsPopup.fieldInfos[i].fieldName != "WeatherStationCode") {
                if (weatherStationsPopup.fieldInfos[i].type.toString() == "date") {
                    value = new Date(feature.graphic.attributes[weatherStationsPopup.fieldInfos[i].fieldName]);
                }
                else {
                    value = feature.graphic.attributes[weatherStationsPopup.fieldInfos[i].fieldName];
                }
                label = weatherStationsPopup.fieldInfos[i].label;
            }
            if (value && label) {
                var attributeRow = document.createElement("tr");
                attributeRow.innerHTML = "\n            <td>\n                <div style=\"font-weight: bold;\">\n                    " + label + "    \n                </h1>\n            </td>\n            <td>\n                <div>\n                    " + value + "    \n                </div>\n            </td>\n            ";
                attributesTable.appendChild(attributeRow);
            }
        }
        attributesDiv.appendChild(attributesTable);
        popupDiv.appendChild(attributesDiv);
        return popupDiv;
    }
    exports.default = weatherStationsPopup;
});
//# sourceMappingURL=WeatherStationsPopup.js.map