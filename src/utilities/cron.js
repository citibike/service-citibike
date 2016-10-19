'use strict';
const Wreck = require('wreck');


var cron = require('node-cron');

var stationStatus = cron.schedule('*/5 * * * * *', function () {
    //let baseUrl = "http://localhost:3000"
    let baseUrl = "http://node_citibike.cfapps.io"

    // Wreck.get(baseUrl + '/v1/gbfsStationStatus', (err, res, payload) => {
    //     if (err) log.info("error calling gbfsStationStatus service, more details - " + err);
    //     if (res) log.info("response received from gbfsStationStatus service, call succssful");
    // });


});

stationStatus.start();