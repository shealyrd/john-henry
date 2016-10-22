///<reference path="Layout.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class NamedVariable{
    name: string;
    content: Layout;

    constructor(name: string, content: Layout){
        this.name = name;
        this.content = content;
    }

    public toString():string {
        return "Name: " + this.name + "\nLayout:\n" + this.content.emitXML() + "\nJSON:\n" + JSON.stringify(this.content);
    }
}