/**
 * Created by pan on 2017/11/10.
 */
$(function () {
    console.log('二级分类的入口');
    let two_num = 1;
    let two_size = 3;
    //一言不合就发送个ajax渲染页面
    let send = ()=>{
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{
                page:two_num,
                pageSize:two_size
            },
            success:(back)=>{
                $('tbody').html( template('two_temp',back) );
                //分页插件渲染
                $('#bp-element').bootstrapPaginator({
                    bootstrapMajorVersion:3, //对应的bootstrap版本
                    currentPage: two_num, //设置当前页.
                    totalPages: Math.ceil(back.total/back.size),  //设置控件显示的页码数.即：类型为"page"的操作按钮的数量。
                    numberOfPages:5, //	设置总页数.
                    //点击事件
                    onPageClicked: function (event, originalEvent, type, page) {
                        two_num = page;
                        send();
                    }
                });
            }
        })
    }
    send();

    //给添加分类点击事件弹出模态框
    $('.two_add').on('click',()=>{
        $('#two_addCategory').modal('show');
    })

    //添加按钮点击时再发送请求渲染下拉菜单选项
    $('.two_add').on('click',()=>{

        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:(back)=>{
                console.log(back);
                console.log('上面的是下拉菜单的选项')
                $('#xialaDown').html( template('twoDown_temp',back) )
            }
        })
    });

    //给下拉菜单添加点击事件,获取下拉列表的值给主按钮
    $('#xialaDown').on('click','a',(e)=>{
        let title = $(e.target).html();
        $('#dropdownMenu1 > span:first-of-type').html(title);
        console.log($(e.target).attr('data-categoryid'));
        $('#upLoad_id').val( $(e.target).attr('data-categoryid') )
        $('#add_form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    })
    
    $('#fileLoad').fileupload({
        dataType: 'json',
        done:(e, data)=>{
            console.log(data.result.picAddr);
            $('.img_box > img').attr("src",data.result.picAddr)
            $('#upLoad_img2').val(data.result.picAddr);
            $('#add_form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });











    //给表单添加校验条件
    $('#add_form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
         excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择分类'
                    },
                },
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入分类名'
                    },
                },
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择图片'
                    },
                },
            },
        }

    });
    //校验成功后点确定会出发成功事件
    $('#add_form').on('success.form.bv', function(e) {
        //表单校验成功出发该事件
        e.preventDefault();
        console.log('表单校验成功了');
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#add_form').serialize(),
            success:(back)=>{
                console.log(back);
                two_num = 1;
                send();
                $('#two_addCategory').modal('hide');
                $('#add_form')[0].reset();
                $("#add_form").data('bootstrapValidator').resetForm();
                $('#upLoad_img2').val('');
                $('#local_img').attr('src','images/default.png');
                $('#upLoad_id').val('');
                $('.sbb').text('请选择分类');
            }
        })
    });

    $('.quxiao').on('click',()=>{
        $('#two_addCategory').modal('hide');
        $('#add_form')[0].reset();
        $("#add_form").data('bootstrapValidator').resetForm();
        $('#upLoad_img2').val('');
        $('#local_img').attr('src','images/default.png');
        $('#upLoad_id').val('');
        $('.sbb').text('请选择分类');
    })
    


})