/**
 * Created by alex on 07.07.14.
 */

module.exports.get = module.exports.post = function(req, res, next) {
    req.logout();
    res.redirect("/");

}