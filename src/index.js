'use strict';

var config = require('config'),
  path = require('path'),
  glob = require('glob'),
  args = require('argify'),
  Lout = require('lout'),
  Good = require('good'),
  GoodFile = require('good-file'),

  bunyan = require('bunyan'),
  q = require('q'),
  cron = require('./utilities/cron');

var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiSwagger = require('hapi-swagger');
var Pack = require('../package');
var h2o2 = require('h2o2');
var globalTunnel = require('global-tunnel');
// globalTunnel.initialize({
//   host: '199.67.138.243',
//   port: 8080,
//   sockets: 50 // optional pool size for each http and https 
// });
//http://webproxy.wlb2.nam.nsroot.net:8080/


global.log = bunyan.createLogger({
  name: 'citibike'
});

var ENV = process.env.NODE_ENV || 'default';


/**
 * Construct the server
 */
var server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
      log: true
    },
    router: {
      stripTrailingSlash: true
    }
  }
});
log.info('server constructed');

/**
 * Create the connection
 */
// port: config.port

server.connection({
  port: process.env.PORT || 3000

});
//debug('added port: ', config.port);
var swaggerOptions = {
  info: {
    'title': 'CITIBIKE Service API Documentation',
    'version': Pack.version
  }
};

server.register([Inert, Vision, {
  'register': HapiSwagger,
  'options': swaggerOptions
}], function (err) {
  err ? log.info("Inert or Vision plugin failed, it will stop swagger") : log.info("Inert or Vision plugin registered, it will start  swagger");
});


server.register({
  register: h2o2
}, function (err) {

  if (err) {
    console.log('Failed to load h2o2');
  }
});

/**
 * Build a logger for the server & each service
 */
var reporters = [new GoodFile({
  log: '*'
}, __dirname + '/../logs/server.log')];

server.route({
  method: 'get',
  path: '/{param*}',
  handler: {
    directory: {
      path: __dirname + '/../public',
      listing: true
    }
  }
});
// server.route({
//   method: 'get',
//   path: '/',
//   handler: {
//     directory: {
//       path: __dirname + '/../public',
//       listing: true
//     }
//   }
// });

/**
 * Add logging
 */
server.register({
  register: Good,
  options: {
    opsInterval: 1000,
    reporters: reporters
  }
}, function (err) {
  if (err) throw new Error(err);
  if (ENV !== 'test') console.log('Plugin loaded: Good');
  log.debug('registered Good for logging with reporters: ', reporters);
});

/**
 * Add /docs route
 */
server.register({
  register: Lout
}, function (err) {
  if (err) throw new Error(err);
  if (ENV !== 'test') console.log('Plugin loaded: Lout');
  log.debug('added Lout for /docs');
});

/**
 * If this isn't for testing, start the server
 */
//if (ENV !== 'test')
server.start(function (err) {
  if (err) throw new Error(err);
  log.info('server started!');
  var summary = server.connections.map(function (cn) {
    return {
      labels: cn.settings.labels,
      uri: cn.info.uri
    };
  });
  var faqService = require(__dirname + '/routes/citibikeRoutes')(server);
  console.log(summary);
  log.info('Connections: ', summary);
  server.log('server', 'started: ' + JSON.stringify(summary));
});

module.exports = server;