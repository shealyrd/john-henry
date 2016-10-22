///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var ErrorRule = (function () {
    function ErrorRule() {
    }
    ErrorRule.prototype.getCommand = function (token) {
        return undefined;
    };
    ErrorRule.prototype.checkToken = function (token) {
        return undefined;
    };
    return ErrorRule;
}());
//# sourceMappingURL=ErrorRule.js.map