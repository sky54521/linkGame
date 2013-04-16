$(function(){
    $('.userLinkx').bind('click',function(){
        var userId=$(this).attr('data');
        var href='http://i.auto.sohu.com/user/show/'+userId+'.shtml';
        window.open(href);
    });
})