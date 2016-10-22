///<reference path="NamedVariable.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class NamedVariableCollection{
    variables: NamedVariable[] = [];

    public add(variable: NamedVariable){
        this.variables.push(variable);
    }

    public containsName(name: string): boolean{
        for(var variable of this.variables){
            console.log(variable.name + " vs " + name);
            if(variable.name == name){
                return true;
            }
        }
        return false;
    }

    public get(name: string): NamedVariable {
        for(var variable of this.variables){
            if(variable.name == name){
                return variable;
            }
        }
        return null;
    }

    public toString(): string{
        var builder = new StringBuilder();
        for(var variable of this.variables){
            builder.append(variable.toString())
            builder.append("\n");
        }
        return builder.toString();
    }
}