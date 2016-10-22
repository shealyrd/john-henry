///<reference path="Rule.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="NamedVariableCollection.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */


class GenerateIdsRule implements Rule{

    checkToken(token: string): boolean {
       if(!(token == "GenerateIds()")){
           return false;
       }
       return true;
    }

    getCommand(token: string): Command {
        var run = function(environment: Environment){
            var variables: NamedVariableCollection = environment.getAllVariables();

            for(let variable of variables.variables){
                if(variable.content.hasAttribute("id") == -1){
                    variable.content.addAttribute("android", "id", variable.name);
                }
            }
            for(let variable of variables.variables){
                GenerateIdsRule.generateIdsForChildren(environment, variable.content);
            }

        };

        return CommandBuilder.build(run);
    }

    protected static generateIdsForChildren(environment: Environment, layout: Layout): void{
            var i = 0;
            for(let child of layout.children){
                i++;
                if(child.hasAttribute("id") == -1){
                    var parentID = layout.getAttribute("id");
                    child.addAttribute("android", "id", parentID + "_child_" + i);
                }
                GenerateIdsRule.generateIdsForChildren(environment, child);
            }
    }


}