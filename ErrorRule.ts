///<reference path="Rule.ts"/>
///<reference path="Utils.ts"/>
///<reference path="Command.ts"/>
///<reference path="Environment.ts"/>
///<reference path="CommandBuilder.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class ErrorRule implements Rule{
    getCommand(token: string): Command {
        return undefined;
    }

    checkToken(token: string): boolean {
        return undefined;
    }


}
