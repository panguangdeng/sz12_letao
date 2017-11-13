/**
 * Created by pan on 2017/11/12.
 */
    console.log('这里是index入口函数')


//获得slider插件对象
mui('.mui-slider').slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});