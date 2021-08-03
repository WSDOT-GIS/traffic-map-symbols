import FeatureInfo from "./FeatureInfo";
import PopupRowConfig from "./PopupRowConfig";

interface PopupConfig {
    // Text for the banner
    bannerText: {
        text?: string; // display hard coded string
        fieldName?: string; // display field value
        custom?: (feature: FeatureInfo) => string; // Function that takes feature
    };
    // Optional: Badge shown next to the banner
    badgeText?: {
        text?: string; // display hard coded string
        fieldName?: string; // display field value
        custom?: (feature: FeatureInfo) => string; // Function that takes feature
    };
    title: {
        text?: string; // display hard coded string
        fieldName?: string; // Display field value
        custom?: (feature: FeatureInfo) => string; // Function that takes feature
    };
    imageFieldName?: string;
    content: PopupRowConfig[];
};

export default PopupConfig;
