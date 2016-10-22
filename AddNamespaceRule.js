///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var AddNamespaceRule = (function () {
    function AddNamespaceRule() {
    }
    AddNamespaceRule.prototype.checkToken = function (token) {
        var tokens = token.split(" ");
        if (!(tokens[1] == "=")) {
            return false;
        }
        if (!(Utils.isAString(tokens[2]))) {
            return false;
        }
        if (!(tokens[0].split(".").length == 3)) {
            return false;
        }
        if (!(Utils.getMiddleText(tokens[0]) == "namespaces")) {
            return false;
        }
        return true;
    };
    AddNamespaceRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var tokens = token.split(" ");
            var varHeader = tokens[0];
            var firstDot = tokens[0].indexOf(".");
            var secondDot = tokens[0].lastIndexOf(".");
            var varName = tokens[0].substring(0, firstDot);
            if (!(environment.hasVariable(varName))) {
                throw new Error("No such variable \"" + varName + "\" : " + token);
            }
            var newNamespaceName;
            newNamespaceName = tokens[0].substring(secondDot + 1, tokens[0].length);
            var valueStr = Utils.shaveQuotes(tokens[2]);
            environment.getVariable(varName).content.addNamespace(newNamespaceName, valueStr);
        };
        return CommandBuilder.build(run);
    };
    return AddNamespaceRule;
}());
//# sourceMappingURL=AddNamespaceRule.js.map