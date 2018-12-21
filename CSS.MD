#### CSS3 中transform：translatez(0) 有什么作用
这个问题是因为使用transform和opacity做CSS动画的时候，会将元素提升为一个复合层；而使用js操作css属性做动画时，必须使用translateZwill-change才能将元素强行提升至一个复合层。

元素本身使用transform和opacity做CSS动画的时候，会提前告诉GPU动画如何开始和结束及所需要的指令；所以会创建一个复合层（渲染层），并把页面所有的复合层发送给GPU；作为图像缓存，然后动画的发生仅仅是复合层间相对移动。

而使用js做动画，js必须在动画的每一帧计算元素的状态；发送给GPU，但不会将元素提升至一个复合层；所以想让元素提升至一个复合层，必须使用translateZ或will-change: transform, opacity。

#### 禁止浏览器缓存的头字段
###### Cache-Control包括：max-age / s-maxage/public/private/no-cache/no-store/must-revalidate等
> max-age（单位为s）指定设置缓存最大的有效时间，定义的是时间长短
> s-maxage（单位为s）同max-age，只用于共享缓存（比如CDN缓存）。
> public 指定响应会被缓存，并且在多用户间共享。也就是下图的意思。如果没有指定public还是private，则默认为public。
> private 响应只作为私有的缓存（见下图），不能在用户间共享。如果要求HTTP认证，响应会自动设置为private。
> no-cache 指定不缓存响应，表明资源不进行缓存
> no-store 绝对禁止缓存
> must-revalidate指定如果页面是过期的，则去服务器进行获取。

##### 