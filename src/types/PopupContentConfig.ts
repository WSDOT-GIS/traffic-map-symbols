interface PopupRowConfig {
    label: string,
    value: {
        text: string; // set to display the exact text
        fieldName: string; // set to display the field value
        isDate: boolean; // set isDate in addition to fieldName to convert value to date string
        isTime: boolean; // set both isDate and isTime to convert to date and time
    }
}

export default PopupRowConfig;