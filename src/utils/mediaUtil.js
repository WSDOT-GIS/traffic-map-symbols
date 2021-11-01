"use strict";
// export const isMobile = (): boolean => {
//     if (navigator.userAgent.match(/Android/i)
//         || navigator.userAgent.match(/webOS/i)
//         || navigator.userAgent.match(/iPhone/i)
//         || navigator.userAgent.match(/iPad/i)
//         || navigator.userAgent.match(/iPod/i)
//         || navigator.userAgent.match(/BlackBerry/i)
//         || navigator.userAgent.match(/Windows Phone/i)) {
//         return true;
//     }
//     else { return false; }
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmallMedia = void 0;
const isSmallMedia = () => {
    const isSmall = window.matchMedia("(max-width: 600px)").matches
        || window.matchMedia("(max-height: 400px)").matches;
    return isSmall;
};
exports.isSmallMedia = isSmallMedia;
//# sourceMappingURL=mediaUtil.js.map