/**
 * Created by pan on 2017/11/13.
 */
console.log('这个是搜索页面入口函数');

//一言不合就读取locaStory的数据
//localStorage.setItem('name','阿牛哥');
//var aniuge = localStorage.getItem('name');
//console.log(aniuge);
//var arr = ['阿迪','阿迪王','阿迪达斯','迪迦奥特曼'];
//var aaa = JSON.stringify(arr)
//console.log(aaa);
//localStorage.setItem('aniuge',aaa);

var arr = ['阿迪','阿迪王','阿迪达斯','迪迦奥特曼'];

//设置localStorage
function setItem_Fun(){
    arr = JSON.stringify(arr)
    var setItem = localStorage.setItem('aniuge',arr)
}
//获取localStorage
function getItem_Fun(){
    var getItem = localStorage.getItem('aniuge');
    var arr = JSON.parse(getItem);
    return arr;
}
//把获取到的locaStorage渲染页面
function render() {
    var arr = getItem_Fun();
    $('.mui-scroll').html( template('ltLishi_temp',{arr:arr}) );
}

render();

//搜索框点击确定增加locaStorage
$('.search_sure').on('click',function () {
   var val = $('.search_input').val().trim();
    if(val==''){
        console.log('不能为空');
        mui.toast('搜索内容不能为空')
        return false;
    };
    var add = getItem_Fun();
    //判断获取到的数组长度是否大于10

    for(i=0;i<add.length;i++){
        if(add[i]==val){
           add.splice(i,1);
        }
    }
    add.unshift(val);
    if(add.length>10){
        add.pop();
    }
    arr = add;
    setItem_Fun();
    render();
    $('.search_input').val('');
    window.location.href = 'search_list.html?key='+val;
    console.log('走到了最底部');
})

//给全部清空添加点击事件
$('.remove_local').on('click',function () {
    console.log('删除删除更健康');
    mui.confirm('你确定更要清空历史记录吗','清空记录',['否','是'],function(data){
        if(data.index==1){
            localStorage.removeItem('aniuge');
        }
        if(data.index==0){
            setItem_Fun();
        }
    })
})

//给删除单个添加点击事件
$('.chengkai').on('click','.mui-icon-closeempty', function () {
    console.log('删除单个记录');
    var xiabiao = $(this).data('text');
    var result = getItem_Fun();
    result.splice(xiabiao,1);
    arr = result;
    setItem_Fun();
    render();
})