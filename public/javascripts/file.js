const fs = require('fs');
const path = require('path');
//封装读取文件函数
function ReadFile(){
    return new Promise((resolve,reject)=>{
        //'..'这里出去一个文件夹原因在于__dirname获得的绝对路径是一直到lib所以需要出去一层到根目录中，只是处理了__dirname获得路径带来的影响
        fs.readFile(path.join(__dirname,'..',...arguments),(err,data)=>{
            if(err) reject(err);
            resolve(data);
        });
    });
}

//封装写文件函数
function WriteFile(){
    return new Promise((resolve,reject)=>{
        //将arguments转成数组，arguments是类数组，无法进行数组操作，所以在此进行转换
        let url = Array.from(arguments);
        let data = url.shift();
        fs.writeFile(path.join(__dirname,'..',...url),data,err=>{
            if(err) reject(err);
            resolve('ok');
        });
    });
}

module.exports = {ReadFile,WriteFile};