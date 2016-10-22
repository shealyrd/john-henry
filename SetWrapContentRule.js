/**
 * Created by Evan on 10/17/2016.
 */
///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
var SetWrapContentRule = (function () {
    function SetWrapContentRule() {
    }
    SetWrapContentRule.prototype.checkToken = function (token) {
        var tokens = token.split(" ");
        if (!(tokens[0].split(".").length == 2)) {
            return false;
        }
        var firstDot = tokens[0].indexOf(".");
        var arg = tokens[0].substring(firstDot + 1, tokens[0].length);
        if (!(arg == "setWrapContent()")) {
            return false;
        }
        return true;
    };
    SetWrapContentRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var tokens = token.split(" ");
            var varHeader = tokens[0];
            var firstDot = tokens[0].indexOf(".");
            var varName = tokens[0].substring(0, firstDot);
            if (!(environment.hasVariable(varName))) {
                throw new Error("No such variable \"" + varName + "\" : " + token);
            }
            environment.getVariable(varName).content.addAttribute("android", "layout_width", "wrap_content");
            environment.getVariable(varName).content.addAttribute("android", "layout_height", "wrap_content");
        };
        return CommandBuilder.build(run);
    };
    return SetWrapContentRule;
}());
//# sourceMappingURL=SetWrapContentRule.js.map