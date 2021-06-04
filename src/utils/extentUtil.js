define(["require", "exports", "tslib", "@arcgis/core/geometry/Extent"], function (require, exports, tslib_1, Extent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test = void 0;
    Extent_1 = tslib_1.__importDefault(Extent_1);
    // interface ExtentInfo {
    //     xmin: number;
    //     // xmax: number;
    //     // ymin: number;
    //     // ymax: number;
    //     // name: string;
    // }
    var defaultExtents = [
        {
            xmin: -13911155.7073957,
            xmax: -12984203.1967109,
            ymin: 5704865.77272526,
            ymax: 6316025.98739708,
            name: "full"
        },
    ];
    // export const GetExtentInfo = (name: string): ExtentInfo => {
    //     const result = defaultExtents.filter(x => x.name == name);
    //     return result[0];
    // };
    // export const GetEsriExtent = (name: string): Extent => {
    //     const info = GetExtentInfo(name);
    //     return Convert2EsriExtent(info);
    // };
    // export const Convert2EsriExtent = (extentInfo: ExtentInfo): Extent => {
    //     // const extent = new Extent({
    //     //     xmin: extentInfo.xmin,
    //     //     xmax: extentInfo.xmax,
    //     //     ymin: extentInfo.ymin,
    //     //     ymax: extentInfo.ymax,
    //     //     spatialReference: SpatialReference.WebMercator
    //     // })
    //     // return extent
    //     return new Extent({
    //         ymax: 6316025.98739708,
    //         xmin: -13911155.7073957,
    //         xmax: -12984203.1967109,
    //         ymin: 5704865.77272526,
    //         spatialReference: { wkid: 102100 }
    //     });
    // };
    var Test = function () {
        return new Extent_1.default({
            ymax: 6316025.98739708,
            xmin: -13911155.7073957,
            xmax: -12984203.1967109,
            ymin: 5704865.77272526,
            spatialReference: { wkid: 102100 }
        });
    };
    exports.Test = Test;
});
//# sourceMappingURL=extentUtil.js.map