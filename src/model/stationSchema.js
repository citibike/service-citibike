'use strict';

var mongoose = require('../dao/db');

let schema = new mongoose.Schema({

    station_id: String,
    num_bikes_available: Number,
    num_bikes_disabled: Number,
    num_docks_available: Number,
    num_docks_disabled: Number,
    is_installed: Number,
    is_renting: Number,
    is_returning: Number,
    last_reported: Number,
    eightd_has_key_dispenser: Boolean,

    name: String,
    short_name: String,
    lat: Number,
    lon: Number,
    region_id: Number,
    rental_methods: [],
    capacity: Number,
    loc: {
        type: [Number],
        index: '2dsphere'
    },
});
module.exports = schema;