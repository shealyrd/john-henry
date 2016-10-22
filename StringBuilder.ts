///<reference path="Utils.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class StringBuilder{
    strings: string[] = [];
    indentation: number = 0;
    removeComments: boolean;


    public removeCommentsMode(input: boolean){
        this.removeComments = input;
    }

    public setIdentation(indentation: number){
        this.indentation = indentation;
    }

    public append(input: string){
        var n = this.indentation;
        while (n > 0) {
            this.strings.push("\t");
            n--;
        }
        this.strings.push(input);
    }

    public toString(): string{
        if(this.strings.length > 0){
            var joined: string = this.strings.join();
            if(this.removeComments){
                joined = Utils.replaceAll(joined, ",", "")
            }
            return joined;
        }
        else if(this.strings.length == 1){
            return this.strings[0];
        }
        else{
            return "";
        }
    }
}