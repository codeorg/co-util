/**
 * Created by Administrator on 2016/11/17.
 */
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const fs = require('fs');
class fileSystem{
    // 文件操作----------------------------------------------
    // 异步创建目录
    static mkdir(path, mode) {
        return new Promise((resolve,reject)=>{
            mkdirp(path, mode, function (err) {
                if(err){
                    reject(err)
                }else{
                    resolve(true);
                }
            });
        })
    }
    //异步删除整个目录
    static rmdir(path) {
        return new Promise((resolve,reject)=>{
            rimraf(path,  function (err) {
                if(err){
                    reject(err)
                }else{
                    resolve(true);
                }
            });
        })
    }
    //返回所有目录名
    static dirs(path){
        return new Promise((resolve,reject)=>{
            let arr=[];
            fs.readdir(path,(err,files)=>{
                if(err){
                    resolve(arr);
                }
                else {
                    let i=0;
                    files.forEach((file)=>{
                        fileSystem.isDir(path+'/'+file).then((isdir)=>{
                            i++;
                            if(isdir) arr.push(file);
                            if(i==files.length) return resolve(arr);
                        })
                    })
                }
            })
        })
    }
    static isDir(path){
        return new Promise((resolve,reject)=> {
            fs.stat(path, (err, stat) => {
                if(err){
                    reject(err)
                }else{
                    resolve(stat.isDirectory())
                }
            })
        })
    }

}
module.exports=fileSystem;