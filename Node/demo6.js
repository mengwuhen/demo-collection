var fs = require('fs');
// fs.readFile('file.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });

var a =  'qianchuan'

const data = new Uint8Array(Buffer.from('Node.js中文网'));
// 写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；writeFile 为异步写入
fs.writeFile('文件.txt', data, (err) => {
  if (err) throw err;
    
    var a = 'ceshi'

    // 持续写入文件
    fs.appendFile('文件.txt', a,function(err){
        if (err) throw err;

        //数据被添加到文件的尾部
        console.log('写入 测试 文案'); 

        // 获取真实 路径
        fs.realpath('文件.txt',function(err,resolved){
            if(err) throw err;
            console.log(resolved)
            
            // 重命名
            fs.rename( '文件.txt', '文件2.txt', function(err){
                if(err) throw err

                // 创建目录
                fs.mkdir('./tmp/ceshi', { recursive: false }, (err) => {
                    
                    if (err) throw err;
                });
            })
        })
    })
});


