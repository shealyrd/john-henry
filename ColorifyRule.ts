///<reference path="Rule.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="NamedVariableCollection.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class ColorifyRule implements Rule{

    checkToken(token: string): boolean {
        if(!(token == "Colorify()")){
            return false;
        }
        return true;
    }

    getCommand(token: string): Command {
        var run = function(environment: Environment){
            var variables: NamedVariableCollection = environment.getAllVariables();

            for(var variable of variables.variables){
                if(variable.content.hasAttribute("background") == -1){
                    var randomNum = Math.floor(Math.random()*89999+10000);
                    variable.content.addAttribute("android", "background", "#FF" + randomNum);
                }
            }
        };

        return CommandBuilder.build(run);
    }
}