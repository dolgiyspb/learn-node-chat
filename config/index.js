/**
 * Created by alex on 24.06.14.
 */
nconf = require("nconf");
path = require("path");

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });


module.exports = nconf;