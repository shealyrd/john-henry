///<reference path="Layout.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var NamedVariable = (function () {
    function NamedVariable(name, content) {
        this.name = name;
        this.content = content;
    }
    NamedVariable.prototype.toString = function () {
        return "Name: " + this.name + "\nLayout:\n" + this.content.emitXML() + "\nJSON:\n" + JSON.stringify(this.content);
    };
    return NamedVariable;
}());
//# sourceMappingURL=NamedVariable.js.map