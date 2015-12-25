/**
 * Created by lkz on 2015/12/22.
 */
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        request.setEncoding("utf-8");
        var urlInfo = url.parse(request.url);
        route(handle, urlInfo.pathname, urlInfo.search, request, response);
    }

    var port = process.env.OPENSHIFT_INTERNAL_PORT||8080;
    var ip = process.env.OPENSHIFT_INTERNAL_IP||"127.0.0.1";

    console.log(port);
    console.log(ip);
    http.createServer(onRequest).listen(port, ip, function () {
        console.log((new Date()) + ' Server is listening on port ' + port);
    });
    console.log("Server has started.");
}

exports.start = start;