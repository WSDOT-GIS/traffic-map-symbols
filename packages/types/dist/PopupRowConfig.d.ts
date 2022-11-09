import FeatureInfo from "./FeatureInfo";
interface PopupRowConfig {
    label: ((feature: FeatureInfo) => string) | string;
    value: {
        text?: string;
        fieldName?: string;
        isHTML?: boolean;
        isDate?: boolean;
        isTime?: boolean;
        custom?: (feature: FeatureInfo) => string;
    };
}
export default PopupRowConfig;
//# sourceMappingURL=PopupRowConfig.d.ts.map