/**
 * Created by pan on 2017/11/12.
 */
$('.left_content').on('click','li',function () {
    var shuzi = $(this).data('id')
    send(shuzi)
    console.log('点击点击更健康');
    $(this).addClass('active').siblings().removeClass('active')
    console.log(mui('.mui-scroll-wrapper').scroll())
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶

})


//入口函数,一言不合就发送ajax渲染左边第一个页面
$.ajax({
    url:'/category/queryTopCategory',
    success:(back)=>{
        //console.log(back);
        $('.left_ul').html( template('left_temp',back) );
        //一言不合就发送一个ajax渲染右边的页面
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:$('.left_content li:first-of-type').data('id')
            },
            success:(back)=>{
                $('.right_ul').html( template('right_temp',back) )
            }
        })
    }
})

//渲染右边页面封装函数
function send(num){
    $.ajax({
        url:'/category/querySecondCategory',
        data:{
            id:num
        },
        success:(back)=>{
            console.log(back);
            $('.right_ul').html( template('right_temp',back) )
        }
    })
}
