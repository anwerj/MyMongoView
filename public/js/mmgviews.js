$(document).ready(function(){

    var xhr = $.ajax({
        url : APP_PATH+'views',
        dataType : 'JSON'
    });
    xhr.done(function(data){
        $("#views-list").html(Html('#tViewSide',{views : data}));
        activateViewList();
        activateHash();
        $('#'+APP_HASH.i+'_item').click();
    }).error(function(xhr){
        $('.results').removeClass('rows').html(xhr.responseText);
    });

    var activateViewList = function(){

        $(".viewname").unbind('click').click(function(event){
            
            var viewname = $(this).data('name');
            var index = $(this).data('index');

            var xhr = $.ajax({
                url : APP_PATH+'view',
                data : {name:viewname},
                dataType : 'JSON'
            });
            xhr.done(function(data){
                var v = new View(data);
                v.activate();
                if(APP_HASH.s){
                    v.submit();
                }
            });
        });
    };
    
    var activateHash = function(){
        var hash = window.location.hash.slice(1).split('/');
        APP_HASH = {};
        hash.forEach(function(item){
            var inHash = item.split(':');
            APP_HASH[inHash[0]] = inHash[1];
        });
    }
    
    $(".viewlist .title").click(function(){
        $(this).parent().toggleClass('active');
    });
    
    $('.collectionbtn').click(function(){
        $(".query.active .qcollection").val($(this).data('collection'));
        $(".collections").removeClass('active');
    });
    
    $('.collist').click(function(){
        $(".collections").toggleClass('active');
    })
});
