/**
 * Created by alex on 07.07.14.
 */
module.exports = function(req, res, next) {
    if(req.user){
        res.locals.user = req.user;
    }
    next();
}
