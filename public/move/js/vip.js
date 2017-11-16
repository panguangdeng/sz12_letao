/**
 * Created by pan on 2017/11/14.
 */
$(function () {
    console.log('这里是vip页面入口函数');

    //一言不合就发送个ajax获取用户个人信息
    $.ajax({
        url:'/user/queryUserMessage',
        type:'get',
        success:(back)=>{
            console.log(back);
            var html = template('vip_temp',back);
            console.log(html);
            $('.vip_info').html( html )
        }
    })

    $('.logOut a').on('click', function () {
        console.log('a点击点击更健康');
        $.ajax({
            url:"/user/logout",
            success:(back)=>{
                console.log(back);
                mui.toast('恭喜你退出成功')
                setTimeout(function () {
                    window.location.href = 'move_login.html';
                },1000)
            }
        })
    })




})