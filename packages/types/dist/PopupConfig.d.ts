import type FeatureInfo from "./FeatureInfo";
import type ForecastListInfo from "./ForecastListInfo";
import type MoreInfoURLInfo from "./MoreInfoURLInfo";
import type PopupRowConfig from "./PopupRowConfig";
interface PopupConfig {
    bannerText: {
        text?: string;
        fieldName?: string;
        custom?: (feature: FeatureInfo) => string;
    };
    badgeText?: {
        text?: string;
        fieldName?: string;
        custom?: (feature: FeatureInfo) => string;
    };
    title?: {
        text?: string;
        fieldName?: string;
        isHTML?: boolean;
        custom?: (feature: FeatureInfo) => string;
    };
    subtitle?: PopupRowConfig;
    imageFieldName?: string;
    weatherForecast?: ForecastListInfo | undefined;
    content: PopupRowConfig[];
    moreInfoURL?: {
        text?: string;
        fieldName?: string;
        custom?: (feature: FeatureInfo) => MoreInfoURLInfo;
    };
    paging?: {
        direction: "vertical" | "horizontal";
        maxPage: number;
    };
}
export default PopupConfig;
//# sourceMappingURL=PopupConfig.d.ts.map