///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class SetAndroidAttributeRule implements Rule{

    checkToken(token: string): boolean {
        console.log("Checking android attribute rule");
        var tokens = token.split(" ");
        if(!(tokens[1] == "=")){
            console.log("1");
            return false;
        }
        if(!(Utils.isAString(tokens[2]))){
            console.log("2");
            return false;
        }
        if(!(tokens[0].split(".").length <= 2)){
            console.log("3");
            if(!(Utils.getMiddleText(tokens[0]) == "android")){
                console.log("3.1");
                return false;
            }
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

            var attrName;
            if(varHeader.split(".").length == 2){
                attrName = tokens[0].substring(firstDot + 1, tokens[0].length);
            }
            if(varHeader.split(".").length == 3){
                attrName = tokens[0].substring(secondDot + 1, tokens[0].length);
            }

            var valueStr = Utils.shaveQuotes(tokens[2]);

            environment.getVariable(varName).content.addAttribute("android", attrName, valueStr);
        };

        return CommandBuilder.build(run);
    }


}