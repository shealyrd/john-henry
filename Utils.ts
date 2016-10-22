/**
 * Created by Evan on 10/17/2016.
 */

class Utils{

    public static isAString(input: string): boolean{
        var startMark = input.indexOf("\"");
        var endMark = input.lastIndexOf("\"");
        /*var newString = input.substring(startMark, endMark);
        if(newString.length > 0){
            return true;
        }
        else{
            return false;
        }*/
        if(startMark != endMark){
            return true;
        }
        else{
            return false;
        }
    }

    public static replaceAll(str, find, replace): string {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    public static isNormalInteger(str): boolean {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}

    public static shaveQuotes(input: string): string{
        return input.substring(1, input.length -1);
    }

    public static getMiddleText(input: string): string{
        var startMark = input.indexOf(".");
        var endMark = input.lastIndexOf(".");
        return input.substring(startMark + 1, endMark);
    }
}