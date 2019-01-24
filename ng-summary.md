# SCRM angularJs 知识积累

### angular 自定义指令理解
* angularJs 中的自定义指令 相当于 react中的组件
```js
//angular指令的定义，myDirective ，使用驼峰命名法
angular.module('myApp', [])
.directive('myDirective', function ($timeout, UserDefinedService) {
// 指令操作代码放在这里
});

//angular自定义指令 的使用，使用 “-” 来代替驼峰命名法
<div my-directive></div>
注意：为了避免与未来的HTML标准冲突，给自定义的指令加入前缀来代表自定义的
命名空间。AngularJS本身已经使用了 ng- 前缀，所以可以选择除此以外的名字。
在例子中我们使用 my- 前缀（比如 my-derictive ） 。

指令的生命周期开始于 $compile 方法 并 结束于 link 方法 

//自定义指令的全部可设置的属性大致如下
指令的选项如下所示，每个键的值说明了可以将这个属性设置为何种类型或者什么样的
函数：
angular.module('myApp', [])
.directive('myDirective', function() {               //指令名称myDirective
return {                //返回一个对象

restrict: String,      //可选字符串参数，可以设置这个指令在DOM中可以何种形式被声明，
            // 默认为A（attr(当做标签属性来使用)）<div my-directive></div> 
            // 设置为“E”(ele,(直接当做标签来使用)) <my-directive></my-directive>
            // C（类名）
            // <div class="my-directive:expression;"></div>
            //M（注释）
            //<--directive:my-directive expression-->
            //这些选项可以单独使用，也可以混合在一起使用：
            // angular.module('myDirective', function(){
            //    return {
            //        restrict: 'EA' // 输入元素或属性
            //    };
            // })

priority: Number, //优先级，可忽略，默认为0， ngRepeat的优先级为1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。
terminal: Boolean,
                //（布尔型），true或false,如果为false,则这个参数用来告诉AngularJS停止运行当前元素上比本指令优先级低的指令。优先级相同的指令还是会被执行。 ngIf 的优先级略高于 ngView ，
template: String or Template Function: 
                    //（字符串或函数）指令中的一个重要的一个属性，必须被设置其中一种
                    //1，  一段HTML文本；
                    //2，可以接收两个参数的函数，参数为 tElement 和 tAttrs 
                    //在html模板中必须只有一个根html标签,且如果有换行则需要使用“\”
                    //例如template: '\
                    //    <div> <-- single root element -->\
                    //        <a href="http://google.com">Click me</a>\
                    //        <h1>When using two elements, wrap them in a parent element</h1>\
                    //    </div>\
                    //function(tElement, tAttrs) (...},
                    //更好的选择是使用 templateUrl 参数引用外部模板，参考下面的参数

templateUrl: String,   
                //（字符串或函数）1，外部路径的字符串，2，接受两个参数的函数，参数为 tElement 和 tAttrs ，并返回一个外部HTML文件路径的字符串
                //模板加载后，AngularJS会将它默认缓存到 $templateCache 服务中。（可以提前加载模块到缓存中，提高加载速度）

replace: Boolean or String,  //（布尔型）默认为false(模板内容会加载到标签内部)，true(模板内容会替换当前标签)
scope: Boolean or Object,  //（布尔型或对象）,默认为false, 设置为true 时，会从父作用域继承并创建一个新的作用域对象。
            // ng-controller 的作用，就是从父级作用域继承并创建一个新的子作用域。
            // 如果要创建一个能够从外部原型继承作用域的指令，将 scope 属性设置为 true 
            // 设置为一个对象，则能设置 隔离作用域， scope 属性设置为一个空对象 {} 。如果这样做了，指令的模板就无法访问外部作用域了：
            // 例如.directive('myDirective', function() {
            //        return {
            //            restrict: 'A',
            //            scope: {},
            //            priority: 100,
            //            template: '<div>Inside myDirective {{ myProperty }}</div>'
            //        };
            //    });

            //在scope对象中，还可以使用“@” “=” “&”,来设置模板中数据的作用域和绑定规则
            //"@"  本地作用域属性：使用当前指令中的数据和DOM属性的值进行绑定
            //“=” 双向绑定：本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。
            //“&” 父级作用域绑定：通过 & 符号可以对父级作用域进行绑定
            //例如
            //scope: {
            //    ngModel: '=', // 将ngModel同指定对象绑定
            //    onSend: '&', // 将引用传递给这个方法
            //    fromName: '@' // 储存与fromName相关联的字符串
            //}

transclude: Boolean,  //默认为false.只有当你希望创建一个可以包含任意内容的指令时， 才使用 transclude: true 。
            //如果指令使用了 transclude 参数，那么在控制器（下面马上会介绍）中就无法正常监听数据模型的变化了。
controller: String or function(scope, element, attrs, transclude, otherInjectables) { ... }, //（字符串或函数)注册在应用中的控制器的构造函数
            //使用函数创建内联控制器，例如
            // angular.module('myApp',[])
            //     .directive('myDirective', function() {
            //     restrict: 'A',
            //     controller:
            //      function($scope, $element, $attrs, $transclude) {
            //      // 控制器逻辑放在这里
            //    }
            // })

controllerAs: String,   //可以在指令中创建匿名控制器,例如
            //   .directive('myDirective', function() {
            //     return {
            //     restrict: 'A',
            //     template: '<h4>{{ myController.msg }}</h4>',
            //     controllerAs: 'myController',
            //     controller: function() {
            //        this.msg = "Hello World"
            //        }
            //     };
            //    });    


require: String, //（字符串或数组）字符串代表另外一个指令的名字,如果没有前缀，指令将会在自身所提供的控制器中进行查找，如果没有找到任何控制器（或
        //具有指定名字的指令）就抛出一个错误。
        //例如
        //如果不使用 ^ 前缀，指令只会在自身的元素上查找控制器。
        //require: 'ngModel'
        // 使用 ?   如果在当前指令中没有找到所需要的控制器，会将 null 作为传给 link 函数的第四个参数
        //require: '?ngModel'
        //使用  ^  如果添加了 ^ 前缀，指令会在上游的指令链中查找 require 参数所指定的控制器。
        //require: '^ngModel'
        // 使用 ^？  将前面两个选项的行为组合起来，我们可选择地加载需要的指令并在父指令链中进行查找。
        //require: '^?ngModel',

link: function(scope, iElement, iAttrs) { ... }, //compile 选项本身并不会被频繁使用，但是 link 函数则会被经常使用。
                        //当我们设置了 link 选项， 实际上是创建了一个 postLink() 链接函数， 以便 compile() 函数可以定义链接函数。
                        //compile 和 link 选项是互斥的。如果同时设置了这两个选项，那么会把 compile 所返回的函数当作链接函数，而 link 选项本身则会被忽略。
                        //通常情况下，如果设置了 compile 函数，说明我们希望在指令和实时数据被放到DOM中之前
                        //进行DOM操作，在这个函数中进行诸如添加和删除节点等DOM操作是安全的。
        //用 link 函数创建可以操作DOM的指令。
        //require 'SomeController',
        //link: function(scope, element, attrs, SomeController) {
            // 在这里操作DOM，可以访问required指定的控制器
        //}
compile: function(tElement, tAttrs, transclude) {  
        return {
            pre: function(scope, iElement, iAttrs, controller) { ... },
            post: function(scope, iElement, iAttrs, controller) { ... }
        }
        // 或者
        return function postLink(...) { ... }
    }
};
});


```

### scope 的理解
* scope 是一个存储应用的数据模型；为表达式提供了一个执行上下文；可以监听表达式的变化和传播事件；**一般**情况下，作用域的层级结构对应DOM 树的层级结构；
* 一般情况下 一个路由对应一个 controller 和 一个 templateUrl 。一个controller 具有唯一的一个scope。
* scope 作为 controller 和 视图的桥梁
### ng-show 导致的页面闪动
* ng-show 与 ng-if 的区别
> ng-show 相当于 visibility： hidden； ng-if 相当于 display: none;
* 原因
> 由于页面初始化，先处理html显示，然后是angular js的处理后的显示，所以js运行前，所有ng-show控制不显示的内容，在页面初始化中先显示，js运行后才隐藏。
* 解决办法
> 1：在用到ng-show的元素里添加ng-hide class。
> 2：用ng-cloak来处理。

### angularJs 和 React 的区别
* 不同点
> angular 作为mvc的框架，react作为mvvm的框架，在执行效率上，react的效率要高于前者，主要是react 采用了 vm（visutual Dom）算法。
> angular 的概念偏多。包含有 指令、服务、controller、路由、modal 等概念，虽然相对复杂，但是节省了不少的代码。而react 采用了jsx 语法，提出一切皆组件的思想，在代码复用以 及组件化 方面对人更友好一些。
> angular 作为mvc的框架，在 **表现与行为** 分离上执行的更彻底一些。react 采用jsx 将html 和 js 融合在一起，对于新手不够友好。
* 相同点
> angularJs 虽然没有组件的概念，但是在 自定义指令 中 和react 的组件化 思想大同小异。

#### $scope.$apply 和 $scope.$digest()  的区别
* $scope.$apply和$scope.$digest都可以手动触发脏值检查实现数据双向同步；将数据实时表现在界面上；
* 当调用$digest的时候，只触发当前作用域和它的子作用域上的监控，但是当调用$apply的时候，会触发作用域树上的所有监控

#### $scope.$watch 

> angular的实现是使用脏检查
 >>不会脏检查所有的对象，当对象被绑定到html中，这个对象添加为检查对象(watcher)。
 >>不会脏检查所有的属性，同样当属性被绑定后，这个属性会被列为检查的属性。
 >>在angular程序初始化时，会将绑定的对象的属性添加为监听对象(watcher)，也就是说一个对象绑定了N个属性，就会添加N个watcher。


* $watch(watchFn,watchAction,deepWatch)
* watchFn:angular表达式或函数的字符串
* watchAction(newValue,oldValue,scope):watchFn发生变化会被调用
* deepWatch：可选的布尔值命令检查被监控的对象的每个属性是否发生变化 //(如果不加第三个参数，那么只会监听data，只有当data引用改变时才会触发) 当需要监听一些引用对象需要把第三个参数设置成true。
```js
    $scope.$watch("data", _.debounce(watchFunction,30),true);
```
* $watch会返回一个函数，想要注销这个watch 可以使用函数

```js
var listener = $scope.$watch("quartz", function () {});
// ...
listener(); // Would clear the watch
```
  

