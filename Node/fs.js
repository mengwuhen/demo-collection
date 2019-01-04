var http = require('http');
var rimraf = require('rimraf')
 

// 解压
// var fs = require('fs');
// var zlib = require('zlib');
// var gzip = zlib.createGzip();
// var inFile = fs.createReadStream('./file.txt.gz');
// var out = fs.createWriteStream('./file.txt');
// inFile.pipe(gzip).pipe(out);

var fs = require('fs');
var path = require('path');
// 判断文件是否存在
fs.access('./hello', function (err) {
	if (err) {
		fs.mkdir('./hello', function (err) {
			if (err) {
				console.log('err')
			}
		})
	};
	console.log('hello 文件夹存在');
	// 创建目录

});

// 创建文件
fs.writeFile('./file.txt', 'helloworld', function (err) {
	if (err) throw err;
	console.log('文件创建成功')
})

//  读取文件
fs.readFile('./file.txt','utf8',function(err,data){
	if(err) throw err
	console.log(data)

})

// 删除文件
fs.unlink('./file.txt', function (err) {
	if (err) throw err;
	console.log('文件删除成功');
});

// 修改文件权限
// fs.chmod()，也可以用fs.fchmod()。两者的区别在于，前面传的是文件路径，后面传的的文件句柄。
// fs.chmod()、fs.lchmod()区别：如果文件是软连接，那么fs.chmod()修改的是软连接指向的目标文件；fs.lchmod()修改的是软连接。

fs.chmod('./file2.txt','777', function (err) {
	if (err) throw err;
	console.log('权限修改成功');
});


// 重命名文件
// 先判断文件是否存在  存在重命名文件 不存在 先创建在重命名  (回调地狱)
// fs.access('./文件2.txt', function (err) {
// 	if (err) {
// 		fs.appendFile('./文件2.txt', function (err) {
// 			if (err) throw err
// 			fs.access('./file2.txt', function (err) {
// 				if (err) {
// 					fs.unlink('./file2.txt', function (err) {
// 						if (err) throw err;
// 						console.log('文件删除a成功');
// 					});
// 				} else {
// 					fs.rename('./文件2.txt', 'file2.txt', function (err) {
// 						if (err) throw err
// 						console.log('文件重d命名success')
// 					})
// 				}
// 			})
// 		})
// 	} else {
// 		fs.access('./file2.txt', function (err) {
// 			if (err) {
// 				fs.unlink('./file2.txt', function (err) {
// 					if (err) throw err;
// 					console.log('文件删除s成功');
// 				});
// 			} else {
// 				fs.rename('./文件2.txt', 'file2-.txt', function (err) {
// 					if (err) throw err;
// 					console.log('文件重f命名success')
// 				})
// 			}
// 		})
// 	}
// })

// 监听文件修改 
//  watchfile 和 watch 的区别  fs.watch()比fs.watchFile()高效很多  fs.watchFile() 每隔一段时间检查文件是否发生变化  watch 在非 ios 和 Windows 上 存在兼容性问题
const options = {
	persistent: false, //<boolean> 如果文件已正在监视，是否继续运行进程。默认为 true。
	recursive: false, // <boolean> 是否监视全部子目录。适用于监视目录，且只在支持的平台有效（参见注意事项）。默认为 false。
	encoding: 'utf8' // <string> filename 的字符编码。默认为 'utf8'。
}
fs.watch('./', options, function (eventType, filename) {
	console.log('触发事件:' + eventType);
	if (filename) {
		console.log('文件名是: ' + filename);
	} else {
		console.log('文件名是没有提供');
	}
})

// 获取文件状态
// fs.stat() vs fs.fstat()：传文件路径 vs 文件句柄。
// fs.stat() vs fs.lstat()：如果文件是软链接，那么fs.stat()返回目标文件的状态，fs.lstat()返回软链接本身的状态。
fs.stat('./file2.txt', function (err, stats) {
	if (err) throw err;
	// console.log(stats)
})

// // 文件打开
var file2 = './文件2.txt'
fs.open(file2, 'w+', '666', function (err, fd) {
	if (err) throw err;
})

// // 追加文件内容
fs.appendFile('file2','c!e!c!ecececece!!!',function(err){
	if(err) throw err;
})

// 文件内容截取
// 获取要截断的文件的文件描述符。
// 在 Windows 上，只能使用写入权限。
const fd = fs.openSync('file2', 'r+');
// 截断文件至前 4 个字节。
fs.ftruncate(fd, 8, (err) => {
	if(err) throw err;
	console.log('fd')
})

// 创建临时目录
fs.mkdtemp('./hello/', function(err, folder){
    if(err) {
		fs.mkdir('./hello', function (err) {
			if (err) {
				console.log('err')
			}
		})
	} else {
		// 获取文件真实路径
		fs.realpath('hello',function(err,resolvedPath){
			if(err) throw err
			console.log(resolvedPath)
		})
	}
	
})

// 删除非空目录
// const filePath = `./hello`//要删除的文件夹 url
// rimraf(filePath, function(err){
// 	if(err) throw err
// })

console.log( 'path.resolve: ' + path.resolve('./文件2.txt') )

// 删除空目录 
// fs.rmdir('./hello',function(err){
// 	if(err) throw err
// })

// // 读取目录
fs.readdir('../Node',function(err,files){	
	if(err) throw err 
	console.log(files)
})



// 检查文件是否存在。 (不建议在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查文件的可访问性。 因为其他进程可能在两个调用的间隙改变文件的状态。 应该直接打开、读取或写入文件，当文件无法访问时再处理错误。)

var file = './file2.txt'
fs.access(file, fs.constants.F_OK,function(err){
	if(err) throw err;
	console.log(`${file} ${err ? '不存在' : '存在'}`);
});

// // 检查文件是否可读。
fs.access(file, fs.constants.R_OK, function(err){
	if(err) throw err;
	console.log(`${file} ${err ? '不可读' : '可读'}`);
});

// // 检查文件是否可写。
fs.access(file, fs.constants.W_OK,function(err){
	if(err) throw err;
	console.log(`${file} ${err ? '不可写' : '可写'}`);
});

// // 检查文件是否存在且可写。
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
	if (err) {
		console.error(
			`${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
	} else {
		console.log(`${file} 存在且可写`);
	}
});





