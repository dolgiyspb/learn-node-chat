/**
 * Created by alex on 01.07.14.
 */
var Q = require("q");
var mongoose = require("./mongoose");
var debug = require("./debug");


mongoose.connection.on('open', createDB);

function createDB() {
    [Q.ninvoke(mongoose.connection.db, "dropDatabase")
        , createSchema
        , createUsers
        , createChatRooms
        , close]
        .reduce(Q.when, Q())
        .fail(fail)
        .done();
}
function createSchema() {
    require("./createSchema");
    return Q.all(Object.keys(mongoose.models).map(function(modelName){
        return Q.ninvoke(mongoose.models[modelName], "ensureIndexes")
    }));
}
function makeUsers() {
    var users = [
        { username : "Vasya", password: "qwerty" }
        , { username :  "Petya", password: "qwerty"}
        , { username :  "PetyaV", password: "qwerty"}
    ];
    return users.map(function(user){
        return new mongoose.models.User(user);
    });
};

function makeChatRooms() {
    var chatRooms = [
        { name : "main" },
        { name : "test room"}
    ]
    return chatRooms.map(function(room){
        return new mongoose.models.ChatRoom(room);
    });
}

function createChatRooms() {
    return Q.all(promisesMap(makeChatRooms(), function(room){
        return Q.ninvoke(room, "save");
    }));
};

function promisesMap(arr, f){
    return arr.map(function(el){
        return Q.fcall(function() {
            return f(el);
        });
    });
};
function createUsers() {
    return Q.all(promisesMap(makeUsers(), function(user){
        return Q.ninvoke(user, "save");
    }));
};
function close(result) {
    mongoose.disconnect();
}
function fail(err){
    console.log("error", err);
    close();
}