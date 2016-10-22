///<reference path="Rule.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/18/2016.
 */
var ProjectEmitXmlRule = (function () {
    function ProjectEmitXmlRule() {
    }
    ProjectEmitXmlRule.prototype.checkToken = function (token) {
        console.log("Inside Project emit");
        var tokens = token.split(" ");
        if (!(tokens[0].split(".").length == 2)) {
            console.log("1");
            return false;
        }
        var firstDot = tokens[0].indexOf(".");
        var firstPar = tokens[0].indexOf("(");
        var lastPar = token.lastIndexOf(")");
        var arg = tokens[0].substring(firstDot + 1, firstPar + 1);
        var obj = tokens[0].substring(0, firstDot);
        var params = token.substring(firstPar + 1, lastPar);
        if (!(params.split(" ").length == 2)) {
            console.log("4");
            console.log(params.split(" ").length);
            console.log(params.split(" ")[0]);
            return false;
        }
        var paramsCommaBreak = params.indexOf(",");
        var firstParam = params.substring(0, paramsCommaBreak);
        var secondParam = params.substring(paramsCommaBreak + 1, params.length);
        if (!(obj == "Project")) {
            console.log("2 " + obj);
            return false;
        }
        if (!(arg == "emitXml(")) {
            console.log("3 " + arg);
            return false;
        }
        if (!(Utils.isAString(firstParam))) {
            console.log("5");
            return false;
        }
        return true;
    };
    ProjectEmitXmlRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var firstPar = token.indexOf("(");
            var lastPar = token.lastIndexOf(")");
            var params = token.substring(firstPar + 1, lastPar);
            var paramsCommaBreak = params.indexOf(",");
            var firstParam = params.substring(0, paramsCommaBreak);
            var secondParam = params.substring(paramsCommaBreak + 2, params.length);
            if (!(environment.hasVariable(secondParam))) {
                throw new Error("No such variable \"" + secondParam + "\" : " + token);
            }
            environment.addToProject(Utils.shaveQuotes(firstParam) + ".xml", environment.getVariable(secondParam).content.emitXML());
        };
        return CommandBuilder.build(run);
    };
    return ProjectEmitXmlRule;
}());
//# sourceMappingURL=ProjectEmitXmlRule.js.map