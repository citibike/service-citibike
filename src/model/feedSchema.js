'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({

    last_updated: String,
    ttl: Number,
    data: {
        en: {
            feeds: [{
                name: String,
                url: String
            }]
        }

    }
});
module.exports = schema;