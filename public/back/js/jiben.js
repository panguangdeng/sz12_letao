/**
 * Created by pan on 2017/11/8.
 */
$(function () {
    //进度条插件配置
    NProgress.configure({ showSpinner: false });
    $(document).ajaxStart(function () {
        NProgress.start();
    })
    $(document).ajaxStop(function(){
        NProgress.done();
    })
    //每次进来都检查一下是否已经登录,如果没有登录自动打会登录页面
    var isLogin = window.location.href.indexOf('login.html')
    if(isLogin<=-1){
        $.ajax({
            url:'/employee/checkRootLogin',
            success: function (back) {
                if(back.error){
                    setTimeout(function () {
                        console.log('你还没有登录,请先去登录')
                        window.location.href = 'login.html';
                    },1000)
                }
            }
        })
    }

    //给左侧菜单栏添加点击事件,子菜单显示出来
    $('.user_guanli').on('click',function () {
        console.log('dianjidianji')
        $(this).next().slideToggle();
    })

    //给菜单键添加点击事件,点击左侧菜单栏移动到左边
    $('.top_menu').on('click',function () {
        $('.comment').toggleClass('active')
        $('.main_body').toggleClass('active');
    });

    //给顶部添加登出时间
    $('.top_logOut').on('click', function () {
        console.log('登出按钮点击了');
        $('#modal_loginOut').modal('show')
    })
    //确认退出登录
    $('.logOut_sure').on('click', function () {
        $.ajax({
            url:'/employee/employeeLogout',
            success: function (back) {
                console.log(back);
                if(back.success==true){
                    console.log('结果为真');
                    window.location.href = 'login.html';
                }else{
                    console.log('暂时失败');
                    $('#modal_loginOut').modal('hide')
                }
            }
        })
    })


})