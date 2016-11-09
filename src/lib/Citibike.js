"use strict";

/*!
 *  CitibikeNYC API Node.js library
 *  Author: Kevin Coughlin @kevintcoughlin
 *  MIT Licensed
 */

/**
 * Module Dependencies
 */
var https = require('https'),
    _ = require('lodash'),
    querystring = require('querystring');

/**
 * Class for handling communications with Citibike's API.
 *
 * @param {Object} options The Client's options object.
 */
function Citibike(options) {
    if (!(this instanceof Citibike))
        return new Citibike(options);

    // Default Client Options
    this.defaults = {
        apiKey: null,

        headers: {
            'Accept': '*/*',
            'Connection': 'close',
            'User-Agent': 'node-citibike/'
        }


    };

    this.options = _.defaults(this.defaults, options);
}

/**
 * Issues an HTTP Get request.
 *
 * @param {String}      url         String of the URL to issue the request to.
 * @param {Object}      params      Object containing query string parameters to issue in the Get request.
 * @param {Function}    callback    Callback function that will be called when the processing is done.
 */
Citibike.prototype.get = function (url, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    if (typeof callback !== 'function') {
        throw new Error('ERROR: Invalid callback function.');
    }

    if (url == null) {
        throw new Error('ERROR: Invalid URL called.');
    }



    if (params !== null)
        url = url + "?" + querystring.stringify(params);

    // Holds data from HTTP(S) response body
    var body = [],
        req = https.get(url, function (res) {

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {
                callback(JSON.parse(body));
            });
        })
    req.on('error', function (e) {
        console.log("ERROR: " + e.message);
    });
    return this;
}


Citibike.prototype.gbfs = function (params, url, callback) {
    this.get(url, params, function (data) {
        callback(data);
    });
    return this;
}
module.exports = Citibike;