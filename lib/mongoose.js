/**
 * Created by alex on 24.06.14.
 */
var mongoose = require("mongoose");
var config = require("../config");
mongoose.set("debug", true);

mongoose.connect(config.get("mongoose:uri"), config.get("mongoose:options"));


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exports = mongoose;