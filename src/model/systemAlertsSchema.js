'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({
    last_updated: Number,
    ttl: Number,
    data: {
        alerts: []
    }
});
module.exports = schema;