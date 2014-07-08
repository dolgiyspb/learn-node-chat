/**
 * Created by alex on 08.07.14.
 */
var config = require("../config");
var cookieParser = require("cookie-parser")(config.get("session:secret"));
var sessionStore = require("./sessionStore");
var User = require("./createSchema").User;


module.exports = function(server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on("change room", function(data) {
            var oldRoom = socket.client.request.user.chatRoom;
            User.update({_id : socket.client.request.user._id}, {chatRoom : data.room}, function(err) {
                if(!err){
                    if(oldRoom && oldRoom != data.room) {
                        socket.leave(oldRoom);
                    }
                    socket.join(data.room);
                    socket.client.request.user.chatRoom = data.room;
                    io.to(data.room).emit('join', { username : socket.client.request.user.username });
                }
            });
        });
        socket.on("message", function(data){
            io.to(socket.client.request.user.chatRoom).emit("message", { message : data.message , username: socket.client.request.user.username });
        })
        socket.on("reconnect to room", function(data){
            User.update({_id : socket.client.request.user._id}, {chatRoom : data.room}, function(err) {
                if(!err){
                    socket.join(data.room);
                    socket.client.request.user.chatRoom = data.room;
                }
            });
        });
    });
    io.on("logout", function(){
        console.log("Logout");
    });

    io.set("authorization", function(handshake, accept){
        cookieParser(handshake, {}, function(err){
            sessionStore.load(handshake.signedCookies["connect.sid"], function(err, session){
                if(err || !session){
                    accept("Session error", false);

                }else{
                    handshake.session = session;
                    User.findById(session.passport.user, function(err, user){
                        if(err || !user) {
                            accept("User not found", false);
                        }
                        handshake.user = user;
                        accept(null, true);
                    });
                }
            });
        })
    });
    return io;
}