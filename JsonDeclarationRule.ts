///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
///<reference path="Constants.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class JsonDeclarationRule implements Rule{

    public checkToken(token: string): boolean {
        console.log("Checking JSON rule");
        var tokens = token.split(" ");
        if(!(tokens[2] == "=")){
            console.log("1");
            return false;
        }
        if(!Constants.isValidType(tokens[0])){
            console.log(2);
            console.log(tokens[0]);
            return false;
        }
        if(!(tokens[3].charAt(0)== "{")){
            console.log("3");
            return false;
        }
        return true;
    }

    public getCommand(token: string): Command {

        //define run function
        var run = function(environment: Environment){
            console.log("Inside run");
            //variable name
            var variableName = token.split(" ")[1];
            console.log("Variable name: " + variableName);
            if(environment.hasVariable(variableName)){
                throw new Error("Variable " + variableName + " already defined: " + token);
            }

            //json object isolation
            var startBracket = token.indexOf("{");
            var endBracket = token.lastIndexOf("}");
            var jsonText = token.substring(startBracket, endBracket + 1);
            console.log(jsonText);
            var jsonObj;
            try{
                jsonObj = JSON.parse(jsonText);
            }
            catch(e){
                throw new Error("Invalid JSON at: " + token + "\n\n" + e.toString());
            }
            console.log("Creating object from JSON...");
            var newLayout: Layout = Layout.fromJSON(environment, jsonObj);
            if(newLayout.rootTag == null){
                var rootString = Constants.getRootTag(token.split(" ")[0]);
                newLayout.rootTag = rootString;
            }
            //add variable
            environment.addNewVariable(variableName, newLayout);
        };

        //build command
        return CommandBuilder.build(run);
    }


}