'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({

    last_updated: String,
    ttl: Number,
    replicationId: Number,
    data: {
        alerts: [{
            alert_id: String,
            type: String,
            station_ids: [],
            summary: String,
            last_updated: Number
        }]
    }


});
module.exports = schema;