///<reference path="Utils.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var StringBuilder = (function () {
    function StringBuilder() {
        this.strings = [];
        this.indentation = 0;
    }
    StringBuilder.prototype.removeCommentsMode = function (input) {
        this.removeComments = input;
    };
    StringBuilder.prototype.setIdentation = function (indentation) {
        this.indentation = indentation;
    };
    StringBuilder.prototype.append = function (input) {
        var n = this.indentation;
        while (n > 0) {
            this.strings.push("\t");
            n--;
        }
        this.strings.push(input);
    };
    StringBuilder.prototype.toString = function () {
        if (this.strings.length > 0) {
            var joined = this.strings.join();
            if (this.removeComments) {
                joined = Utils.replaceAll(joined, ",", "");
            }
            return joined;
        }
        else if (this.strings.length == 1) {
            return this.strings[0];
        }
        else {
            return "";
        }
    };
    return StringBuilder;
}());
//# sourceMappingURL=StringBuilder.js.map