///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>


class CommandImplementation implements Command{
    runnable: (environment: Environment) => void;

    public setRunnable(arg: (environment: Environment) => void){
        this.runnable = arg;
    }

    run(environment: Environment): void {
        this.runnable(environment);
    }


}