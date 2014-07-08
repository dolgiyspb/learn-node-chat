/**
 * Created by alex on 08.07.14.
 */
$(function(){
    document.location.hash = "";

    var socket = io('http://localhost:8080');
    var chat = new Chat(socket);
    $(".rooms-list li a").on("click", function(){
        chat.changeRoom(this, socket);
    });
    socket.on("connect", function(){
        chat.changeRoom($(".rooms-list li:first a"));
    });
    socket.on('join', function (data) {
        var message = "К нам присоединился "+data.username;
        chat.addMessage(message);
    });
    socket.on("message", function(data){
        chat.addMessage(data.username + ": " + data.message);
    });
    socket.on("reconnect", function(){
        socket.emit("reconnect to room", { room :  chat.getRoom() });
    });
    $("#send-message").on("click", function(){
        chat.sendMessage($("#message-text").val());
    });
});
function Chat(ws) {
    var messages = [];
    var socket = ws;
    var chat = $(".chat-field");
    var room = document.location.hash.split("#")[1];
    this.addMessage = function (message){
        messages.push(message);
        this.renderChat();
    }
    this.getRoom = function(){
        return room;
    }
    this.renderChat = function() {
        chat.empty();
        messages.forEach(function(message){
            chat.append($("<p></p>").html(message));
        });
    }
    this.changeRoom = function(anchor){
        var a = $(anchor);
        var href = a.attr("href");
        if(document.location.hash === href){
            return;
        }

        document.location.hash = href;
        room = href.split("#")[1];
        socket.emit("change room", { room :  room });
        this.clearMessages();
    }
    this.sendMessage = function(message){
        socket.emit("message", {message : message, room: room});
    }
    this.clearMessages = function() {
        messages = [];
    }

}

