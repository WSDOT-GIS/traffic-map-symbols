"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJson = exports.formatEpoch = void 0;
const tslib_1 = require("tslib");
const formatEpoch = (epoch, isTime) => {
    /* IT said date will be in UTC, so removed the workaround below. If necessary simply
              change all the methods to UTC... methods. */
    /* The date value is in local time, so do not let JS do time conversion.
       By using the UTC... functions, we can get the date as is without conversion. */
    const date = new Date(epoch);
    let text = `${formatDateTimePart(date.getMonth() + 1)}/${formatDateTimePart(date.getDate())}/${date.getFullYear()}`;
    if (isTime) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        // Check whether AM or PM
        const ampm = hours >= 12 ? "PM" : "AM";
        // Find current hour in AM-PM Format
        hours = hours % 12;
        // To display "0" as "12"
        hours = hours ? hours : 12;
        text += ` ${formatDateTimePart(hours)}:${formatDateTimePart(minutes)} ${ampm}`;
    }
    return text;
};
exports.formatEpoch = formatEpoch;
const formatDateTimePart = (part) => {
    return ("0" + part).slice(-2);
};
const fetchJson = (url, isUnicode) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    let json;
    if (isUnicode) {
        json = yield response.json();
    }
    else {
        const buffer = yield response.arrayBuffer();
        /* I think the data is in Windows-1252 (or ISO-8859-1).
           The method: response.json() by always encode everything in UTF-8, so that mess up some characters.
           To avoid this, decode the buffer with specific encoding instead. */
        const decoder = new TextDecoder('windows-1252');
        const text = decoder.decode(buffer);
        json = JSON.parse(text);
    }
    return json;
});
exports.fetchJson = fetchJson;
//# sourceMappingURL=miscUtil.js.map