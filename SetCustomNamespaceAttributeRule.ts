///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class SetCustomNamespaceAttributeRule implements Rule{
    checkToken(token: string): boolean {
        console.log("Set Custom namespace");
        var tokens = token.split(" ");
        if(!(tokens[1] == "=")){
            return false;
        }
        if(!(Utils.isAString(tokens[2]))){
            return false;
        }
        if(!(tokens[0].split(".").length == 3)) {
            return false
        }
        console.log(Utils.getMiddleText(tokens[0]));
        if(Utils.getMiddleText(tokens[0]) == "android") {
            return false;
        }
        if(Utils.getMiddleText(tokens[0]) == "namespaces") {
            return false;
        }
        return true;

    }

    getCommand(token: string): Command {
        var run = function(environment: Environment){
            var tokens = token.split(" ");
            var varHeader = tokens[0];
            var firstDot = tokens[0].indexOf(".");
            var secondDot = tokens[0].lastIndexOf(".");

            var varName = tokens[0].substring(0, firstDot);
            if(!(environment.hasVariable(varName))){
                throw new Error("No such variable \"" + varName + "\" : " + token);
            }

            var namespaceName = tokens[0].substring(firstDot + 1, secondDot);
            var attrName;
            attrName = tokens[0].substring(secondDot + 1, tokens[0].length);

            var valueStr = Utils.shaveQuotes(tokens[2]);

            environment.getVariable(varName).content.addAttribute(namespaceName, attrName, valueStr);
        };

        return CommandBuilder.build(run);
    }


}