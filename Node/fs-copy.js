var fs = require('fs');
var path = require('path')

function copy(src, dst) {

    fs.writeFileSync(dst, fs.readFileSync(src),function(err){
        if(err){
            throw err
        }
    });
}

function main(argv) {
    copy(argv[0], argv[1]);

}

main(process.argv.slice(0,2))
