///<reference path="NamedVariable.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var NamedVariableCollection = (function () {
    function NamedVariableCollection() {
        this.variables = [];
    }
    NamedVariableCollection.prototype.add = function (variable) {
        this.variables.push(variable);
    };
    NamedVariableCollection.prototype.containsName = function (name) {
        for (var _i = 0, _a = this.variables; _i < _a.length; _i++) {
            var variable = _a[_i];
            console.log(variable.name + " vs " + name);
            if (variable.name == name) {
                return true;
            }
        }
        return false;
    };
    NamedVariableCollection.prototype.get = function (name) {
        for (var _i = 0, _a = this.variables; _i < _a.length; _i++) {
            var variable = _a[_i];
            if (variable.name == name) {
                return variable;
            }
        }
        return null;
    };
    NamedVariableCollection.prototype.toString = function () {
        var builder = new StringBuilder();
        for (var _i = 0, _a = this.variables; _i < _a.length; _i++) {
            var variable = _a[_i];
            builder.append(variable.toString());
            builder.append("\n");
        }
        return builder.toString();
    };
    return NamedVariableCollection;
}());
//# sourceMappingURL=NamedVariableCollection.js.map