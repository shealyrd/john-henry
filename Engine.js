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
var Engine = (function () {
    function Engine() {
        this.environment = new Environment();
        this.rules = new RuleCollection();
    }
    Engine.prototype.setRules = function () {
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
    };
    Engine.prototype.run = function (input) {
        this.setRules();
        var arrayOfLines = input.split(';');
        console.log("Number of tokens: " + arrayOfLines.length);
        for (var _i = 0, arrayOfLines_1 = arrayOfLines; _i < arrayOfLines_1.length; _i++) {
            var token = arrayOfLines_1[_i];
            token = this.scrubToken(token);
            console.log("Considering token: " + token);
            var chosenRule = this.rules.findRuleFor(token);
            if (chosenRule instanceof ErrorRule) {
                this.handleError(token);
            }
            else {
                var chosenCommand = chosenRule.getCommand(token);
                this.environment.runCommand(chosenCommand);
            }
            this.environment.addToProject("source.jh", input);
        }
    };
    Engine.prototype.handleError = function (line) {
        console.log("Unknown statement: " + line);
    };
    Engine.prototype.printVars = function () {
        console.log(this.environment.variables.toString());
    };
    Engine.prototype.scrubToken = function (token) {
        return token.trim();
    };
    Engine.prototype.getResult = function () {
        return this.environment.getResult();
    };
    return Engine;
}());
//# sourceMappingURL=Engine.js.map