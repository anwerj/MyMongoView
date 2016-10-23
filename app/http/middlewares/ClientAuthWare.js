
module.exports = function(request, response, next){
    var d = new Date();
    console.log('Reuqest At : ' + d.toISOString()+" : "+request.originalUrl);
    setTimeout(function(){
        next();
    }, (request.query.action == 'find' ? 000 : 00));
    
    // var client_id = request.get('Auth-Client');
    // if(!client_id){
    //     throw "Empty client Id";
    // }
    //
    // });
};
