/**
 * Created by pan on 2017/11/13.
 */

$(function(){
    console.log('这里是search_list入口函数');
    var page = 1;
    var pageSize = 10;
    var urlKey = getUrl_Obj('key');
    $('.search_input').val(urlKey);


function search_list_Ajax(){
    $('.product_list > ul').html("<div class='loading'></div>")
    $.ajax({
        url:'/product/queryProduct',
        data:{
            proName:urlKey,
            page:page,
            pageSize:pageSize
        },
        success:(back)=>{
            console.log(back);
            setTimeout(function(){
                $('.product_list > ul').html( template('search_list_temp',back) );
            },500)
        }
    })
};


    search_list_Ajax();
    //点击确定搜索重新渲染页面
    $('.search_sure').on('click', function () {
        console.log('点击了搜索');
        var aaa = $('.search_input').val();
        console.log(aaa);

        window.location.href = 'search_list.html?key='+aaa;
    })

    //给所有A添加点击事件,只改变颜色,其他不变
    $('.product_title > a').on('click', function () {
        var zj = $(this).hasClass('active');
        var t_or_f = $(this).find('i').hasClass('fa-angle-down')?2:1
        if(zj==true){
            $(this).find('i').toggleClass('fa fa-angle-down').toggleClass('fa fa-angle-up')
        }else{
            $(this).addClass('active').siblings().removeClass('active');
        };

        if( $(this).data('type') ){
        //    有值进来
            var type =  $(this).data('type');
            //var t_or_f = twoOrOne?2:1
            console.log(t_or_f+'------1或者2');
            console.log(type+'-------price或者num');
            var obj = {};
            obj[type]=t_or_f;
            obj.page=page;
            obj.pageSize=pageSize;
            obj.proName=urlKey;
            console.log(obj);
            $('.product_list > ul').html("<div class='loading'></div>")
            $.ajax({
                url:'/product/queryProduct',
                data:obj,
                success:(back)=>{
                    setTimeout(function () {
                        var html = template('search_list_temp',back);
                        $('.product_list > ul').html( html );
                    },500)
                }
            })



        }else{
            //没值出去
            console.log('没值出去');
        }

    })



})