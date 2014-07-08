/**
 * Created by alex on 04.07.14.
 */
module.exports.get = function(req, res) {
    res.render('index', { title: 'Express'});
}