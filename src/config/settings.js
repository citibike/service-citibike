'use strict';


const cfenv = require("cfenv");
let appEnv = cfenv.getAppEnv();
let mLabService = appEnv.getService('mongo_cb');



let mLabServiceCredentials = function () {
    //** local testing **//

    if (mLabService == null) {
        log.error('mLabService not available, reading local hardcoded values');
        let dummyData = require('./notToCommit');
        mLabService = {};
        mLabService.credentials = {};
        mLabService.credentials.uri = {};
        mLabService.credentials.uri = dummyData.mongoUrl;
    } else {
        log.info('mLabService  available, reading  service details');
    }
    return mLabService.credentials.uri;

}

let settings = {
    gbfsBase: 'https://gbfs.citibikenyc.com/gbfs/',
    gbfsFeed: 'gbfs.json',
    system_regions: 'en/system_regions.json',
    system_information: 'en/system_information.json',
    station_status: 'en/station_status.json',
    station_information: 'en/station_information.json',
    system_alerts: 'en/system_alerts',
    mongoUrl: mLabServiceCredentials()
}

module.exports = settings;