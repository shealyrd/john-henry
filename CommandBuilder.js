///<reference path="Environment.ts"/>
///<reference path="Command.ts"/>
///<reference path="CommandImplementation.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var CommandBuilder = (function () {
    function CommandBuilder() {
    }
    CommandBuilder.build = function (runnable) {
        var impl = new CommandImplementation();
        impl.setRunnable(runnable);
        return impl;
    };
    return CommandBuilder;
}());
//# sourceMappingURL=CommandBuilder.js.map