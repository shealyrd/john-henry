///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
///<reference path="Rule.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var AddChildRule = (function () {
    function AddChildRule() {
    }
    AddChildRule.prototype.checkToken = function (token) {
        console.log("Inside add child");
        var tokens = token.split(" ");
        if (!(tokens[0].split(".").length == 2)) {
            console.log(tokens[0].split(".").length);
            console.log(tokens[0].split(".")[0]);
            console.log("1");
            return false;
        }
        var firstDot = tokens[0].indexOf(".");
        var firstPar = tokens[0].indexOf("(");
        var arg = tokens[0].substring(firstDot + 1, firstPar + 1);
        if (!(arg == "addChild(")) {
            console.log("2 " + arg);
            return false;
        }
        return true;
    };
    AddChildRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var tokens = token.split(" ");
            var varHeader = tokens[0];
            var firstDot = tokens[0].indexOf(".");
            var firstPar = tokens[0].indexOf("(");
            var lastPar = tokens[0].lastIndexOf(")");
            var arg = tokens[0].substring(firstPar + 1, lastPar);
            var varName = tokens[0].substring(0, firstDot);
            if (!(environment.hasVariable(varName))) {
                throw new Error("No such variable \"" + varName + "\" : " + token);
            }
            if (!(environment.hasVariable(arg))) {
                throw new Error("No such variable \"" + arg + "\" : " + token);
            }
            environment.getVariable(varName).content.addChild(environment.getVariable(arg).content);
        };
        return CommandBuilder.build(run);
    };
    return AddChildRule;
}());
//# sourceMappingURL=AddChildRule.js.map