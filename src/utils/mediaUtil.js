"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmallMedia = exports.isMobile = void 0;
const isMobile = () => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    }
    else {
        return false;
    }
};
exports.isMobile = isMobile;
const isSmallMedia = () => {
    const isSmall = window.matchMedia("(max-width: 600px)").matches
        || window.matchMedia("(max-height: 600px)").matches;
    return isSmall;
};
exports.isSmallMedia = isSmallMedia;
//# sourceMappingURL=mediaUtil.js.map