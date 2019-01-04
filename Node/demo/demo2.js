// var name; 
// exports.setName = function(thyName) { 
//  name = thyName; 
// }; 
// exports.sayHello = function() { 
//  console.log('Hello ' + name); 
// }; 

var Hello = function () {
    var name 
    this.setName = function (thyName) {
        name = thyName; 
    }
    this.sayHello = function () {
        console.log('Hello ' + name); 
    }
}


module.exports = Hello

// module.Hello = Hello
