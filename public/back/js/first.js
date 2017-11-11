/**
 * Created by pan on 2017/11/10.
 */
$(function () {

    console.log('第一个分页');
    let page = 1;
    let pageSize = 2;
    //初始化渲染页面
    let send = ()=>{
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:(back)=>{
                console.log(back);
                $('tbody').html( template('first_temp',back) )
                $('#bp-element').bootstrapPaginator({
                    bootstrapMajorVersion:3, //对应的bootstrap版本
                    currentPage: page, //当前页数，这里是用的EL表达式，获取从后台传过来的值
                    numberOfPages: 3, //每页页数
                    totalPages:Math.ceil(back.total/pageSize), //总页数，这里是用的EL表达式，获取从后台传过来的值
                    onPageClicked: function (event, originalEvent, type, p) {
                        console.log(p);
                        page = p;
                        send();
                    }
                });
            }
        })
    }
    send();


    //点击添加分类模态框弹出来
    $('.dian').on('click',()=>{
        $('#first_addCategory').modal('show')
    })

    //初始化表单验证插件s
    $('#add_form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一个一级分类'
                    },
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: '分类名长度必须在6到12之间'
                    },
                    callback:{
                        message:'提交失败'
                    }
                },

            },
        }
    });


    $("#add_form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        console.log('完成了验证,出发函数')
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                categoryName:$('#add_fenlei').val(),
            },
            success:(back)=>{
                console.log(back);
                if(back.success){
                    $('#first_addCategory').modal('hide');
                    page = 1;
                    send();
                    $("#add_form").data('bootstrapValidator').resetForm();
                    $("#add_form")[0].reset();
                }
            }
        })
    });



})