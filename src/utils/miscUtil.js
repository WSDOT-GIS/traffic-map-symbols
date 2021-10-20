"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlEncode = exports.formatEpoch = void 0;
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
// Not used currently, but might need to use it to convert special chars...
const htmlEncode = (text) => {
    // Can find unicode and HTML entity values in https://www.unicodepedia.com/
    let s = text.replace(/\u2019/g, "&rsquo;");
    s = s.replace(/\u2018/g, "&lsquo;");
    s = s.replace(/\u201A/g, "&sbquo;");
    s = s.replace(/\uFFFD/g, ""); // Replacement character (usually question mark in diamond).
    s = s.replace(/\u201c/g, '&ldquo;');
    s = s.replace(/\u201d/g, '&rdquo;');
    s = s.replace(/\u201e/g, '&bdquo; ');
    s = s.replace(/\u02C6/g, '&circ;');
    s = s.replace(/\u2039/g, '&lt;');
    s = s.replace(/\u203A/g, '&gt;');
    s = s.replace(/\u2013/g, '&ndash;');
    s = s.replace(/\u2014/g, '&mdash;');
    s = s.replace(/\u2026/g, '&hellip;');
    s = s.replace(/\u00A9/g, '&copy;');
    s = s.replace(/\u00AE/g, '&reg;');
    s = s.replace(/\u2122/g, '&trade;');
    s = s.replace(/\u00BC/g, '&frac14;');
    s = s.replace(/\u00BD/g, '&frac12;');
    s = s.replace(/\u00BE/g, '&frac34;');
    s = s.replace(/\u02DC/g, "&tilde;");
    s = s.replace(/\u00A0/g, "&nbsp;");
    s = s.replace(/\u2022/g, "&bull;");
    return s;
};
exports.htmlEncode = htmlEncode;
//# sourceMappingURL=miscUtil.js.map