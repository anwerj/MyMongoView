var express = require('express'),
    ClientAuth = require('./middlewares/ClientAuthWare'),
    ViewController = require('./controllers/ViewController'),
    CollectionController = require('./controllers/CollectionController'),
    TestController = require('./controllers/TestController');

module.exports = function (app, passport) {

    app.use(ClientAuth);

    var connectionRouter = express.Router();
    app.use('/:_dump/c', connectionRouter);

    connectionRouter.get('/:_con/views', ViewController.all);
    connectionRouter.get('/:_con/view', ViewController.one);

    connectionRouter.get('/:_con/collections', CollectionController.all);
    connectionRouter.get('/:_con/collection', CollectionController.query);
    connectionRouter.get('/:_con/collections/feed', CollectionController.feed);

    var testRouter = express.Router();
    app.use('/test', testRouter);
    testRouter.get('/:type', function(request, response, next){
        var type = request.params.type;
        TestController[type](request, response, next);
    });

};
