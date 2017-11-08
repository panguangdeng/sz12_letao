/**
 * Created by pan on 2017/11/8.
 */
$(function(){

    //登录表单校验
    //1. 用户名不能为空
    //2. 用户密码不能为空
    //3. 密码的长度是6-12位


    //获取表单元素
    var $form = $("form");
    console.log($form);
    //使用表单校验插件
    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:'用户名不存在或错误'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 15,
                        message: '用户名长度必须在2到15之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    callback:{
                        message:'密码错误'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                    },
                }
            }
        }

    });



    $('.chongzhi').on('click', function () {
        $form.data('bootstrapValidator').resetForm();
    })




    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        console.log('成功登录恭喜你');
        console.log($form.serialize());
        $.ajax({
            type:"post",
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(back){
                console.log(back);
                if(back.error==1000){
                    console.log('用户不存在')
                    $form.data('bootstrapValidator').updateStatus('username','INVALID', 'callback')
                }
                if(back.error==1001){
                    console.log('密码错误')
                    $form.data('bootstrapValidator').updateStatus('password','INVALID', 'callback')
                }
                if(!back.error){
                    console.log('恭喜你登录成功')
                    window.location.href = 'index.html';
                }

            }
        })
    });


})