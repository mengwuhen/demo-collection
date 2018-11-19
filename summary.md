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

### React 组件间的通信
 ##### 父传子
 * 父传子通过props 传递
 ##### 子传父
 * child 组件通知 parent 组件， 主要是依靠 parent 传下来的 callback 函数执行，改变 parent 组件的状态，或者把 child 自己的 state 通知 parent 。
 ##### 兄弟组件
 * 利用共有的Container 相当于将状态提升至兄弟组件的父组件  当然也可以使用context

### React如何获取DOM实例 以及 访问子组件方法及属性
> React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。
  >ref : 绑定属性
  >refs : 调用的时候使用
##### 父组件访问子组件的方法 
* refs,它可以调用子组件的方法以及属性(场景：子组件的状态和方法在组件内部维护，但是父组件需调用子组件的方法来改变子组件的状态)
```js
class SubComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '这里是初始化文本'
    };
  }
  subHandleClick(){
    this.setState({text: '文本被改变啦！哈哈！'})
  }
  render(){
    return(
      <div>
        查看：{this.state.text}
      </div>
    )
  }
}

class MyComponent extends Component {
  handleClick(){
    this.refs.subcomponents.subHandleClick();
  }
  render(){
    return(
      <div>
        <input
          type="button"
          value="点我调用子组件方法"
          onClick={this.handleClick.bind(this)}
        />
        <SubComponent ref="subcomponents" />
      </div>
    )
  }
}
```
##### 获取dom实例
```js
class MyComponent extends Component {
  handleClick(){
    this.refs.myInput.focus();
  }
  render(){
    return(
      <div>
        <input 
          type="text" 
          ref="myInput" 
        />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    )
  }
}
```
 ### 如何理解React的渲染机制
 ##### React 生命周期
 ##### 实例化阶段
 * 依次执行 getDefaultProps -> getInitialState -> componentWillDidMount -> render -> componentDidMount
 ##### 存在期
 * state状态更新 shouldComponetUpDate (true) -> componentWillUpdate -> render -> componentDidMount
 * props状态更新 componentWillReceiveProps -> shouldComponetUpDate (true) -> componentWillUpdate -> render -> componentDidMount
 ##### 卸载销毁期
 * componentWillUnmount

 ### React Differ 算法
 * 在页面一开始打开的时候，React会调用render函数构建一棵虚拟Dom树，在state/props发生改变的时候，render函数会被再次调用渲染出另外一棵树，接着，React会用对两棵树进行对比，找到需要更新的地方批量改动。
 **React基于两个假设**
 * 两个相同的组件产生类似的DOM结构，不同组件产生不同DOM结构
 * 对于同一层次的一组子节点，它们可以通过唯一的id区分
 **Diff算法是怎么做的，这里分为两种情况考虑**
 * 节点类型相同，但是属性不同
 * 节点类型不同
 对于不同的节点类型，react会基于第一条假设，直接删去旧的节点，新建一个新的节点。</br>
 **相同节点类型**</br>
当对比相同的节点类型比较简单，这里分为两种情况，</br>
一种是DOM元素类型，对应html直接支持的元素类型：div，span和p；</br>
还有一种是React组件。由于React此时并不知道如何去更新DOM树，因为这些逻辑都在React组件里面，所以它能做的就是根据新节点的props去更新原来根节点的组件实例，触发一个更新的过程.

### react 受控组件 与 非受控组件区别

>  React内部分别使用了props, state来区分组件的属性和状态。props用来定义组件外部传进来的属性, 属于那种经过外部定义之后, 组件内部就无法改变。而state维持组件内部的状态更新和变化, 组件渲染出来后响应用户的一些操作,更新组件的一些状态。如果组件内部状态不需要更新,即没有调用过this.setState, 全部通过props来渲染也是没问题的,。
##### 非受控组件
* 非受控组件一般没什么用途，其值并非受父组件控制，它的值受其自身控制。但是，我们可以对其添加一个ref属性，这样可以获得对非受控组件渲染后底层DOM元素的访问。 非受控组件即组件的状态改变不受控制。（input defaultVale）
##### 受控组件
* 控组件与其它React组件行为一样，其所有状态属性的更改都由React 来控制，也就是说它根据组件的props和state来改变组件的UI表现形式。 受控组件是可通过事件完成的对value的控制。（input 的 value）

### react 无状态组件 和 有状态组件
>我们通常通过props和state来处理两种类型的数据。props是只读的，只能由父组件设置。state在组件内定义，在组件的生命周期中可以更改。基本上，无状态组件（也称为哑组件）使用props来存储数据，而有状态组件（也称为智能组件）使用state来存储数据.
##### 无状态组件(Stateless Component)
* 最基础的组件形式，由于没有状态的影响所以就是纯静态展示的作用。一般来说，各种UI库里也是最开始会开发的组件类别。它的基本组成结构就是属性（props）加上一个渲染函数（render）。
##### 有状态组件（Stateful Component）
* 如果组件内部包含状态（state）且状态随着事件或者外部的消息而发生改变的时候，这就构成了有状态组件（Stateful Component）。有状态组件通常会带有生命周期(lifecycle)，用以在不同的时刻触发状态的更新。这种组件也是通常在写业务逻辑中最经常使用到的。

### 单向数据流(M -> V) 和 双向数据流（M <-> V）
##### 单向数据流
* 单向数据流　数据流动方向可以跟踪，流动单一，追查问题的时候可以跟快捷。缺点就是写起来不太方便。要使UI发生变更就必须创建各种action来维护对应的state
##### 双向数据流
* 双向流动　值和UI双绑定，代码量减少。但是由于各种数据相互依赖相互绑定，导致数据问题的源头难以被跟踪到，子组件修改父组件，兄弟组件互相修改有有违设计原则。　但　好处就是　太特么方便了。

### redux-saga 的 takeEvery 、 takeLatest 、takeLeading 的区别
* takeEvery  允许处理并发的 action，但是不会对多个任务的响应进行排序，并且不保证任务将会以它们启动的顺序结束。如果要对响应进行排序，可以关注以下的 takeLatest。
* takeLatest 在发起到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga。并自动取消之前所有已经启动但仍在执行中的 saga 任务。
* takeLeading 在发起到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga。 它将在派生一次任务之后阻塞，直到派生的 saga 完成，然后又再次开始监听指定的 pattern。

### redux-saga 的 call 、 fork 、take、cancel 的区别
* call 是一个会阻塞的 Effect, Generator 在调用结束之前不能执行或处理任何其他事情。
* fork 是一个无阻塞的 Effect，当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。
* take 就像我们更早之前看到的 call 和 put。它创建另一个命令对象，告诉 middleware 等待一个特定的 action。

* cancel yield fork 的返回结果是一个 Task Object。 我们将它们返回的对象赋给一个本地常量 task。我们将那个 task 传入给 cancel Effect。 如果任务仍在运行，它会被中止。如果任务已完成，那什么也不会发生，取消操作将会是一个空操作（no-op）。最后，如果该任务完成了但是有错误， 那我们什么也没做，因为我们知道，任务已经完成了。

### redux-saga 的 race all 的区别
* race 创建一个 Effect 描述信息，用来命令 middleware 在多个 Effect 间运行 竞赛，当 reslve race 的时候，middleware 会自动地取消所有输掉的 Effect。结果返回第一个完成的 effects。
* all 创建一个 Effect 描述信息，用来命令 middleware 并行地运行多个 Effect，并等待它们全部完成。 当并发运行 Effect 时，middleware 将暂停 Generator，直到以下任一情况发生：所有 Effect 都成功完成：（1）返回一个包含所有 Effect 结果的数组，并恢复 Generator。（2）在所有 Effect 完成之前，有一个 Effect 被 reject：在 Generator 中抛出 reject 错误。

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

### 前端性能优化
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
> 箭头函数总是指向定义时的 this  
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
>---------------------
>本文来自 德魁 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/DekuiCaiNiao/article/details/79041685?utm_source=copy 

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


### 介绍Redux数据流的流程


### Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理


### 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块


### 常见Http请求头