import ExtentInfo from "./ExtentInfo";
// import LayerInfo from "./LayerInfo";

// interface SavedMapInfo {
//     title: string;
//     extent: ExtentInfo;
//     layers: {i: string, v: boolean}[];
//     basemap: string;
//     selected: boolean;
// }

interface SavedMapInfo {
    t: string; // title
    e: ExtentInfo; // extent
    l: { i: string, v: boolean }[]; // layers: {id, visible}
    b: string; // basemap
    s: boolean; // selected
}

export default SavedMapInfo;