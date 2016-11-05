var mongoose = require('mongoose');

module.exports = function db(config, callback){

    var connections = config.connections;

    return _mmv.Promise.map(connections, function(connection){

        return mongoose.createConnection(connection.string, connection.option, connection.config);

    }).then(function(connecteds){
        _mmv.Connections = connecteds;
        callback();
    });
}
