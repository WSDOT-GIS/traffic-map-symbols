import ExtentInfo from "./ExtentInfo";
import LayerInfo from "./LayerInfo";

interface SavedMapInfo {
    title: string;
    extent: ExtentInfo;
    layers: LayerInfo[];
    selected: boolean;
}

export default SavedMapInfo;