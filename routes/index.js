var express = require('express');
var router = express.Router();
var mongoose = require("../lib/mongoose");
var errors = require('./../lib/errors');
var Q = require("q");
var passport = require("../lib/auth-configuration").passport;


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

router.get('/', require("./frontpage").get);
router.get('/login', require("./login").get);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), require("./login").post);
router.get('/logout', require("./logout").get);
router.get('/chat', ensureAuthenticated, require("./chat").get);

module.exports = router;
