"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEpoch = void 0;
const formatEpoch = (epoch, isTime) => {
    const date = new Date(epoch);
    let text = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    if (isTime) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        // Check whether AM or PM
        const ampm = hours >= 12 ? "PM" : "AM";
        // Find current hour in AM-PM Format
        hours = hours % 12;
        // To display "0" as "12"
        hours = hours ? hours : 12;
        text += ` ${hours}:${formatTimePart(minutes)}${ampm}`;
    }
    return text;
};
exports.formatEpoch = formatEpoch;
const formatTimePart = (part) => {
    return ("0" + part).slice(-2);
};
//# sourceMappingURL=miscUtil.js.map