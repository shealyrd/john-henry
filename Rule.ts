///<reference path="Command.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

interface Rule{

    checkToken(token: string): boolean;
    getCommand(token: string): Command;

}
