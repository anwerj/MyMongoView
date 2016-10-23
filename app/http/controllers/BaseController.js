var config = require('../../../config'),
    _lodash = require('lodash'),
    ObjectId = require('mongoose').Types.ObjectId;

function base(){

    ;

}


base.transformRequest = function(request){

    return _lodash.cloneDeep(itemSet);
};

base.transformData = function(data){
    var out = {}, filters = {};
    if(data.body.filters){
        filters = data.body.filters;
    }else{
        filters = {};
    }
    out.with = data.body.with || '';
    out.filters = base.mapFilters(filters);

    out.options = {};
    out.options.limit = data.body.limit < 100 ?
                        data.body.limit : 100;

    out.options.sort = data.body.sort || '-updated_date';

    out.response = {
        limit : out.options.limit,
        sort : out.options.sort
    };
    return out;
};

base.mapFilters = function(iFitlers){
    var oFilters = {}, cFilter, tFilter;

    var map = {
        gte : "$gte",
        lte : "$lte",
        gt : "$gt",
        lt : "$lt",
        in : "$in"
    };

    for(var field in iFitlers){
        cFilter = iFitlers[field];
        if(!oFilters[field]){
            oFilters[field] = {};
        }
        if(_lodash.isObject(cFilter)){
            for(var inField  in cFilter){
                oFilters[field][map[inField]] = base.mapValue(cFilter[inField], field);
            }
        }else{
            oFilters[field] = base.mapValue(cFilter, field);
        }
    }

    return oFilters;
};

base.mapValue = function(value, key){
    var toReturn = value;

    return toReturn;
};

module.exports = base;
