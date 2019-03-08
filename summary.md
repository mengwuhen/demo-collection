### 回流 与 重绘的区别
  回流必定引起重绘，重绘不一定引发回流。
  引发回流的条件：
* 添加或者删除可见的DOM元素；
* 元素位置改变；
* 元素尺寸改变——边距、填充、边框、宽度和高度
* 内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
* 页面渲染初始化；
* 浏览器窗口尺寸改变——resize事件发生时；

### 如何避免回流
* 让要操作的元素进行”离线处理”，处理完后一起更新
* 让元素脱离动画流，减少回流的Render Tree的规模
* 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流
* 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。
* 尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。
* 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。

* 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
* 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
* 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
* 


### CORS 跨域携带 Cookie 发送请求
  当在 a.com 进行访问时，如何向 b.com 携带 b.com 的 cookie 发送一个请求？
* 在发送跨域请求时，需要后端设置一些请求头，否则浏览器不会允许客户端跨域发送请求。 Access-Control-Allow-Origin: a.com 这样调用过去会发现，b.com 会返回用户未登录。原因是 b.com 的 cookie 没有发送过去。
  跨域携带 Cookie
* 这时候需要后端添加另外一个请求头： Access-Control-Allow-Credentials: true  前端在发送请求时也需要设置 xhr.withCredentials= true;  //关键句

### cookie session token 区别
 ##### cookie与session的区别是
 * cookie数据保存在客户端，session数据保存在服务器端。
 * cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗,考虑到安全应当使用session.session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能,考虑到减轻服务器性能方面，应当使用COOKIE.
 * 作为身份认证 token安全性比session好，因为每个请求都有签名还能防止监听以及重放攻击





### git reset --soft  git reset --mixed  git reset --hard 的区别
* git reset --soft 会保留之前修改的文件  但是文件状态为 未提交（not commit）
* git reset -- mixed 会保留之前修改的文件  但是文件状态 未add （not add）
* git reset -- hard 不会保留之前所做的修改 

### es6 class 与 Function 的区别
* 类的本质是function(构造函数) 类的实例通过constructor 指向 类。类的实例通过 __proto__ 指向类的原型。 类通过 prototype 指向 类.prototype(类的原型)。类的原型通过 constructor 指向类的实例
* 
* 不同点 类内部定义的方法都是不可枚举的。即通过Object.keys 无法遍历到 类的方法
* 类的定义不存在 变量提升 即 类只能先定义在使用
* 类 的this指向问题。类的方法内部如果含有this,它默认指向类的实例， 但是单独使用时可能会报错。 解决方法一：在constructor内绑定this。解决方案二： 在constructor内使用箭头函数。（constructor 默认返回实例对象）
* 类 的静态方法 在类内部的方法前边加上 static 关键字 。即 这个方法只会存在 类 上，不会存在实例的原型上。（父类的静态方法可以被子类继承。）
* 类 的静态属性 在类内部属性名字 前边 加上static 关键字

### class 的继承
* ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面
* class 的继承 实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
* 子类的__proto__属性，表示构造函数的继承，总是指向父类。 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

```js 
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
} Object.setPrototypeOf(B, A)
```

### js创建对象的不同方式(三种基本方式)  
* 工厂模式
```js
function createPerson(name, job) { 
 var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(this.name); 
 } 
 return o 
} 
```
* 构造函数
```js
function Person(name, job) { 
 this.name = name;
 this.job = job;
 this.sayName = function() { 
  console.log(this.name);
 } 
} 
var person1 = new Person('Mike', 'student') 
```
* 原型模式
```js
function Person() { 
} 
Person.prototype.name = 'Mike' 
Person.prototype.job = 'student' 
Person.prototype.sayName = function() { 
 console.log(this.name) 
} 
```
### RESTful 风格API
##### 常用方法 
> 幂等：GET、HEAD、PUT和DELETE请求都是幂等的，无论对资源操作多少次，返回结果总是一样的，后面的请求并不会产生比第一次更多的影响。
> 安全: 指的是请求是否会改变服务器的状态
* get 安全且幂等(获取资源)
* post 不安全且不幂等 (创建子资源;使用服务端管理的（自动产生）的实例号创建资源) 
* put 不安全但幂等 (用客户端管理的实例号创建一个资源;通过替换的方式更新资源;)
* DELETE 不安全但幂等(删除资源;)
###### POST和PUT用于创建资源时有什么区别? 
* POST和PUT在创建资源的区别在于，所创建的资源的名称(URI)是否由客户端决定。

###### GET与POST区别
* GET在浏览器回退时是无害的，而POST会再次提交请求
* GET请求会被浏览器主动缓存，而POST不会，除非手动设置
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
* GET请求在URL中传送的参数是有长度限制的，而POST没有限制
* GET参数通过URL传递，POST放在Request body中



### Javascript 常见继承
```js
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
```
##### 原型链继承
> 特点：子类的原型 是 父类 的实例。
 >> 缺点：继承单一；多个子类继承的父类引用类型相同，一个实例修改了原型属性，那么也会影响其他的实例；无法向父类传参；
 >> 优点：非常纯粹的继承关系，实例是子类的实例，也是父类的实例；父类新增原型方法/原型属性，子类都能访问到
 ```js
function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

//　Test Code
var cat = new Cat();
console.log(cat.name);
cat.eat('fish');
cat.sleep();
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true
 ```
##### 构造函数继承
> 特点：使用.call()和.apply()将父类构造函数引入子类函数，使用父类的构造函数来增强子类实例
>> 缺点：只能继承父类的实例属性和方法，不能继承原型属性/方法；实例并不是父类的实例，只是子类的实例；无法实现函数复用；
>> 优点：可以实现多继承；创建子类实例时，可以向父类传递参数；

```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```
##### 实例继承
> 为父类实例添加新特性，作为子类实例返回
>> 缺点：实例是父类的实例，不是子类的实例；不支持多继承；
>> 优点：不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果

```js
function Cat(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false
```
#### 组合继承
> 通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
>> 缺点：调用了两次父类构造函数，生成了两份实例
>> 优点：既是子类的实例，也是父类的实例；可传参可复用；既可以继承父类原型方法，也可以继承父类实例；

```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();
// 组合继承也是需要修复构造函数指向的。
Cat.prototype.constructor = Cat;
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```
##### 寄生组合继承
>通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true
```

### 箭头函数的this指向
* 写法问题：箭头函数只能使用 **赋值式** 写法，不能使用 声明式 写法
* 箭头函数 没有 arguments 参数和 super

> 箭头函数没有自己的this，因此不能使用 call,apply 改变this的指向; 箭头函数不能用于构造函数；
> 箭头函数总是指向定义时的 this   （默认绑定外层this） 对于多层嵌套的箭头函数，箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。
```js
var x=11;
var obj={
  x:22,
  say:function(){
    console.log(this.x)
  }
}
obj.say(); // 22

var x=11;
var obj={
  x:22,
  say:() => console.log(this.x)
}
obj.say(); // 11
```


### instanceof 注意事项
* 使用instanceof 判断一个变量是否是数组 arr instanceof Array 如果是true 则说明是数组；反之 则不是数组； instanceof Object 为true，不能说明 变量为对象，也可能是数组；
* arr instanceof  Array 相当于 Array.prototype.isPrototypeOf(arr) 如果是true 则说明是数组；反之 则不是数组；
* 从原型链的角度根据 instanceof 判断一个变量是否是一个数组 相当于 arr._proto_ === Array.prototype 相当于 arr.constructor === Array 为true 是数组，反之，则不是数组

### fetch 和 Ajax  axios的区别
* fetch 是window对象的一个方法，其第一个参数是url，第二个参数是init对象，用来初始化，返回的是一个promise对象； Ajax 是对于XMLHttpRequest的一层封装；
* fetch 跨域的时候默认不会带cookie，因此需要手动的指定 credentials:'include'，即默认情况下fetch 不会接受和发送cookie；fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500 ；所有的IE浏览器都不会支持 fetch()方法
* axios 是promise版的 Ajax，他默认自动转换JSON数据，可以拦截转换请求和响应，并且客户端支持防止CSRF/XSRF


### 在Dva 结合 antd 的项目中使用 antd 的组件 Anchor 组件时由于使用的是 hashHistory 导致设置锚点时 会导致路由匹配错误

> 解决方案
>> 通过使用window.scrollTo 来解决。首先在相关的位置 设置id, 给锚点导航列表设置 相应的点击事件。通过点击事件获取点击的Dom节点的**offsetTop**值，接着将获取的offsetTop值 传给 window.scrollTo方法。这样是页面滚动到相应的位置。
> 如何实现页面滚动 到相应位置时自动选中锚点导航列表的DOM 元素
>> 在组件的componentDidMount 声明周期内 调用 window.addEventListener('scroll',this.props.onScroll) 函数 ,在onScroll 函数内通过获取相应的DOM
节点的offsetTop 值，通过比较 offsetTop 和 window.scrollY + 200 的值的大小，修改相应锚点列表节点的样式。 

* 上边的解决方案 当启动本地项目时可以生效，但是当你部署到生产环境是你会发现 当触发点击事件时，执行到 window.scrollTo()时，在生产环境这行代码不会执行，
 > 解决方案
 > 使用Element.scrollIntoView()
 ```js
    const scrollToAnchor = (anchorName) => {
      if (anchorName) {
          // 找到锚点
          let anchorElement = document.getElementById(anchorName);
          // 如果对应id的锚点存在，就跳转到锚点
          if(anchorElement) {
              anchorElement.scrollIntoView();
              // 如果页面有固定header，处理顶部header遮挡title的问题
              const scrolledY = window.scrollY;
              if(scrolledY){
                  window.scroll(0, scrolledY - 100);   // 100为header高度
              }
          }
      }
   };
 ```

 * 同样 当在生产环境时，当触发 scroll 事件时，会发现当获取 window.scrollY 时，获取到的值始终是0 当我们本地编译时，打印的window.scrollY 是可以获取到的，
 但是当我们 打包部署到线上环境时，会发现打印的始终未0

 > 解决办法
 > 使用 document.body.scrollTop

 * 此时有必要区分一下 获取页面卷曲高度的  相关概念
  >网页可见区域宽： document.body.clientWidth;
  >网页可见区域高： document.body.clientHeight;
  >网页可见区域宽： document.body.offsetWidth    (包括边线的宽);
  >网页可见区域高： document.body.offsetHeight   (包括边线的宽);
  >网页正文全文宽： document.body.scrollWidth;
  >网页正文全文高： document.body.scrollHeight;
  >网页被卷去的高： document.body.scrollTop;
  >网页被卷去的左： document.body.scrollLeft;
  >网页正文部分上： window.screenTop;
  >网页正文部分左： window.screenLeft;
  >屏幕分辨率的高： window.screen.height;
  >屏幕分辨率的宽： window.screen.width;
  >屏幕可用工作区高度： window.screen.availHeight;
  >屏幕可用工作区宽度：window.screen.availWidth;
  >scrollHeight: 获取对象的滚动高度。  
  >scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
  >scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
  >scrollWidth:获取对象的滚动宽度
  >offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
  >offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
  >offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置  
  >event.clientX 相对文档的水平座标
  >event.clientY 相对文档的垂直座标
  >event.offsetX 相对容器的水平坐标
  >event.offsetY 相对容器的垂直坐标  
  >document.documentElement.scrollTop 垂直方向滚动的值
  >event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量

* 最后谈一下我们的优化 因为页面监听 scroll 事件 会消耗很多的资源，因此可以考虑 将scroll的 回调事件 设置为 防抖函数
> 解决方法 
>> 使用loadsh的 debounce函数 将回调函数 优化 
```js
  componentWillMount(){
      let _this = this;
      const domain = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).domain
      domain =='Wb' ? window.addEventListener('scroll', this.props.onScroll,true) :''
  }
```

* 问题二 当我们的页面刷新时 会造成页面保持刷新前的状态，即页面始终保持在之前滚动的位置。 当需求是页面刷新时 我们希望滚动条回到顶端.需要注意的是 ** 如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。 即 addEventListener 和 removeEventListener 的 第三个参数要相等 **
> 解决方法
>> 在组建的卸载生命周期函数内 清空监听的scroll事件

```js
  componentWillUnmount(){
      const domain = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).domain
      domain =='Wb' ? window.removeEventListener('scroll',this.propsonScroll,true) :''
  }
```

### jsx 对于部分css3 属性不支持的解决方法
> 比如 boxShow 不支持，可以通过原生js方法获取dom节点，通过修改 style 属性来支持（没有什么是原生js解决不了的）

### 如何配置React-Router

### 路由的动态加载模块

### 服务端渲染SSR

### 介绍路由的history
> React Router 是建立在 history 之上的。 常见的

### 介绍Redux数据流的流程


### Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理


### 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块


### 常见Http请求头
> Accept	可接受的响应内容类型（Content-Types）。	Accept: text/plain	固定
> Accept-Charset	可接受的字符集	Accept-Charset: utf-8	固定
> Accept-Encoding	可接受的响应内容的编码方式。	Accept-Encoding: gzip, deflate	固定
> Accept-Language	可接受的响应内容语言列表。	Accept-Language: en-US	固定
> Accept-Datetime	可接受的按照时间来表示的响应内容版本	Accept-Datetime: Sat, 26 Dec 2015 17:30:00 GMT	临时
> Authorization	用于表示HTTP协议中需要认证资源的认证信息	Authorization: Basic OSdjJGRpbjpvcGVuIANlc2SdDE==	固定
> Cache-Control	用来指定当前的请求/回复中的，是否使用缓存机制。	Cache-Control: no-cache	固定
> Connection	客户端（浏览器）想要优先使用的连接类型	Connection: keep-alive
> Connection: Upgrade 固定
> Cookie	由之前服务器通过Set-Cookie（见下文）设置的一个HTTP协议Cookie	Cookie: $Version=1; Skin=new;	固定：标准
> Content-Length	以8进制表示的请求体的长度	Content-Length: 348	固定
> Content-MD5	请求体的内容的二进制 MD5 散列值（数字签名），以 Base64 编码的结果	Content-MD5: oD8dH2sgSW50ZWdyaIEd9D==	废弃
> Content-Type	请求体的MIME类型 （用于POST和PUT请求中）	Content-Type: application/x-www-form-urlencoded	固定
> Date	发送该消息的日期和时间（以RFC 7231中定义的"HTTP日期"格式来发送）	Date: Dec, 26 Dec 2015 17:30:00 GMT	固定
> Expect	表示客户端要求服务器做出特定的行为	Expect: 100-continue	固定
> From	发起此请求的用户的邮件地址	From: user@itbilu.com	固定
> Host	表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。	Host: www.itbilu.com:80
> Host: www.itbilu.com 固定
> Origin	发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个Access-Control-Allow-Origin的消息头，表示访问控制所允许的来源）。	Origin: http://www.itbilu.com	固定: 标准
> Pragma	与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生。	Pragma: no-cache	固定
> Proxy-Authorization	用于向代理进行认证的认证信息。	Proxy-Authorization: Basic IOoDZRgDOi0vcGVuIHNlNidJi2==	固定
> Range	表示请求某个实体的一部分，字节偏移以0开始。	Range: bytes=500-999	固定
> Referer	表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面。Referer其实是Referrer这个单词，但RFC制作标准时给拼错了，后来也就将错就错使用Referer了。	Referer: http://itbilu.com/nodejs	固定
> User-Agent	浏览器的身份标识字符串	User-Agent: Mozilla/……	固定

#### 前后端常见的几种鉴权方式
> 目前我们常用的鉴权有四种：
* HTTP Basic Authentication
* session-cookie
* Token 验证
* OAuth(开放授权)
  1． 客户端向服务器请求数据，请求的内容可能是一个网页或者是一个ajax异步请求，此时，假设客户端尚未被验证，则客户端提供如下请求至服务器:
  Get /index.html HTTP/1.0 
  Host:www.google.com
  2． 服务器向客户端发送验证请求代码401,（WWW-Authenticate: Basic realm=”google.com”这句话是关键，如果没有客户端不会弹出用户名和密码输入界面）服务器返回的数据大 抵如下：
  ```js
    HTTP/1.0 401 Unauthorised 
    Server: SokEvo/1.0 
    WWW-Authenticate: Basic realm=”google.com” 
    Content-Type: text/html 
    Content-Length: xxx 
  ```
  3． 当符合http1.0或1.1规范的客户端（如IE，FIREFOX）收到401返回值时，将自动弹出一个登录窗口，要求用户输入用户名和密码。
  4． 用户输入用户名和密码后，将用户名及密码以BASE64加密方式加密，并将密文放入前一条请求信息中，则客户端发送的第一条请求信息则变成如下内容：
  Get /index.html HTTP/1.0 
  Host:www.google.com 
  Authorization: Basic d2FuZzp3YW5n
注：d2FuZzp3YW5n表示加密后的用户名及密码（用户名：密码 然后通过base64加密，加密过程是浏览器默认的行为，不需要我们人为加密，我们只需要输入用户名密码即可）
  5． 服务器收到上述请求信息后，将Authorization字段后的用户信息取出、解密，将解密后的用户名及密码与用户数据库进行比较验证，如用户名及密码正确，服务器则根据请求，将所请求资源发送给客户端
效果： 
  客户端未未认证的时候，会弹出用户名密码输入框，这个时候请求时属于pending状态，这个时候其实服务当用户输入用户名密码的时候客户端会再次发送带Authentication头的请求。

第二种这个方式是利用服务器端的session（会话）和浏览器端的cookie来实现前后端的认证，由于http请求时是无状态的，服务器正常情况下是不知道当前请求之前有没有来过，这个时候我们如果要记录状态，就需要在服务器端创建一个会话(seesion),将同一个客户端的请求都维护在各自得会会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建seesion，如果有则已经认证成功了，否则就没有认证。 
session-cookie认证主要分四步： 
   1.服务器在接受客户端首次访问时在服务器端创建seesion，然后保存seesion(我们可以将seesion保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的标识字符串,然后在响应头中种下这个唯一标识字符串。 
   2.签名。这一步只是对sid进行加密处理，服务端会根据这个secret密钥进行解密。（非必需步骤） 
   3.浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求de 请求头中会带上该域名下的cookie信息， 
   4.服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断该请求是否合法。

#### 前端性能优化
##### 静态资源优化
> 主要包括html、css、js和图片文件，静态资源的加载时间 
>> js、css文件压缩，图片压缩，gzip压缩：减少请求返回的数据量
>> 合并css、js文件，制作雪碧图：减少http的请求次数，节省网络请求时间
>> 静态资源cdn分发：客户端可以通过最佳的网络链路加载静态资源
>> 
##### 接口访问优化
##### 页面渲染速度优化
> 在JavaScript引用之前引用CSS标记,确保在使用JavaScript代码之前加载CSS 在引用JavaScript之前引用CSS可以实现更好地并行下载，从而加快浏览器的渲染速度。
> CSS文件需要非阻塞引入，以防止DOM花费更多时间才能渲染完成。( CSS文件可以阻止页面加载并延迟页面呈现。使用preload实际上可以在浏览器开始显示页面内容之前加载CSS文件。)
```css
<link rel="preload" href="global.min.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="global.min.css"></noscript>
```
> 避免页面的回流
> 减少使用第三方库，加载JavaScript异步操作

##### Dom 操作优化
######  js 文档片段和节点缓存（性能优化）

```js

  // 使用 文档片段  （减少回流次数回流）
  var ulNode = document.getElementById("container");
  var liNode, i, m;
  var fragment = document.createDocumentFragment();
  for (i = 0, m = data.length; i < m; i++) {
      liNode = document.createElement("li");
      liNode.innerText = data[i];
      fragment.appendChild(liNode);
  }
  ulNode.appendChild(fragment);

  // 节点缓存
  var liNode, i, m;
  for (i = 0, m = data.length; i < m; i++) {
      liNode = document.createElement("li");
      liNode.innerText = data[i];
      document.getElementById("container").appendChild(liNode);
  }
  // 优化代码
  var ulNode = document.getElementById("container");
  var liNode, i, m;
  for (i = 0, m = data.length; i < m; i++) {
      liNode = document.createElement("li");
      liNode.innerText = data[i];
      ulNode.appendChild(liNode);
  }
```

###### 通过类 修改样式(每次修改style属性后都会触发元素的重绘，如果修改了的属性涉及大小和位置，将会导致回流。)
```js
  var element = document.getElementById('app')

  element.style.fontWeight = 'bold';
  element.style.backgroundImage = 'url(back.gif)';
  element.style.backgroundColor = 'white';
  element.style.color = 'white';

  // 优化后的代码
  element.classList.add('class')
```
###### 使用事件委托的 方式
```js
  var ulNode = document.getElementById("container");
  var fragmentHtml = "", i, m;
  var liFnCb = function(evt){
      //do something
  };
  for (i = 0, m = data.length; i < m; i++) {
      fragmentHtml += "<li>" + data[i] + "</li>";
  }
  ulNode.innerHTML = fragmentHtml;
  ulNode.addEventListener("click", function(evt){
      if(evt.target.tagName.toLowerCase() === 'li') {
          liFnCb.call(evt.target, evt);
      }
  }, false);
```

### 箭头函数 不适用的场景

* 作为对象的方法， 在对象内部 使用箭头函数
* 多为原型对象上方法的定义 使用箭头函数会使运行时的上下文执行错误
* 作为 dom 事件的回调
* 作为构造函数