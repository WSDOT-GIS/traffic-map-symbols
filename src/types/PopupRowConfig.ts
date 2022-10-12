import type FeatureInfo from "./FeatureInfo";

interface PopupRowConfig {
    label: ((feature: FeatureInfo) => string) | string;
    value: {
        text?: string; // set to display the exact text
        fieldName?: string; // set to display the field value
        isHTML?: boolean; // set isHTML in addition to fieldName to convert value to HTML
        isDate?: boolean; // set isDate in addition to fieldName to convert value to date string
        isTime?: boolean; // set both isDate and isTime to convert to date and time
        custom?: (feature: FeatureInfo) => string // function should take feature as its argument
    }
}

export default PopupRowConfig;