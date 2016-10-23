var express = require('express'),
    app = express(),
    config = require('./config');


//Bootstrap Configs
require('./app/bootstrap/config')(config, function(){

    //Bootstrap App
    require('./app/bootstrap/app')(app);
    
    app.listen(config.app.port, function() {
        console.log('Server Started');
    });
});
