// 启动本地服务
var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('Hello nodejs!');
	res.end();
}).listen(2015);

// 
