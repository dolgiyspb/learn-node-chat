/**
 * Created by alex on 07.07.14.
 */
var mongoose = require("../lib/mongoose");
module.exports.get = function(req, res, next) {
    mongoose.models.ChatRoom.find({}, function(err, rooms){
        if(err){
            next(err);
        }
        res.render("chat", {title : "Chat room", rooms: rooms});
    });

}


