/**
 * Created by alex on 04.07.14.
 */
var User = require("../lib/createSchema").User;
var Q = require("q");
var errors = require("../lib/errors")
var passport = require("../lib/auth-configuration").passport;
module.exports.get = function(req, res) {
    res.render("login", { title : "Login page", errors:  req.flash()});
}
module.exports.post = function(req, res) {
    res.redirect('/');
};