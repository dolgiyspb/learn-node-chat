/**
 * Created by alex on 08.07.14.
 */


var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require("./mongoose");


module.exports = new MongoStore({
    mongoose_connection: mongoose.connection
})