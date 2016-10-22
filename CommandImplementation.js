///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
var CommandImplementation = (function () {
    function CommandImplementation() {
    }
    CommandImplementation.prototype.setRunnable = function (arg) {
        this.runnable = arg;
    };
    CommandImplementation.prototype.run = function (environment) {
        this.runnable(environment);
    };
    return CommandImplementation;
}());
//# sourceMappingURL=CommandImplementation.js.map