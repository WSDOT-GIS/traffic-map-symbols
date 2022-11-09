declare type VerticalDirection = "i" | "n" | "s";
declare type HorizontalDirection = "i" | "w" | "e";
/**
 * A string representing extent directions.
 */
export declare type ExtentDirections = `${VerticalDirection}${HorizontalDirection}`;
/**
 * Provides information about an extent.
 */
export default interface ExtentInfo {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    title?: string;
    id?: string;
}
export {};
//# sourceMappingURL=ExtentInfo.d.ts.map