/**
 * Created by alex on 07.07.14.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./createSchema").User;
var Q = require("q");

passport.use(new LocalStrategy(function(username, password, done){
    Q.ninvoke(User, "findOne", { username : username })
        .then(function(user){
            if(!user) {
                return done(null, false, {message : "Неправильное имя пользователя"});
            }
            if(!user.checkPassword(password)){
                return done(null, false, {message : "Неверный пароль"});
            }
            return done(null, user);
        })
        .fail(function(err){
            done(err);
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports.passport = passport;