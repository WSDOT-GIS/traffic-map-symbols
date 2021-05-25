define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legendWidget = void 0;
    var legendWidget = /** @class */ (function () {
        function legendWidget(webMap) {
            this.widgetDiv = document.createElement("div");
            this.widgetDiv.setAttribute("id", "legendWidget");
            var legendLayers = [];
            webMap.layers.forEach(function (layer) {
                var mil = layer;
                console.log(mil.sublayers);
            });
        }
        return legendWidget;
    }());
    exports.legendWidget = legendWidget;
});
//# sourceMappingURL=legendWidget.js.map