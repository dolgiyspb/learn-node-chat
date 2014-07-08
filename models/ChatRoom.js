/**
 * Created by alex on 08.07.14.
 */
var mongoose = require("../lib/mongoose");

var schema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    users : {
        type : Array,
        default : []
    }
});

module.exports = schema;