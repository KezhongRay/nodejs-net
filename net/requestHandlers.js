/**
 * Created by lkz on 2015/12/22.
 */
var redisClient = require("./redisClient");

//刷新排行榜
function postRank(search, request, response) {
    var postData = "";
    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    request.addListener("end", function () {
        postData = decodeURI(postData);
        console.log("数据接收完毕:" + postData);
        var arr = postData.split("=")[1].split("|");
        redisClient.zscoreInfo(arr[0], arr[2], function (reply) {
            if(reply == null || reply < parseInt(arr[1])){
                redisClient.zaddInfo(arr[0], arr[1], arr[2], function (reply) {
                    response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin":"*"});
                    response.write("change rank " + arr[0] + " success");
                    response.end();
                });
            }else{
                response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin":"*"});
                response.write("not need change rank info");
                response.end();
            }
        });

    });
}

//获取排行榜
function getRank(search, request, response) {
    var searchObj = searchParse(search);
    redisClient.zrevrangeInfo(searchObj["rankName"], function (reply) {
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin":"*"});
        response.write(reply.toString());
        response.end();
    });
}

//获取玩家当前排名
function getMyRank(search, request, response) {
    var searchObj = searchParse(search);
    searchObj["userName"] = decodeURI(searchObj["userName"]);
    redisClient.zrevrankInfo(searchObj["rankName"], searchObj["userName"], function (reply) {
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin":"*"});
        response.write(reply + "");
        response.end();
    });
}

function searchParse(search){
    var resultObj = {};
    if(search && search.length > 1){
        var searchs = search.substring(1);
        var items = searchs.split('&');
        for(var index = 0 ; index < items.length ; index++ ){
            if(! items[index]){
                continue;
            }
            var kv = items[index].split('=');
            resultObj[kv[0]] = typeof kv[1] === "undefined" ? "":kv[1];
        }
    }
    return resultObj;
}

exports.postRank = postRank;
exports.getRank = getRank;
exports.getMyRank = getMyRank;