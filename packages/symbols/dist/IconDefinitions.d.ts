/** Provides an SVG icon with an identifier */
interface IconInfo {
    /** Identifier for an icon. */
    id: string;
    /** A string containing SVG markup defining the icon. */
    paths: string;
}
/** Defines icons for layer list */
declare const layerListIcons: IconInfo[];
/** Defines non-layer list icons */
declare const otherIcons: IconInfo[];
declare const layerListIconMap: Map<string, string>, otherIconMap: Map<string, string>;
export { layerListIcons, otherIcons, layerListIconMap, otherIconMap };
