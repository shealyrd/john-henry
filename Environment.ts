///<reference path="NamedVariableCollection.ts"/>
///<reference path="Layout.ts"/>
///<reference path="NamedVariable.ts"/>
///<reference path="Command.ts"/>
///<reference path="FilePayload.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class Environment{
    project: FilePayload = new FilePayload();
    variables: NamedVariableCollection = new NamedVariableCollection();

    public addNewVariable(name: string, content: Layout){
        var newVar = new NamedVariable(name, content);
        this.variables.add(newVar);
    }

    public getVariable(name: string): NamedVariable{
        //check for indexed children
        return this.variables.get(name);
    }

    public runCommand(chosenCommand: Command) {
        try{
            chosenCommand.run(this);
        }
        catch(e){
            console.log(e);
        }
    }

    public hasVariable(variableName: string): boolean {
        if(this.variables.containsName(variableName)){
            return true;
        }
        return false;
    }

    public getAllVariables(): NamedVariableCollection{
        return this.variables;
    }


    public getResult(): string{
        return this.project.toZip();
    }

    public addToProject(filename: string, filetext: string){
        this.project.addFile(filename, filetext);
    }
}