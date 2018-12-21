var http = require('http')

var util = require('util')

function Base() {
    this.name = 'base';
    this.base = 1991;

    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}

Base.prototype.showName = function () {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();
// objSub.sayHello(); //  报错 sub 仅继承 base 原型上的 属性 方法
console.log(objSub);

function Person() {
    this.name = 'byvoid';

    this.toString = function () {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));

async function fn() {
    return 'hello world';
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(ret);
});

console.log(util.format('%s:%s', 'foo'))
