define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteCookie = exports.checkCookie = exports.getCookie = exports.setCookie = void 0;
    var maxDays = 30;
    var setCookie = function (name, val) {
        var date = new Date();
        var value = val;
        // Set it expire in days
        date.setTime(date.getTime() + (maxDays * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    };
    exports.setCookie = setCookie;
    var getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        var cookieValue = "";
        if (parts.length == 2) {
            var partsPop = parts.pop();
            if (partsPop) {
                var val = partsPop.split(";").shift();
                if (val) {
                    cookieValue = val;
                }
            }
        }
        return cookieValue;
    };
    exports.getCookie = getCookie;
    var checkCookie = function (name) {
        if (exports.getCookie(name))
            return true;
        else
            return false;
    };
    exports.checkCookie = checkCookie;
    var deleteCookie = function (name) {
        var date = new Date();
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
    };
    exports.deleteCookie = deleteCookie;
});
//# sourceMappingURL=cookieUtil.js.map