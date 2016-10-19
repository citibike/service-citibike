'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({

    last_updated: String,
    ttl: Number,
    replicationId: Number,
    data: {
        stations: [{
            station_id: String,
            name: String,
            short_name: String,
            lat: Number,
            lon: Number,
            region_id: Number,
            rental_methods: [],
            capacity: Number,
            eightd_has_key_dispenser: Boolean
        }]
    }
});
module.exports = schema;