///<reference path="Rule.ts"/>
///<reference path="ErrorRule.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var RuleCollection = (function () {
    function RuleCollection() {
        this.rules = [];
    }
    RuleCollection.prototype.getObjName = function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    };
    RuleCollection.prototype.findRuleFor = function (token) {
        console.log("Inside findRuleFor");
        var result = null;
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            console.log("Inside checkToken");
            var isClear = rule.checkToken(token);
            if (isClear) {
                if (result != null) {
                    this.throwDuplicateRuleWarning(token);
                }
                result = rule;
                console.log("Chosen: " + this.getObjName(result) + "\n");
            }
            else {
                console.log("Tried: " + this.getObjName(result) + "\n");
            }
        }
        if (result == null) {
            return new ErrorRule();
        }
        else {
            return result;
        }
    };
    RuleCollection.prototype.throwDuplicateRuleWarning = function (token) {
        console.log("Duplicate rule warning at: " + token);
    };
    RuleCollection.prototype.add = function (rule) {
        this.rules.push(rule);
    };
    RuleCollection.prototype.addAll = function (rules) {
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            this.add(rule);
        }
    };
    return RuleCollection;
}());
//# sourceMappingURL=RuleCollection.js.map