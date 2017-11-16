/**
 * Created by pan on 2017/11/14.
 */
$(function () {
    console.log('这里是shopping_car入口函数');


    //刷新购物车列表
    function send_cart() {
        //一言不合就发送ajax获取购物车数据
        $.ajax({
            url:'/cart/queryCart',
            success:(back)=>{
                console.log(back);
                var html = template('shopping_cart_temp',{data:back})
                $('.car_list').html(html)
            }
        })
    };




    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",
            down : {
                auto : true,
                callback : function () {
                    $.ajax({
                        url:'/cart/queryCart',
                        success:(back)=>{
                            console.log(back);
                            var html = template('shopping_cart_temp',{data:back})
                            $('.car_list').html(html);
                            setTimeout(function(){
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            },500);
                        }
                    })
                }
            }
        }
    });

    $('.car_list').on('click','.ck',function () {
        console.log('出发了点击事件');
        var obj = $('.car_list .ck:checked');
        console.log(obj);
        var price = 0;
        obj.each(function(){
           price += this.dataset.price*this.dataset.num;
        })
        $('.price_num').text(price)
    })

    //删除功能添加点击事件,删除购物车
    $('.car_list').on('tap','.btn_delete_cart', function () {
        console.log('点击了删除按钮');
        var id = this.dataset.id;
        console.log(id);
        mui.confirm('您确定要删除该顶戴吗','不温馨的提示',['确定','取消'],function (i) {
            if(i.index==0){
                $.ajax({
                    url:'/cart/deleteCart',
                    data:{
                        id:id
                    },
                    success:(back)=>{
                        console.log(back);
                        mui.toast('删除成功');
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    }
                })
            }
        });
    })
    //编辑功能添加点击事件 修改购物车属性
    $('.car_list').on('tap','.btn_edit_cart', function () {
        console.log('点击了编辑按钮');
        var data = this.dataset;
        console.log(data);
        var html = template('edit_car_temp',data);
        html = html.replace(/\n/g,'');
        console.log(html);

        mui.confirm(html,'编辑商品',['确定','取消'],function (i) {
            if(i.index==0){
               var size = $('.shopping_car_size').find('span.active').text();
               var num = $('.mui-numbox-input').val();
               var id = data.id
                console.log(size+'------size');
                console.log(num+'--------num');
                console.log(id+'--------id');

                    $.ajax({
                        url:'/cart/updateCart',
                        type:'post',
                        data:{
                            id:id,
                            size:size,
                            num:num
                        },
                        success:(back)=>{
                            console.log(back);
                            mui.toast('修改成功');
                                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
                        }
                    })
            }
        });
        mui('.mui-numbox').numbox()
        //给动态生成的span标签添加点击事件
        $('.shopping_car_size').on('tap','span',function () {
            console.log('点击了span');
            $(this).addClass('active').siblings().removeClass('active');
        })


    });


})