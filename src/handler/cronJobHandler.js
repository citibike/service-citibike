'use strict';

var request = require('request');

let cronJobHandler = {

    gbfsStationInfo: function () {
        request({
            url: 'https://service-citibike.cfapps.io/v1/gbfsStationInfo',
            method: 'GET'
        }, function (error, response, body) {
            if (error) log.info(" gbfsStationInfo service failed, deails - " + error);
            if (response) log.info(" gbfsStationInfo service response status code : status message  " + response.statusCode + ":" + response.statusMessage);
        });
    },
    gbfsStationStatus: function () {
        request({
            url: 'https://service-citibike.cfapps.io/v1/gbfsStationStatus',
            method: 'GET'
        }, function (error, response, body) {
            if (error) log.info("gbfsStationStatus service failed, deails - " + error);
            if (response) log.info("gbfsStationStatus service response status code : status message  " + response.statusCode + ":" + response.statusMessage);
        });
    }

}
module.exports = cronJobHandler;