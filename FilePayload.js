/**
 * Created by Evan on 10/19/2016.
 */
var FilePayload = (function () {
    function FilePayload() {
        this.files = {};
    }
    FilePayload.prototype.addFile = function (filename, file) {
        this.files[filename] = file;
    };
    FilePayload.prototype.toZip = function () {
        var zip = require('adm-zip');
        var zipper = new zip();
        for (var filename in this.files) {
            var tempBuffer = new Buffer(this.files[filename]);
            zipper.addFile(filename, tempBuffer, '', 0644 << 16);
        }
        console.log(zipper.getEntries().length);
        for (var _i = 0, _a = zipper.getEntries(); _i < _a.length; _i++) {
            var entry = _a[_i];
            console.log(entry.name);
            entry.isDirectiory = false;
        }
        return zipper.toBuffer();
    };
    return FilePayload;
}());
//# sourceMappingURL=FilePayload.js.map