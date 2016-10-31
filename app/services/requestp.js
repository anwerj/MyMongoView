var _lodash = require('lodash'),
    convertor = require('./convertor');

module.exports = {

    toContext : function(context){
        context.order = this.toOrder(context.orderOn);
        context.sort = this.toSort(context.sortOn, context.order);
        context.skip = this.toSkip(context.page, context.limit);
        context.group = this.toGroup(context.group);
        context.sum = this.toSum(context.sum);
        context.limit = this.toLimit(context.limit);
        context.filter = this.toData(context.filter);
        if(context.action === 'aggregate'){
            context.aggregate = this.toAggregate(context);
            context.aggregateOption = this.toAggregateOption(context);
        } else if(context.action === 'findOne'){
            context.action = 'find';
            context.limit = 1;
        } else if(context.action === 'distinct'){
            context.key = this.toKey(context.key);
        }
        //console.log("\nCONTEXT\n",context);
        return context;
    },

    toOrder : function(order){
        return order == 'ASC' ? 1 : -1;
    },

    toSort : function(sort, order){
        var toReturn = {};
        toReturn[sort || '_id'] = order;
        return toReturn;

    },

    toSkip : function(page, limit){
        page = page || 1;
        return parseInt((page-1) * limit) || 0;
    },

    toGroup : function(group){
        return '$'+(group || '_null');
    },

    toSum : function(total){
        return total == 1 ? 1 : '$'+total;
    },

    toLimit : function(limit){
        return parseInt(limit) || 10;
    },
    
    toKey : function(key){
        return new String(key).toString();
    },
    
    toData : function(input){

        var out = {};
        console.log(input);

        _lodash.each(input,function(obj, keyName){
            if(obj){
                _lodash.each(obj.operators, function(value, operator){
                    var inset = convertor.convert(operator, value, obj.dataType);
                    if(inset){
                        if('undefined' === typeof out[keyName]){
                            out[keyName] = {};
                        }                        
                        out[keyName][inset.operatorKey] = inset.operatorValue;
                    }
                });
            }
        });

        return out;
    },
    
    toAggregate : function(context){
        var total = {};
        total['$'+context.accumulator] = 1;
        return [
            { $match : context.filter },
            { $group : { _id : context.group, total : total}},
            { $sort : { total : context.order}},            
            { $skip : context.skip },
            { $limit : context.limit },
        ];
    },
    
    toAggregateOption : function(context){
        return {};
    },
    
    getResponse : function(context, service){
        return {
            meta : {
                query : service.getQuery(context),
                startAt : Date.now(),
                endAt : null,
                count : null,
                context : context
            },            
            result : []
        };
    },
    
    finalizeResponse : function(response, result){

        response.meta.endAt = Date.now();
        response.meta.count = result.count;
        response.result = result.result;

        return response;
    }
    

};
