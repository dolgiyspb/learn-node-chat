/**
 * Created by alex on 08.07.14.
 */

var mongoose = require("../lib/mongoose");
var crypto = require("crypto");

var schema = new mongoose.Schema({
    username : {
        type : String,
        unique: true,
        required: true
    },
    hashedPassword : {
        type: String,
        required : true
    },
    salt : {
        type : String,
        required : true
    },
    created : {
        type : Date,
        default : Date.now
    },
    chatRoom : {
        type: String,
        default : null
    }
});

schema.methods.createHashedPassword = function(pass) {
    return crypto.createHmac('sha1', this.salt).update(pass).digest('hex');
};

schema.methods.checkPassword = function(password) {
    return this.hashedPassword === this.createHashedPassword(password);
}

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.createHashedPassword(password);
    })
    .get(function(){
        return this._plainPassword;
    });

module.exports = schema;