var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
}).gotoItem(index);//跳转到第index张图片，index从0开始；