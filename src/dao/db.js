'use strict';

let mongoose = require("mongoose"),
    settings = require('../config/settings');


// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
let uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    settings.mongoUrl;

//log.info("mongourl lab url " + process.env.MONGOLAB_URI + "--mongo hq  " + process.env.MONGOHQ_URL + "  --settings.mongoUrl -- " + settings.mongoUrl);

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.Promise = global.Promise; //this is required to avoid deprication warning from mongoose 
mongoose.connect(uristring, function (err, res) {
    if (err) {
        //console.log('ERROR connecting to: ' + uristring + '. ' + err);//only for debug
        console.log('ERROR connecting to: DB ' + '. ' + err);
    } else {
        // console.log('Succeeded connected to: ' + uristring);//only for debug
        console.log('Succeeded connected to: DB');
    }
});
module.exports = mongoose;