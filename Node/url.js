var url = require('url')

var a = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');

console.log(a)

var b = url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
console.log(b)

var c = url.resolve('http://www.example.com/foo/bar', '../baz');
console.log(c)
