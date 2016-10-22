///<reference path="Environment.ts"/>
///<reference path="RuleCollection.ts"/>
///<reference path="Rule.ts"/>
///<reference path="ErrorRule.ts"/>
///<reference path="Command.ts"/>
///<reference path="AddChildRule.ts"/>
///<reference path="AddNamespaceRule.ts"/>
///<reference path="DeclareThroughCopyRule.ts"/>
///<reference path="GenerateIdsRule.ts"/>
///<reference path="JsonDeclarationRule.ts"/>
///<reference path="SetAndroidAttributeRule.ts"/>
///<reference path="SetCustomNamespaceAttributeRule.ts"/>
///<reference path="SetMatchParentRule.ts"/>
///<reference path="SetRootTagRule.ts"/>
///<reference path="SetWrapContentRule.ts"/>
///<reference path="ColorifyRule.ts"/>
///<reference path="ProjectEmitXmlRule.ts"/>
///<reference path="ProjectEmitJsonRule.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class Engine{
    environment: Environment = new Environment();
    rules: RuleCollection = new RuleCollection();

    protected setRules(): void{
        this.rules.addAll([
            new AddChildRule(),
            new AddNamespaceRule(),
            new DeclareThroughCopyRule(),
            new GenerateIdsRule(),
            new JsonDeclarationRule(),
            new SetAndroidAttributeRule(),
            new SetCustomNamespaceAttributeRule(),
            new SetMatchParentRule(),
            new SetRootTagRule(),
            new SetWrapContentRule(),
            new ColorifyRule(),
            new ProjectEmitXmlRule(),
            new ProjectEmitJsonRule()
        ]);
    }

    public run(input: string): void{
        this.setRules();
        var arrayOfLines: string[] = input.split(';');
        console.log("Number of tokens: " + arrayOfLines.length);
        for(var token of arrayOfLines){
            token = this.scrubToken(token);
            console.log("Considering token: " + token);
            var chosenRule: Rule = this.rules.findRuleFor(token);
            if(chosenRule instanceof ErrorRule){
                this.handleError(token);
            }
            else{
                var chosenCommand: Command = chosenRule.getCommand(token);
                this.environment.runCommand(chosenCommand);
            }
            this.environment.addToProject("source.jh", input);
        }

    }

    protected handleError(line: string){
        console.log("Unknown statement: " + line);
    }

    public printVars(){
        console.log(this.environment.variables.toString());
    }

    private scrubToken(token: string): string {
        return token.trim();
    }

    public getResult(): any{
        return this.environment.getResult();
    }
}
