/**
 * Created by pan on 2017/11/14.
 */
$(function () {
    console.log('这里是product入口函数');
    var id = getUrl_Obj('id');
    //一言不合就发送个ajax发送数据
    $.ajax({
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:(back)=>{
            console.log(back);
            $('.kenken').html( template('product_info_temp',back) )
            mui('.mui-numbox').numbox();
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    var size ;

    $('.kenken').on('click','span',function () {
        size = $(this).text();
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.mui-btn-danger').on('click', function () {
        //console.log('点击了加入购物车');
        var num = $('.mui-numbox-input').val();
        //
        //console.log(size+'-------size');
        //console.log(num+'---------num');
        //console.log(id+'---------id');
        if(size){
            $.ajax({
                type:'post',
                url:'/cart/addCart',
                data:{
                    num:num,
                    size:size,
                    productId:id
                },
                success:(back)=>{
                    console.log(back);
                    if(back.success){
                        mui.toast('添加购物车成功')
                    }
                    if(back.error){
                        mui.confirm('你还没登录','不温馨的提示',['确定','取消'],function(i){

                            if(i.index==0){
                                console.log(i)
                                //console.log('move_login.html?url_key='+window.location.href)
                                window.location.href = 'move_login.html?url_key='+window.location.href;
                            }

                        })
                    }
                }
            })
        }else{
            mui.toast('请选择尺码');
        }







    });
    

})