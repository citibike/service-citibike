'use strict';

var mongoose = require('../dao/db');

let Station = new mongoose.Schema({
    station_id: String,
    name: String,
    short_name: String,
    lat: Number,
    lon: Number,
    region_id: Number,
    rental_methods: [],
    capacity: Number,
    loc: String,
    eightd_has_key_dispenser: Boolean

});



// Station.virtual('loc').get(function () {
//     return [this.lon, this.lat];
// });






let schema = new mongoose.Schema({

    last_updated: String,
    ttl: Number,
    replicationId: Number,
    data: {
        stations: [Station]

    }
});

// schema.set('toJSON', {
//     virtuals: true
// });



module.exports = schema;