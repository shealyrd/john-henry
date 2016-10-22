///<reference path="Rule.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="NamedVariableCollection.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var ColorifyRule = (function () {
    function ColorifyRule() {
    }
    ColorifyRule.prototype.checkToken = function (token) {
        if (!(token == "Colorify()")) {
            return false;
        }
        return true;
    };
    ColorifyRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var variables = environment.getAllVariables();
            for (var _i = 0, _a = variables.variables; _i < _a.length; _i++) {
                var variable = _a[_i];
                if (variable.content.hasAttribute("background") == -1) {
                    var randomNum = Math.floor(Math.random() * 89999 + 10000);
                    variable.content.addAttribute("android", "background", "#FF" + randomNum);
                }
            }
        };
        return CommandBuilder.build(run);
    };
    return ColorifyRule;
}());
//# sourceMappingURL=ColorifyRule.js.map