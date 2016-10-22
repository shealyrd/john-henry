///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var SetRootTagRule = (function () {
    function SetRootTagRule() {
    }
    SetRootTagRule.prototype.checkToken = function (token) {
        var tokens = token.split(" ");
        if (!(tokens[1] == "=")) {
            return false;
        }
        if (!(Utils.isAString(tokens[2]))) {
            return false;
        }
        if (!(tokens[0].split(".").length == 2)) {
            return false;
        }
        var firstDot = tokens[0].indexOf(".");
        var arg = tokens[0].substring(firstDot + 1, tokens[0].length);
        if (!(arg == "root")) {
            return false;
        }
        return true;
    };
    SetRootTagRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var tokens = token.split(" ");
            var varHeader = tokens[0];
            var firstDot = tokens[0].indexOf(".");
            var varName = tokens[0].substring(0, firstDot);
            if (!(environment.hasVariable(varName))) {
                throw new Error("No such variable \"" + varName + "\" : " + token);
            }
            var valueStr = Utils.shaveQuotes(tokens[2]);
            environment.getVariable(varName).content.setRoot(valueStr);
        };
        return CommandBuilder.build(run);
    };
    return SetRootTagRule;
}());
//# sourceMappingURL=SetRootTagRule.js.map