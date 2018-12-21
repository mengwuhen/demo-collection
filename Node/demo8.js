var express = require('express'); 

var app = express(); 
app.use(express.bodyParser()); 
app.all('/', function(req, res) { 
 res.send(req.body.title + req.body.text); 
}); 
app.listen(3000); 