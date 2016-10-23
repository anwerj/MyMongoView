var base = require('./BaseController'),
    service = require('../../services/service'),
    requestp = require('../../services/requestp');


module.exports = {
    all : function(req, res){

        var s = new service(req.params._con);
        s.collections().then(function(names){
            res.send(names);
        });

    },

    query : function(req, res){
        var context = requestp.toContext(req.query), r;     
        var s = new service(req.params._con, context.collection);
        var response = requestp.getResponse(context,s);
        switch(context.action){

            case 'find':
                r = s.count(context)
                .then(function(count){
                    if(count){
                        return s.find(context)
                            .then(function(response){
                                return { result : response, count : count};
                            });
                    }
                    return { result : [], count : count};
                });
                break;

            case 'findOne':
                r = s.findOne(context)
                    .then(function(response){
                        return { result : response}
                    });
                break;

            case 'aggregate':
                r = s.aggregate(context)
                    .then(function(response){
                        return { result : response}
                    });
                break;

            default:
                return res.status(400).send('Invalid Action');
        }

        r.then(function(result){
            res.json(requestp.finalizeResponse(response, result));
        }).catch(function(err){
            console.log(err.stack);
            res.status(400).send(err.toString());
        });

    },

    feed : function(req, res){

        var context = requestp.toContext(req.query);
        
        new service(req.params._con, context.collection).distinct(context)
            .then(function(names){
                res.send(names);
            }).catch(function(err){
                res.status(400).send(err);
            });
    }

};
