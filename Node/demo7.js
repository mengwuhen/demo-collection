
var http = require('http'); 
var url = require('url'); 
var util = require('util');
var querystring = require('querystring'); 

http.createServer(function(req, res) { 
 res.writeHead(200, {'Content-Type': 'text/plain'}); 
 
 res.end(util.inspect(url.parse(req.url, true))); 
}).listen(3000); 

// http.createServer(function(req, res) { 
//  var post = ''; 
//  req.on('data', function(chunk) { 
//  post += chunk; 
//  }); 
//  req.on('end', function() { 
//  post = querystring.parse(post); 
//  res.end(util.inspect(post)); 
//  }); 
// }).listen(3000); 

var contents = querystring.stringify({ 
 name: 'byvoid', 
 email: 'byvoid@byvoid.com', 
 address: 'Zijing 2#, Tsinghua University', 
}); 
var options = { 
 host: 'www.byvoid.com', 
 path: '/application/node/post.php', 
 method: 'POST', 
 headers: { 
 'Content-Type': 'application/x-www-form-urlencoded', 
 'Content-Length' : contents.length 
 } 
}; 
var req = http.request(options, function(res) { 
 res.setEncoding('utf8'); 
 res.on('data', function (data) { 
 console.log(data); 
 }); 
}); 
req.write(contents); 
req.end(contents); 