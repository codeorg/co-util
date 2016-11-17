/**
 * Created by Administrator on 2016/11/17.
 */
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
class fs{
    // 文件操作----------------------------------------------
    // 异步创建目录
    static mkdir(dirname, mode) {
        return new Promise((resolve,reject)=>{
            mkdirp(dirname, mode, function (err) {
                if(err){
                    reject(err)
                }else{
                    resolve(true);
                }
            });
        })
    }
    //异步删除整个目录
    static rmdir(dirname) {
        return new Promise((resolve,reject)=>{
            rimraf(dirname,  function (err) {
                if(err){
                    reject(err)
                }else{
                    resolve(true);
                }
            });
        })
    }
}
module.exports=fs;