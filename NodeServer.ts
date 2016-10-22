///<reference path="Engine.ts"/>
///<reference path="Test.ts"/>
/**
 * Created by Evan on 10/18/2016.
 */


class NodeServer {

    public static startServer() {
        var http = require("http"),
            url = require("url"),
            path = require("path"),
            fileSystem = require("fs"),
            zip = require('adm-zip');

        var server = http.createServer(function (request, response) {

            if (request.method === "GET") {
                var dataBuffer = new Buffer("hello,this is test data",'utf-8');
                var dataBuffer2 = new Buffer("hello,this is test data again",'utf-8');//console.log(dataBuffer.toString());
                var zipper = new zip();
                zipper.addFile('test.txt',dataBuffer);
                zipper.addFile('test2.txt',dataBuffer2);
                var zipBuffer = zipper.toBuffer();
                response.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=file.zip'});
                response.end(zipBuffer);
            }

            if (request.method === "POST") {
                console.log("Post acknowledged");
                var requestbody = "";
                request.on('data', function (data) {
                    console.log("Reading data: " + data);
                    requestbody += data;
                });
                request.on('end', function (end) {
                    console.log("request read");
                    console.log(requestbody.length);
                    console.log(requestbody);
                    var formattedBody = requestbody.replace("textarea=", "");
                    //var payload = JSON.parse(formattedBody);
                    var engine = new Engine();
                    engine.run(formattedBody);
                    var result = engine.getResult();
                    response.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=project.zip'});
                    response.end(result);
                    /*response.writeHead(404, {"Content-Type": "text/plain"});
                    response.end(result);*/
                });
            }
        });
        // Listen on port 8000, IP defaults to 127.0.0.1
        server.listen(8080);
        // Put a friendly message on the terminal
        console.log("Server running at http://127.0.0.1:8000/");
        console.log("test");

    }
}

NodeServer.startServer();
