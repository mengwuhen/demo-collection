#### 回流 与 重绘的区别
  回流必定引起重绘，重绘不一定引发回流。
  引发回流的条件：
* 添加或者删除可见的DOM元素；
* 元素位置改变；
* 元素尺寸改变——边距、填充、边框、宽度和高度
* 内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
* 页面渲染初始化；
* 浏览器窗口尺寸改变——resize事件发生时；

#### CORS 跨域携带 Cookie 发送请求
  当在 a.com 进行访问时，如何向 b.com 携带 b.com 的 cookie 发送一个请求？
* 在发送跨域请求时，需要后端设置一些请求头，否则浏览器不会允许客户端跨域发送请求。 Access-Control-Allow-Origin: a.com 这样调用过去会发现，b.com 会返回用户未登录。原因是 b.com 的 cookie 没有发送过去。
  跨域携带 Cookie
* 这时候需要后端添加另外一个请求头： Access-Control-Allow-Credentials: true  前端在发送请求时也需要设置 xhr.withCredentials= true;  //关键句

#### cookie session token 区别
 ###### cookie与session的区别是
 * cookie数据保存在客户端，session数据保存在服务器端。
 * cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗,考虑到安全应当使用session.session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能,考虑到减轻服务器性能方面，应当使用COOKIE.
 * 作为身份认证 token安全性比session好，因为每个请求都有签名还能防止监听以及重放攻击

#### React 组件间的通信
 ###### 父传子
 * 父传子通过props 传递
 ###### 子传父
 * child 组件通知 parent 组件， 主要是依靠 parent 传下来的 callback 函数执行，改变 parent 组件的状态，或者把 child 自己的 state 通知 parent 。
 ###### 兄弟组件
 * 利用共有的Container 相当于将状态提升至兄弟组件的父组件  当然也可以使用context

 #### 如何理解React的渲染机制
 ##### React 生命周期
 ###### 实例化阶段
 * 依次执行 getDefaultProps -> getInitialState -> componentWillDidMount -> render -> componentDidMount
 ###### 存在期
 * state状态更新 shouldComponetUpDate (true) -> componentWillUpdate -> render -> componentDidMount
 * props状态更新 componentWillReceiveProps -> shouldComponetUpDate (true) -> componentWillUpdate -> render -> componentDidMount
 ###### 卸载销毁期
 * componentWillUnmount

 ##### React Differ 算法
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

#### git reset --soft  git reset --mixed  git reset --hard 的区别
* git reset --soft 会保留之前修改的文件  但是文件状态为 未提交（not commit）
* git reset -- mixed 会保留之前修改的文件  但是文件状态 未add （not add）
* git reset -- hard 不会保留之前所做的修改 

#### es6 class 与 Function 的区别
* 类的本质是function(构造函数) 类的实例通过constructor 指向 类。类的实例通过 __proto__ 指向类的原型。 类通过 prototype 指向 类.prototype(类的原型)。类的原型通过 constructor 指向类的实例
* 
* 不同点 类内部定义的方法都是不可枚举的。即通过Object.keys 无法遍历到 类的方法
* 类的定义不存在 变量提升 即 类只能先定义在使用
* 类 的this指向问题。类的方法内部如果含有this,它默认指向类的实例， 但是单独使用时可能会报错。 解决方法一：在constructor内绑定this。解决方案二： 在constructor内使用箭头函数。（constructor 默认返回实例对象）
* 类 的静态方法 在类内部的方法前边加上 static 关键字 。即 这个方法只会存在 类 上，不会存在实例的原型上。（父类的静态方法可以被子类继承。）
* 类 的静态属性 在类内部属性名字 前边 加上static 关键字

#### class 的继承
* ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面
* class 的继承 实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
* 子类的__proto__属性，表示构造函数的继承，总是指向父类。 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

```js 
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
} Object.setPrototypeOf(B, A)
```

#### js创建对象的不同方式(三种基本方式)  
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
####







