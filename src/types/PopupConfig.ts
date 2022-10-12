import type FeatureInfo from "./FeatureInfo";
import type ForecastListInfo from "./ForecastListInfo";
import type MoreInfoURLInfo from "./MoreInfoURLInfo";
import type PopupRowConfig from "./PopupRowConfig";

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
    weatherForecast?:ForecastListInfo|undefined;
    content: PopupRowConfig[];
    moreInfoURL?: {
        text?: string; // display hard coded string
        fieldName?: string; // display field value
        custom?: (feature: FeatureInfo) => MoreInfoURLInfo;
    };
    paging?: {
        direction: "vertical" | "horizontal";
        maxPage: number;
    };
}

export default PopupConfig;
