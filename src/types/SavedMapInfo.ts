import ExtentInfo from "./ExtentInfo";

interface SavedMapInfo {
    t: string; // title
    e: ExtentInfo; // extent
    l: { i: string, v: boolean | undefined }[]; // layers: {id, visible}
    b: string; // basemap
    s: boolean; // selected
}

export default SavedMapInfo;