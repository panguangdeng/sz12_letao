/**
 * Created by pan on 2017/11/14.
 */
$(function () {
    console.log('这里是注册用户页面');

    var ser_vCode = 0;

    //给获取按钮天机点击事件,获取验证码
    $('.huoqu').on('click', function () {
        console.log('点击了获取');
        $.ajax({
            url:"/user/vCode",
            success:(back)=>{
                console.log(back);
                ser_vCode = back.vCode;
            }
        })
    })

    //点击确定发送ajax注册用户
    $('.suer').on('click',function () {
        console.log('点击了确定按钮');
        var username = $("[name = username]").val();
        var password = $("[name = password]").val();
        var repassword = $("[name = repassword]").val();
        var mobile = $("[name = mobile]").val();
        var vCode = $("[name = vCode]").val();
        console.log(username+'------用户名');
        console.log(password+'密码');
        console.log(repassword+'确认密码');
        console.log(mobile+'------手机');
        console.log(vCode+'------验证码');
        if(!username){
            mui.toast('用户名不能为空');
            return false;
        }
        if(!password){
            mui.toast('密码不能为空');
            return false;
        }
        if(repassword!=password){
            mui.toast('两次密码不一样-------');
            return false;
        }
        if( !/^1[34578]\d{9}$/.test(mobile)  ){
            mui.toast('手机格式不正确');
            return false;
        }
        if(!vCode){
            mui.toast('验证码不能为空')
        }
        if(ser_vCode!=vCode){
            mui.toast('验证码出错,请重新输入')
        }


        console.log('发送ajx');
        $.ajax({
            url:'/user/register',
            type:'post',
            data:{
                username:username,
                password:password,
                vCode:vCode,
                mobile:mobile
            },
            success:(back)=>{
                console.log(back);
                if(back.error){
                    mui.toast(back.message)
                }else{
                    mui.confirm('恭喜你注册成功,是否现在就去登录','不温馨的提示',['是','否'],function (i) {
                        if(i.index==0){
                            setTimeout(function () {
                                window.location.href = 'move_login.html';
                            },1000)
                        }
                    })
                }
            }
        })
    })


})




//var username = $("[name = username]").val();
//var password = $("[name = password]").val();
//var repassword = $("[name = repassword]").val();
//var mobile = $("[name = mobile]").val();
//var vCode = $("[name = vCode]").val();
//
//if(!username ){
//    mui.toast("请输入用户名");
//    return false;
//}
//if(!password ){
//    mui.toast("请输入密码");
//    return false;
//}
//if(!repassword ){
//    mui.toast("请再次输入密码");
//    return false;
//}
//if(repassword != password ){
//    mui.toast("两次输入密码不一致");
//    return false;
//}

