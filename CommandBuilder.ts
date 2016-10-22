///<reference path="Environment.ts"/>
///<reference path="Command.ts"/>
///<reference path="CommandImplementation.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class CommandBuilder{

    public static build(runnable: (environment: Environment) => void): Command{
        var impl = new CommandImplementation();
        impl.setRunnable(runnable);
        return impl;
    }
}
