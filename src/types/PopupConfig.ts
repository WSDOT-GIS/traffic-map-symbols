import FeatureInfo from "./FeatureInfo";
import MoreInfoURLInfo from "./MoreInfoURLInfo";
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
    title?: {
        text?: string; // display hard coded string
        fieldName?: string; // Display field value
        isHTML?: boolean; // Determines whether or not title contains HTML
        custom?: (feature: FeatureInfo) => string; // Function that takes feature
    };
    subtitle?: PopupRowConfig;// display hard coded subtitle string
    imageFieldName?: string;
    content: PopupRowConfig[];
    moreInfoURL?: {
        text?: string; // display hard coded string
        fieldName?: string; // display field value
        custom?: (feature: FeatureInfo) => MoreInfoURLInfo;
    };
}

export default PopupConfig;
