var assert = require('assert')

// assert 断言 当遇到 false 时  message 会 打印 同时 程序中断执行  相当于 return false
function add(a, b) {
    return a + b;
}

var expected = add(1, 2);

assert(expected === 3, '预期1加2等于3'); // 不会有输出

// assert(expected === 4, '预期1加2等于3'); // AssertionError: 预期1加2等于3

var person1 = {
    "name": "john",
    "age": "21"
};
var person2 = {
    "name": "john",
    "age": "21a"
};

assert.deepEqual(person1, person2, '预期两个对象应该有相同的属性');