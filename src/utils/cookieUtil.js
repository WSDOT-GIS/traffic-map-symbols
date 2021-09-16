"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = exports.checkCookie = exports.getCookie = exports.setCookie = void 0;
const maxDays = 3650;
const setCookie = (name, val) => {
    const date = new Date();
    // Set it expire in days
    date.setTime(date.getTime() + (maxDays * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=" + val + "; expires=" + date.toUTCString() + "; path=/";
    // console.log("Bytes: " + getBytes(val));
};
exports.setCookie = setCookie;
const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    let cookieValue = "";
    if (parts.length == 2) {
        const partsPop = parts.pop();
        if (partsPop) {
            const val = partsPop.split(";").shift();
            if (val) {
                cookieValue = val;
            }
        }
    }
    return cookieValue;
};
exports.getCookie = getCookie;
const checkCookie = (name) => {
    if (exports.getCookie(name))
        return true;
    else
        return false;
};
exports.checkCookie = checkCookie;
const deleteCookie = (name) => {
    const date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
};
exports.deleteCookie = deleteCookie;
const getBytes = (val) => {
    const escaped_string = encodeURI(val);
    let count;
    if (escaped_string.indexOf("%") != -1) {
        count = escaped_string.split("%").length - 1;
        count = count == 0 ? 1 : count;
        count = count + (escaped_string.length - (count * 3));
    }
    else {
        count = escaped_string.length;
    }
    return count;
};
//# sourceMappingURL=cookieUtil.js.map