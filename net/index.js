/**
 * Created by lkz on 2015/12/22.
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/postRank"] = requestHandlers.postRank;
handle["/getRank"] = requestHandlers.getRank;
handle["/getMyRank"] = requestHandlers.getMyRank;

server.start(router.route, handle);
