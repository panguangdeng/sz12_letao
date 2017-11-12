/**
 * Created by pan on 2017/11/11.
 */
$(function () {
    "use strict";
    console.log('商品管理入口');
    let shangpin_num = 1;
    let send = ()=>{
        $.ajax({
            url:'/product/queryProductDetailList',
            data:{
                page:shangpin_num,
                pageSize:2
            },
            success:(back)=>{
                //console.log(back);
                $('tbody').html( template('shangpinTd_temp',back) );
                $('#bp-element').bootstrapPaginator({
                    bootstrapMajorVersion:3, //对应的bootstrap版本
                    currentPage: shangpin_num, //设置当前页.
                    totalPages: Math.ceil(back.total/back.size),  //设置控件显示的页码数.即：类型为"page"的操作按钮的数量。
                    numberOfPages:2, //	设置总页数.
                    //点击事件
                    onPageClicked: function (event, originalEvent, type, page) {
                        shangpin_num = page;
                        send();
                    }
                });
            }
        })
    }
    send();

    //给添加商品添加点击事件弹出模态框
    $('.shangpin_add').on('click',()=>{
        $('#two_addCategory').modal('show');
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:(back)=>{
                //console.log(back);
                //console.log(template('shangpin_temp',back))
                $('#xialaDown').html( template('shangpin_temp',back) );
            }
        })
    });
    //给下拉菜单添加点击事件发送ajax渲染里标签
    $('#xialaDown').on('click','a',function(){
        //console.log($(this).text());
        //console.log(this)
        $('.sbb').text( $(this).text() );
        $('#upLoad_id').val( $(this).data('brandid') );
        $('#add_form').data("bootstrapValidator").updateStatus("brandId", "VALID")
    })



        $('#add_form').bootstrapValidator({
            excluded:[],//关键配置，表示只对于禁用域不进行验证，其他的表单元素都要验证
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                brandId: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '请选择一级分类'
                        }
                    }
                },
                proName: {
                    validators: {
                        notEmpty: {
                            message: '请输入商品名称'
                        }
                    }
                },
                proDesc: {
                    validators: {
                        notEmpty: {
                            message: '请输入产品描述'
                        }
                    }
                },
                num: {
                    validators: {
                        notEmpty: {
                            message: '请输入商品库存'
                        },
                        regexp: {
                            regexp: /^[1-9]*$/,
                            message: '请输入一个正确数字'
                        },
                        stringLength: {
                            min: 1,
                            max: 10,
                            message: '库存超过上限'
                        }
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: '请输入价格'
                        },
                        regexp: {
                            regexp: /^[1-9]+\d*$/,
                            message: '请输入一个正确的价格'
                        },
                    }
                },
                oldPrice: {
                    validators: {
                        notEmpty: {
                            message: '请输入原价'
                        },
                        regexp: {
                            regexp: /^[1-9]+\d*$/,
                            message: '请输入一个正确的价格'
                        }
                    }
                },
                size: {
                    validators: {
                        notEmpty: {
                            message: '请输入尺码'
                        },
                        regexp: {
                            regexp: /^\d{2}-\d{2}$/,
                            message: '请输入一个正确的尺码范围,如30-50'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: '请输入一个正确的尺码范围,如30-50'
                        }
                    }
                },
                productLogo: {
                    validators: {
                        notEmpty:{
                            message:'必须上传三张图片'
                        },
                        callback:{
                            message:'必须上传三张图片'
                        }
                    }
                },
            }
        });
    //注册表单校验成功事件
    $('#add_form').on('success.form.bv', function(e) {//点击提交之后
        // Prevent form submission
        e.preventDefault();
        console.log('完成了表单验证功能触发事件');
        var submit = $('#add_form').serialize();
        console.log(submit);
        let suer_data = $('#add_form').serialize();
        console.log(suer_data);
        //suer_data +=
        ;let $img = $('.img_box img')
        suer_data += "&picName1="+$img[0].dataset.picname+"&picAddr1="+$img[0].dataset.picaddr;
        suer_data += "&picName2="+$img[1].dataset.picname+"&picAddr2="+$img[1].dataset.picaddr;
        suer_data += "&picName3="+$img[2].dataset.picname+"&picAddr3="+$img[2].dataset.picaddr;
        console.log(suer_data);
        $.ajax({
            url:'/product/addProduct',
            type:'post',
            data:suer_data,
            success:(back)=>{
                console.log(back);
                $("#add_form").data('bootstrapValidator').resetForm();
                $('#upLoad_id').val('');
                $('.sbb').text('请选择分类');
                $('.img_box').html('');
                $('#add_form')[0].reset();
                $('.modal').modal('hide');
                send();
            }
        })
    });













    //每选择一次图片都会出发一次事件
    $("#fileLoad").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            if($('.img_box > img').length >= 3){
                return;
            }
           $('.img_box').append("<img data-picname='"+data.result.picName+"' data-picaddr='"+data.result.picAddr+"' src='"+data.result.picAddr+"' class='local_img' />");
            var length = $('.img_box > img').length;
            console.log(length);
            if(length === 3){
                $('#add_form').data('bootstrapValidator').updateStatus('productLogo','VALID')
            }else{
                $('#add_form').data('bootstrapValidator').updateStatus('productLogo','INVALID','callback')
            }
        }
    });

    //给大盒子下动态生成的图片添加双击删除事件
    $('.img_box').on('dblclick','img',function(){
        $(this).remove();
        if($('.img_box > img').length === 3){
            $('#add_form').data('bootstrapValidator').updateStatus('productLogo','VALID')
        }else{
            $('#add_form').data('bootstrapValidator').updateStatus('productLogo','INVALID','callback')
        }
    })

})