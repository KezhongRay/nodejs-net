/**
 * Created by lkz on 2015/12/24.
 */
var redis = require("redis");
var client;
function initRedis(connect) {
    client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    client.on("connect", function () {
        console.log("redis connect success!");
        connect();
    });
}

function quitRedis() {
    client.quit();
    console.log("redis quit success!");
}

function getInfo(str, callback) {
    initRedis(function () {
        client.get(str, function (err, reply) {
            if(err){
                console.error(err.message);
            }else {
                quitRedis();
                callback(reply);
            }
        })
    });
}

function setInfo(str, info, callback) {
    initRedis(function () {
        client.set(str, info, function (err, reply) {
            if(err){
                console.error(err.message);
            }else {
                quitRedis();
                callback(reply);
            }
        })
    })
}

function zaddInfo(list, score, str, callback){
    initRedis(function () {
        client.zadd(list, score, str, function (err, reply) {
            if(err){
                console.error(err.message);
            }else {
                quitRedis();
                callback(reply);
            }
        })
    })
}

function zrevrangeInfo(list, callback){
    initRedis(function () {
        client.zrevrange(list, 0, -1, "WITHSCORES", function (err, reply) {
            if(err){
                console.error(err.message);
            }else {
                quitRedis();
                callback(reply);
            }
        })
    })
}

function zrevrankInfo(list, str, callback){
    initRedis(function () {
        client.zrevrank(list, str, function (err, reply) {
            if(err){
                console.error(err.message);
            }else {
                quitRedis();
                callback(reply);
            }
        })
    })
}

function zscoreInfo(list, str, callback){
    initRedis(function () {
        client.zscore(list, str, function (err, reply) {
            if(err){
                console.error(err.message);
            }else {
                quitRedis();
                callback(reply);
            }
        })
    })
}

exports.getInfo = getInfo;
exports.setInfo = setInfo;
exports.zaddInfo = zaddInfo;
exports.zrevrangeInfo = zrevrangeInfo;
exports.zrevrankInfo = zrevrankInfo;
exports.zscoreInfo = zscoreInfo;

//redisClient.zaddInfo("rankOne", 15, "test4", function (reply) {
//    console.log(reply);
//});
//redisClient.zrangeInfo("rank1", function (reply) {
//    console.log(reply);
//});
