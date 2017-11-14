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
            $('.vip_info').html(template('vip_temp',back))
        }
    })






})