///<reference path="Environment.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

interface Command{
    run(environment: Environment): void;
}