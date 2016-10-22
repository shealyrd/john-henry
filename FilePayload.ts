/**
 * Created by Evan on 10/19/2016.
 */

class FilePayload{
    files = {};

    public addFile(filename:string, file: string): void{
        this.files[filename] = file;
    }

    public toZip(): string{
        var zip = require('adm-zip');
        var zipper = new zip();
        for(var filename in this.files){
            var tempBuffer = new Buffer(this.files[filename]);
            zipper.addFile(filename, tempBuffer, '', 0644 << 16);
        }
        console.log(zipper.getEntries().length);
        for(var entry of zipper.getEntries()){
            console.log(entry.name);
            entry.isDirectiory = false;
        }
        return zipper.toBuffer();
    }


}