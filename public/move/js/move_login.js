/**
 * Created by pan on 2017/11/14.
 */
$(function () {
    console.log('这里是登录页面入口函数');


    //如果没有retURl 就跳到会员中心去
    //如果有retURL 什么页面过来的就跳到什么页面去
    //var has_Url = getUrl_Obj('url_key')
    //console.log(has_Url);

    var url = window.location.search;
    console.log(url);
    url = url.replace("?url_key=",'');
    console.log(url);

    $('.sure').on('click',function () {
        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();
        if(username==''){
            mui.toast('用户名不能为空')
            return ;
        }
        if(password==''){
            mui.toast('密码不能为空');
            return;
        }
        $.ajax({
            url:'/user/login',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:(back)=>{
                console.log(back);
                if(back.success){
                    if(url){
                        console.log('url有值')
                        mui.toast('登录成功,即将跳转到原网页');
                        setTimeout(function () {
                            window.location.href = url;
                        },1000)

                    }else{
                        console.log('url没有值');
                        mui.toast('登录成功,即将跳转到会员中心');
                        setTimeout(function () {
                            window.location.href = 'vip.html';
                        },1000)
                    }
                }else{
                    mui.toast(back.message);
                    return;
                }
            }
        })
    })

    $('.new_user').on('click',function () {
        console.log('点击了注册按钮');
    });

})