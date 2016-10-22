///<reference path="Rule.ts"/>
///<reference path="ErrorRule.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class RuleCollection{
    rules: Rule[] = [];

    public getObjName(obj): string{
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    public findRuleFor(token: string): Rule{
        console.log("Inside findRuleFor");
        var result: Rule = null;
        for(var rule of this.rules){
            console.log("Inside checkToken");
            var isClear: boolean = rule.checkToken(token);
            if(isClear){
                if(result != null){
                    this.throwDuplicateRuleWarning(token);
                }
                result = rule;
                console.log("Chosen: " + this.getObjName(result) + "\n");
            }
            else{
                console.log("Tried: " + this.getObjName(result) + "\n");
            }
        }
        if(result == null){
            return new ErrorRule();
        }
        else{
            return result;
        }
    }

    private throwDuplicateRuleWarning(token: string) {
        console.log("Duplicate rule warning at: " + token);
    }

    public add(rule: Rule): void{
        this.rules.push(rule);
    }

    public addAll(rules: Rule[]): void{
        for(var rule of rules){
            this.add(rule);
        }
    }

}