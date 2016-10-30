function Result(view){
    
    return {
        item : function(item, index, count){
            var result = $(Html('#tResultSet', {
                random : view.random,
                item : item,
                join : view.view.join
            }));
            this.bindEvents(result);
            if(count < 10){
                this.beautify(result);
            }
            return result;
        },
        string : function(item, index, count){
            return $(Html('#tResultList', { item : item }));
            
        },
        
        expandToggle : function(to, open){

            var resultItems = to.find('.result-items');

            if(resultItems.hasClass('expanded') && !open){
                to.find('.ra-expand').html('Expand');
                resultItems.removeClass('expanded');
            }else{
                to.find('.ra-expand').html('Shrink');
                resultItems.addClass('expanded');
            }              
        },
        beautify : function(to){
            var resultData = to.find('.result-data')
            if(!resultData.hasClass('beautified')){
                var html = $(Html.beautify(JSON.parse(resultData.text())));
                this.bindBeautifulEvents(html);
                resultData.html(html).addClass('beautified');
                to.find('.ra-beautify').remove();
                this.expandToggle(to, true);
            }
        },
        
        fireJoin : function(to, join){
            
            var onField = join.data('on-field');
            var fromField = join.data('from-field');
            var onItem = to.find('.rbval[data-key="'+fromField+'"]');
            var inFilter = {
                dataType : onItem.data('value-type'),
                operators : {
                    eq : onItem.data('value')
                }
            }
            var obj = {
                action : 'find',
                name : join.data('to-collection')+'['+onField+'='+onItem.data('value').substr(0,20)+']',
                collection : join.data('to-collection'),
                prompt : {},
                select : join.data('collection-select')
            }
            obj.prompt[onField] = inFilter;
            var nView = new View(obj, view.random);
            nView.activate();
            nView.submit();
            
        },
        
        appendSuccess : function(to, data){
            to.find('.result-join-top').html(Html('#tResultTop', {context : data.context, query : data.query}));
            var resultSet = to.find('.result-join-items');
            var result = Result(this, '#tResultSetInternal');
            if(data.result.length){
                data.result.forEach(function(item, index){
                    resultSet.append(result.item(item, index));
                });
            } else {
                
            }
        },
         
        bindEvents : function(to){
            var _this = this;
            to.find('.ra-expand').click(function(){
                _this.expandToggle(to);
            });

            to.find('.ra-beautify').click(function(){
                _this.beautify(to);
            });
            to.find('.ra-join').click(function(){
                to.find('.ra-beautify').click();
                _this.fireJoin(to, $(this));
            });
        },
        
        resultKeyClick : function(to){

            var keyType = to.data('key-type');
            if(keyType === 'object'){
                return Handler('Warning', {reason : 'objects can not be searched as whole'}) ;
            }
            var item = to.parent().find('.rbval');
            var prompt = {
                name : to.data('key'),
                operator : 'eq',
                value : item.text(),
                dataType : item.data('value-type')
            };
            view.fillFilter(prompt, true);
            
            
        },
        
        bindBeautifulEvents : function(to){
            var _this = this;
            to.find('.rbkey').click(function(){
                _this.resultKeyClick($(this));
            });
            to.find('.rbval').click(function(){
                $(this).find('.rbval').attr('spellcheck', 'false').focus();
            });
            to.find('.rbval').blur(function(){
                if($(this).text() != $(this).data('value')){
                    $(this).parent().addClass('rbval-updated');
                } else {
                    $(this).parent().removeClass('rbval-updated');
                }
            });
            to.find('.rbval-reset').click(function(){
                var rbval = $(this).parent().prev();
                rbval.text(rbval.data('value')).blur();
            })
        }
    }
}