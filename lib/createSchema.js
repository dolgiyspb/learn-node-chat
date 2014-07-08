/**
 * Created by alex on 27.06.14.
 */
var mongoose = require("./mongoose");
var models = require("../models");

module.exports.User = mongoose.model('User', models.User);
module.exports.ChatRooms = mongoose.model('ChatRoom', models.ChatRoom);
