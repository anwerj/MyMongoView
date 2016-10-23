exports.index = function (request, response, next) {};

exports.service = function (request, response, next) {
    response.send({running : 1});
};
