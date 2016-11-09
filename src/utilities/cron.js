'use strict';

var cron = require('node-cron');
var cronJobHandler = require('../handler/cronJobHandler');

var stationInfo = cron.schedule('0 15 * * *', function () {
    cronJobHandler.gbfsStationInfo();

});
var stationStatus = cron.schedule('1-59 * * * *', function () {
    cronJobHandler.gbfsStationStatus();
});

stationInfo.start();
stationStatus.start();