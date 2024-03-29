/**
 * Created by alex on 02.07.14.
 */
var http = require("http");
var util = require("util");

function HttpError(status, message) {
    Error.apply(this, [message]);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error"
}

util.inherits(HttpError, Error);

HttpError.prototype.name = "HttpError";

module.exports.HttpError = HttpError;