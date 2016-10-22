///<reference path="NamedVariableCollection.ts"/>
///<reference path="Layout.ts"/>
///<reference path="NamedVariable.ts"/>
///<reference path="Command.ts"/>
///<reference path="FilePayload.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var Environment = (function () {
    function Environment() {
        this.project = new FilePayload();
        this.variables = new NamedVariableCollection();
    }
    Environment.prototype.addNewVariable = function (name, content) {
        var newVar = new NamedVariable(name, content);
        this.variables.add(newVar);
    };
    Environment.prototype.getVariable = function (name) {
        //check for indexed children
        return this.variables.get(name);
    };
    Environment.prototype.runCommand = function (chosenCommand) {
        try {
            chosenCommand.run(this);
        }
        catch (e) {
            console.log(e);
        }
    };
    Environment.prototype.hasVariable = function (variableName) {
        if (this.variables.containsName(variableName)) {
            return true;
        }
        return false;
    };
    Environment.prototype.getAllVariables = function () {
        return this.variables;
    };
    Environment.prototype.getResult = function () {
        return this.project.toZip();
    };
    Environment.prototype.addToProject = function (filename, filetext) {
        this.project.addFile(filename, filetext);
    };
    return Environment;
}());
//# sourceMappingURL=Environment.js.map