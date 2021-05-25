define(["require", "exports", "tslib", "@/layers/WsdotBasemap"], function (require, exports, tslib_1, WsdotBasemap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.basemapWidget = void 0;
    WsdotBasemap_1 = tslib_1.__importDefault(WsdotBasemap_1);
    var basemapWidget = /** @class */ (function () {
        function basemapWidget(webMap) {
            this.widgetDiv = document.createElement("div");
            this.widgetDiv.innerHTML = "WSDOT";
            this.widgetDiv.setAttribute("class", "wsdotBasemap");
            this.widgetDiv.addEventListener("click", handleChangeBasemap);
            function handleChangeBasemap(e) {
                changeBasemap(webMap, e);
            }
            function changeBasemap(map, widgetDiv) {
                // (widgetDiv.target as HTMLElement)!.classList.remove()
                map.basemap.id == "wsdot-basemap" ? toggleSattelite() : toggleWSDOT();
                function toggleSattelite() {
                    map.basemap = "satellite";
                    widgetDiv.target.setAttribute("class", "satelliteBasemap");
                    widgetDiv.target.innerHTML = "Satellite";
                }
                function toggleWSDOT() {
                    map.basemap = WsdotBasemap_1.default;
                    widgetDiv.target.setAttribute("class", "wsdotBasemap");
                    widgetDiv.target.innerHTML = "WSDOT";
                }
            }
        }
        return basemapWidget;
    }());
    exports.basemapWidget = basemapWidget;
});
//# sourceMappingURL=basemapWidget.js.map