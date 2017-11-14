/**
 * Created by pan on 2017/11/12.
 */
    console.log('这里是公共部分js入口函数')

mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});

function getUrl_Obj(num) {
    var key = window.location.search;
    key = key.slice(1);
    key = decodeURI(key);
    key = key.split('&')
    var k = key[0].split('=');
    var obj = {};
    for(i=0; i<key.length; i++){
        var k = key[i].split('=')
        obj[k[0]]=k[1];
    };
    return obj[num];
}
