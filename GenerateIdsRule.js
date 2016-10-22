///<reference path="Rule.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="NamedVariableCollection.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var GenerateIdsRule = (function () {
    function GenerateIdsRule() {
    }
    GenerateIdsRule.prototype.checkToken = function (token) {
        if (!(token == "GenerateIds()")) {
            return false;
        }
        return true;
    };
    GenerateIdsRule.prototype.getCommand = function (token) {
        var run = function (environment) {
            var variables = environment.getAllVariables();
            for (var _i = 0, _a = variables.variables; _i < _a.length; _i++) {
                var variable = _a[_i];
                if (variable.content.hasAttribute("id") == -1) {
                    variable.content.addAttribute("android", "id", variable.name);
                }
            }
            for (var _b = 0, _c = variables.variables; _b < _c.length; _b++) {
                var variable = _c[_b];
                GenerateIdsRule.generateIdsForChildren(environment, variable.content);
            }
        };
        return CommandBuilder.build(run);
    };
    GenerateIdsRule.generateIdsForChildren = function (environment, layout) {
        var i = 0;
        for (var _i = 0, _a = layout.children; _i < _a.length; _i++) {
            var child = _a[_i];
            i++;
            if (child.hasAttribute("id") == -1) {
                var parentID = layout.getAttribute("id");
                child.addAttribute("android", "id", parentID + "_child_" + i);
            }
            GenerateIdsRule.generateIdsForChildren(environment, child);
        }
    };
    return GenerateIdsRule;
}());
//# sourceMappingURL=GenerateIdsRule.js.map