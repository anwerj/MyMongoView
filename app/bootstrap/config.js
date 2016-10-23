var db = require('./db'),
    promise = require('bluebird').Promise;

module.exports = function(config, callback){

    //Change TimeZone
    process.env.TZ = config.timezone;

    global._mmv = { Promise : promise, Connections : []};

    db(config, function(){
        callback();
    })

};
