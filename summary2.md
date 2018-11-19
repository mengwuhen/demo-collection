#### rem计算适配
* 方案一
```js
(function(doc, win){
  var docEl = doc.documentElement,
    // orientationchange  在设备的纵横方向改变时触发。
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function(){
          var clientWidth = docEl.clientWidth;
          if(!clientWidth) return;
          docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
      };

  if(!doc.addEventListener) return;

  // 第三个参数 false (事件冒泡) 和 true(事件捕获) 
  win.addEventListener(resizeEvt, recalc, false); 
  // 文档被加载和解析，并且DOM被完全构造 完成时触发
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
``` 
* 方案二
```js
var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');

dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth * 2 / 10;
scale = 1 / dpr;

// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;
```


### 移动端适配1px的问题


### 介绍flex布局


### 