///<reference path="Rule.ts"/>
///<reference path="Constants.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="Layout.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var DeclareThroughCopyRule = (function () {
    function DeclareThroughCopyRule() {
    }
    DeclareThroughCopyRule.prototype.checkToken = function (token) {
        console.log("Declare through copy");
        var tokens = token.split(" ");
        if (!(tokens[2] == "=")) {
            console.log("1");
            return false;
        }
        if (!Constants.isValidType(tokens[0])) {
            console.log("2");
            return false;
        }
        if (!(tokens[3].split(".").length == 2)) {
            console.log("3");
            return false;
        }
        var firstDot = tokens[3].indexOf(".");
        var firstPar = tokens[3].indexOf("(");
        var arg = tokens[3].substring(firstDot + 1, firstPar);
        if (!(arg == "copy")) {
            console.log("4");
            console.log(arg);
            return false;
        }
        return true;
    };
    DeclareThroughCopyRule.prototype.getCommand = function (token) {
        //define run function
        var run = function (environment) {
            var tokens = token.split(" ");
            //variable name
            var variableName = token.split(" ")[1];
            if (environment.hasVariable(variableName)) {
                throw new Error("Variable " + variableName + " already defined: " + token);
            }
            var firstDot = tokens[3].indexOf(".");
            var copiedObjName = tokens[3].substring(0, firstDot);
            if (!(environment.hasVariable(copiedObjName))) {
                throw new Error("No such variable \"" + copiedObjName + "\" : " + token);
            }
            console.log("copied name: " + copiedObjName);
            var locatedVar = environment.getVariable(copiedObjName);
            console.log("located name: " + locatedVar.name);
            console.log("located content: " + JSON.stringify(locatedVar.content));
            var tempLayout = locatedVar.content;
            console.log("content extracted");
            var newLayout = tempLayout.copy(environment);
            console.log("var name: " + variableName);
            console.log("content: " + JSON.stringify(newLayout));
            //add variable
            environment.addNewVariable(variableName, newLayout);
        };
        //build command
        return CommandBuilder.build(run);
    };
    return DeclareThroughCopyRule;
}());
//# sourceMappingURL=DeclareThroughCopyRule.js.map