/**
 * Created by Evan on 10/17/2016.
 */
var Utils = (function () {
    function Utils() {
    }
    Utils.isAString = function (input) {
        var startMark = input.indexOf("\"");
        var endMark = input.lastIndexOf("\"");
        /*var newString = input.substring(startMark, endMark);
        if(newString.length > 0){
            return true;
        }
        else{
            return false;
        }*/
        if (startMark != endMark) {
            return true;
        }
        else {
            return false;
        }
    };
    Utils.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };
    Utils.isNormalInteger = function (str) {
        var n = ~~Number(str);
        return String(n) === str && n >= 0;
    };
    Utils.shaveQuotes = function (input) {
        return input.substring(1, input.length - 1);
    };
    Utils.getMiddleText = function (input) {
        var startMark = input.indexOf(".");
        var endMark = input.lastIndexOf(".");
        return input.substring(startMark + 1, endMark);
    };
    return Utils;
}());
//# sourceMappingURL=Utils.js.map