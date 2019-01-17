
#js 概念
#### get请求传参长度的误区
误区：我们经常说get请求参数的大小存在限制，而post请求的参数大小是无限制的。

实际上HTTP 协议从未规定 GET/POST 的请求长度限制是多少。对get请求参数的限制是来源与浏览器或web服务器，浏览器或web服务器限制了url的长度。为了明确这个概念，我们必须再次强调下面几点:
HTTP 协议 未规定 GET 和POST的长度限制
GET的最大长度显示是因为 浏览器和 web服务器限制了 URI的长度
不同的浏览器和WEB服务器，限制的最大长度不一样
要支持IE，则最大长度为2083byte，若只支持Chrome，则最大长度 8182byte 
#### 对象的遍历
> ES6 一共有 5 种方法可以遍历对象的属性。
* for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
* Object.keys(obj) 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
* Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
* Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
* Reflect.ownKeys(obj) 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
#### 补充get和post请求在缓存方面的区别
post/get的请求区别，具体不再赘述。

补充补充一个get和post在缓存方面的区别：

get请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
post不同，post做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此get请求适合于请求缓存。

#### 如何让事件先冒泡后捕获
在DOM标准事件模型中，是先捕获后冒泡。但是如果要实现先冒泡后捕获的效果，对于同一个事件，监听捕获和冒泡，分别对应相应的处理函数，监听到捕获事件，先暂缓执行，直到冒泡事件被捕获后再执行捕获之间。

#### 事件委托
简介：事件委托指的是，不在事件的发生地（直接dom）上设置监听函数，而是在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的触发，通过判断事件发生元素DOM的类型，来做出不同的响应。

举例：最经典的就是ul和li标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在li标签上直接添加，而是在ul父元素上添加。

好处：比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制。

#### mouseover和mouseenter的区别
mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout

mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave


# 浏览器的渲染：过程与原理

浏览器渲染页面的过程
从耗时的角度，浏览器请求、加载、渲染一个页面，时间花在下面五件事情上：

DNS 查询
TCP 连接
HTTP 请求即响应
服务器响应
客户端渲染
本文讨论第五个部分，即浏览器对内容的渲染，这一部分（渲染树构建、布局及绘制），又可以分为下面五个步骤：

处理 HTML 标记并构建 DOM 树。
处理 CSS 标记并构建 CSSOM 树。
将 DOM 与 CSSOM 合并成一个渲染树。
根据渲染树来布局，以计算每个节点的几何信息。
将各个节点绘制到屏幕上。


现代浏览器总是并行加载资源。例如，当 HTML 解析器（HTML Parser）被脚本阻塞时，解析器虽然会停止构建 DOM，但仍会识别该脚本后面的资源，并进行预加载。

同时，由于下面两点：

默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。
JavaScript 不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。
存在阻塞的 CSS 资源时，浏览器会延迟 JavaScript 的执行和 DOM 构建。另外：

当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行。
JavaScript 可以查询和修改 DOM 与 CSSOM。
CSSOM 构建时，JavaScript 执行将暂停，直至 CSSOM 就绪。
所以，script 标签的位置很重要。实际使用时，可以遵循下面两个原则：

CSS 优先：引入顺序上，CSS 资源先于 JavaScript 资源。
JavaScript 应尽量少影响 DOM 的构建。

<link href="index.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 30em) and (orientation: landscape)">

第一个资源会加载并阻塞。
第二个资源设置了媒体类型，会加载但不会阻塞，print 声明只在打印网页时使用。
第三个资源提供了媒体查询，会在符合条件时阻塞渲染。

<p>Do not go gentle into that good night,</p>
<script>console.log("inline")</script>
<p>Old age should burn and rave at close of day;</p>
<script src="app.js"></script>
<p>Rage, rage against the dying of the light.</p>
<p>Do not go gentle into that good night,</p>
<script src="app.js"></script>
<p>Old age should burn and rave at close of day;</p>
<script>console.log("inline")</script>
<p>Rage, rage against the dying of the light.</p>

改变阻塞模式：defer 与 async
为什么要将 script 加载的 defer 与 async 方式放到后面呢？因为这两种方式是的出现，全是由于前面讲的那些阻塞条件的存在。换句话说，defer 与 async 方式可以改变之前的那些阻塞情形。

首先，注意 async 与 defer 属性对于 inline-script 都是无效的，所以下面这个示例中三个 script 标签的代码会从上到下依次执行。

<script src="app1.js" defer></script>
<script src="app2.js" defer></script>
<script src="app3.js" defer></script>
defer 不会改变 script 中代码的执行顺序，示例代码会按照 1、2、3 的顺序执行。所以，defer 与相比普通 script，有两点区别：载入 JavaScript 文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成之后。

<script src="app.js" async></script>
<script src="ad.js" async></script>
<script src="statistics.js" async></script>

async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。需要注意的是，这种方式加载的 JavaScript 依然会阻塞 load 事件。换句话说，async-script 可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行。

从上一段也能推出，多个 async-script 的执行顺序是不确定的。值得注意的是，向 document 动态添加 script 标签时，async 属性默认是 true，下一节会继续这个话题。

>>
document.createElement  **使用 document.createElement 创建的 script 默认是异步的** 
```js
console.log(document.createElement("script").async); // true
```
所以，通过动态添加 script 标签引入 JavaScript 文件默认是不会阻塞页面的。如果想同步执行，需要将 async 属性人为设置为 false
>>


