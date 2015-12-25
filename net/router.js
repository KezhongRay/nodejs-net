/**
 * Created by lkz on 2015/12/22.
 */
function route(handle, pathname, search, request, response) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](search, request, response);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;