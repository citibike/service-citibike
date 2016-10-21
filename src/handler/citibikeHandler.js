'use strict';

let Citibike = require('../lib/Citibike');
let citibike = new Citibike();
let mongoose = require('../dao/db');
let feedSchema = require('../model/feedSchema');
let stationInfo = require('../model/stationInformationSchema');
let stationStatus = require('../model/stationStatusSchema');
let systemAlerts = require('../model/systemAlertsSchema');
let stationSchema = require('../model/stationSchema');
let Response = require('../model/response');
let settings = require('../config/settings');
let util = require('../utilities/utility');
let stationStatusMaxRplication = 5;
let stationStatusCurReplication = 1;
let stationInfoMaxRplication = 3;
let stationInfoCurReplication = 1;
let systemAlertsMaxRplication = 3;
let systemAlertsCurReplication = 1;
//exports
module.exports = {

  gbfsFeed: function (request, reply) {
    log.info("citibike handler method called - gbfsFeed ...");
    let url = settings.gbfsBase + settings.gbfsFeed + "?nocache=" + new Date();;
    citibike.gbfs(null, url, function (data) {
      log.info("Getting gbfsFeed data  ...");
      // console.log(data);
      let FeedModel = mongoose.model("UrlFeeds", feedSchema);
      let latestFeed = new FeedModel(data);

      FeedModel.remove({}, function (err, removed) {
        if (err) {
          console.log('Error on delete all existing feeds for url !');
        } else {
          console.log('deleted all existing url feed!' + removed);
        }
        latestFeed.save(function (err) {
          if (err) console.log('Error on save!')

          reply(data);
        });
      });
    });
  },






  gbfsStationInformation: function (request, reply) {

    let response = new Response;
    let url = settings.gbfsBase + settings.station_information + "?nocache=" + new Date();
    citibike.gbfs(null, url, function (data) {


      let StationSchema = mongoose.model("StationCollection", stationSchema);
      let errorFound = false;
      for (let station of data.data.stations) {
        station.loc = [station.lon, station.lat]; //required to match user address
        let query = {
            station_id: station.station_id
          },
          update = station,
          options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
          };

        StationSchema.findOneAndUpdate(query, update, options, function (error, result) {
          if (error) {
            errorFound = true;
            throw error
          }
        });

      }

      if (errorFound) {
        response.status = response.failure;
        response.message = response.message + ", Unable to saved all  data into DB";
      } else {
        response.status = response.success;
        response.message = " Saved latest data into DB";
      }
      reply(response);
    });
  },

  gbfsStationStatus: function (request, reply) {

    let response = new Response;
    let url = settings.gbfsBase + settings.station_status + "?nocache=" + new Date();
    citibike.gbfs(null, url, function (data) {


      let StationSchema = mongoose.model("StationCollection", stationSchema);
      let errorFound = false;
      for (let station of data.data.stations) {
        let query = {
            station_id: station.station_id
          },
          update = station,
          options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
          };

        StationSchema.findOneAndUpdate(query, update, options, function (error, result) {
          if (error) {
            errorFound = true;
            throw error
          }
        });

      }

      if (errorFound) {
        response.status = response.failure;
        response.message = response.message + ", Unable to saved all  data into DB";
      } else {
        response.status = response.success;
        response.message = " Saved latest data into DB";
      }
      reply(response);
    });
  },


  gbfsSystemAlerts: function (request, reply) {

    let response = new Response;
    let url = settings.gbfsBase + settings.system_alerts + "?nocache=" + new Date();;
    citibike.gbfs(null, url, function (data) {
      let SystemAlerts = mongoose.model("SystemAlerts", systemAlerts);
      data.replicationId = systemAlertsCurReplication = util.getNextPossibleNumber(systemAlertsCurReplication, systemAlertsMaxRplication, 1);
      let oldestReplicationId = util.getNextPossibleNumber(systemAlertsCurReplication, systemAlertsMaxRplication, 1);
      let latestFeed = new SystemAlerts(data);
      log.info(oldestReplicationId + " deleted --*******-- added " + data.replicationId);

      SystemAlerts.remove({
        replicationId: oldestReplicationId
      }, function (err, removed) {
        if (err) {
          response.message = "Unable to delete existing system alerts ";
        } else {

          response.message = "successfully deleted existing system alerts ";
        }
        latestFeed.save(function (err) {
          if (err) {
            response.status = response.failure;
            response.message = response.message + ", Unable to saved latest data into DB";
          } else {
            response.status = response.success;
            response.message = response.message + ", Saved latest data into DB";
          }
          reply(response);
        });
      });
    });
  },




  gbfsSystemRegions: function (request, reply) {
    log.info("citibike handler method called - gbfsSystemRegions ...");
    let url = settings.gbfsBase + settings.gbfsSystemRegions + "?nocache=" + new Date();;
    citibike.gbfs(null, url, function (data) {
      log.info("Getting gbfsSystemRegions data  ...");
      // console.log(data);
      let FeedModel = mongoose.model("UrlFeeds", feedSchema);
      let latestFeed = new FeedModel(data);

      FeedModel.remove({}, function (err, removed) {
        if (err) {
          console.log('Error on delete all existing feeds for url !');
        } else {
          console.log('deleted all existing url feed!' + removed);
        }
        latestFeed.save(function (err) {
          if (err) console.log('Error on save!')

          reply(data);
        });
      });
    });
  },

  //---- below are internal db calls not for citibike api
  addressNearBy: function (request, reply) {

    let StationStatus = mongoose.model("StationStatus", stationStatus);

    StationStatus.find({
      projectName: 'name'
    }).sort




    StationStatus.remove({
      replicationId: oldestReplicationId
    }, function (err, removed) {
      if (err) {
        response.message = "Unable to delete existing station status ";
      } else {

        response.message = "successfully delete existing station status ";
      }
      latestFeed.save(function (err) {
        if (err) {
          response.status = response.failure;
          response.message = response.message + ", Unable to saved latest data into DB";
        } else {
          response.status = response.success;
          response.message = response.message + ", Saved latest data into DB";
        }
        reply(response);
      });
    });
  },


}