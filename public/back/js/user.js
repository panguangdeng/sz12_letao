/**
 * Created by pan on 2017/11/10.
 */
$(function () {
    let user_num = 1;
    let user_size = 5;
    let page_total = 0;
    //封装ajax函数
    function send(){
        $.ajax({
            url:'/user/queryUser',
            data:{
                page:user_num,
                pageSize:user_size
            },
            success:back=>{
                console.log(back);
                console.log(back.size+'-------每页多少条');
                console.log(back.total+'-------总共多少条');
                page_total = Math.ceil(back.total/back.size);
                console.log(page_total+'-----可以渲染多少页');
                let result = template('userTab_temp',back);
                $('tbody').html(result);


                //分页插件调用入口函数
                $('#bp-element').bootstrapPaginator({
                    bootstrapMajorVersion:3, //对应的bootstrap版本
                    currentPage: user_num, //当前页数，这里是用的EL表达式，获取从后台传过来的值
                    numberOfPages: user_size, //每页页数
                    totalPages:page_total,//总页数，这里是用的EL表达式，获取从后台传过来的值
                    onPageClicked: (a, b, c, page)=>{
                        console.log(page+'-------点击后的page');
                        user_num = page;
                        send();
                    }
                });
            }
        })
    }
    send();

//    模态框插件启用
    $('tbody').on('click','.btn',(e)=>{
        let isDel = $(e.target).parent().attr('data-id');
        let userId = $(e.target).parent().attr('data-delid')==0?1:0;
        $('#user_modal').modal('show');
        //    给用户模态框禁用启用按钮添加确定发送ajax请求时间然后隐藏模态框
        $('.user_sure').off().on('click',()=>{
            $('#user_modal').modal('hide');
            $.ajax({
                url:'/user/updateUser',
                type:'post',
                data:{
                    id:isDel,
                    isDelete:userId
                },
                success:(back)=>{
                    console.log(back);
                    send();
                }
            })

        })
    })




})