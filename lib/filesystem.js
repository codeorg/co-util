/**
 * Created by codeorg on 2016/11/17.
 */
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var fs = require('fs');
var Promise = require('bluebird');
var path = require('path');
var convert = require('./convert');

// 文件操作----------------------------------------------
/**
 * 异步创建目录
 * new directory
 * @param {string} directory
 * @return {boolean} create status
 */
exports.mkdir = function (path, mode) {
    return new Promise(function (resolve, reject) {
        mkdirp(path, mode, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true);
            }
        });
    })
}
/**
 * 异步删除整个目录
 * remove all directorys include all sub directorys
 * @param {string} directory
 * @return {boolean} remove status
 */
exports.rmrf = function (path) {
    return new Promise(function (resolve, reject) {
        rimraf(path, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true);
            }
        });
    })
}
/**
 * 获取所有文件和目录
 * get all files and directorys.
 * @param {string} directory
 * @return {array} [{fullname:'',filename:'',stat:{}}]
 */
exports.ll = function (dir,root) {
    root=root||dir;
    return new Promise(function (resolve, reject) {
        var arr = [];
        fs.readdir(dir, function (err, files) {
            if (err) {
                resolve(arr);
            }
            else {
                var arrPms = [];
                files.forEach(function (file) {
                    var fullname = path.join(dir, file);
                    var item = {
                        fullname: fullname,
                        filename: file,
                        path: fullname.replace(root,'').replace(/\\/g,'/')
                    }
                    arrPms.push(exports.stat(fullname).then(function (stat) {
                            //item.stat = stat;
                            if (stat.isDirectory()) {
                                item.isDir = true;
                                return exports.ll(fullname,root).then(function (files) {
                                    item.childs = files
                                    arr.push(item);
                                });
                            } else {
                                item.isDir = false;
                                item.childs = [];
                                arr.push(item);
                                return;
                            }
                        })
                    )
                });
                Promise.all(arrPms).then(function () {
                    resolve(arr);
                })
            }
        })
    })
}
/**
 * 获取文件状态
 * get file state
 * @param {string} file path
 * @return {object} return a file state object
 */
exports.stat = function (path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, function (err, stat) {
            if (err) {
                reject(err);
            } else {
                //stat.isDirectory()
                resolve(stat);
            }
        })
    })
}

/**
 * 移动文件
 * move file to new path
 * @param {string} src file path
 * @param {string} dest file path
 * @return {boolean} move status
 */
exports.mv = function (src, dest) {
    if (!src) throw new Error('src path is not empty');
    if (!dest) throw new Error('dest path is not empty');
    dest = path.normalize(dest);
    var dirname = path.dirname(dest);
    exports.mkdir(dirname);
    return fs.rename(src, dest, function (err) {
        if (err) return Promise.resolve(false);
        return Promise.resolve(true)
    });
}
/**
 * check file exist
 * @param {string} file path
 * @return {boolean}
 */
exports.exist = function (file) {
    return exports.stat(file).then(function (res) {
        return true;
    }).catch(function (err) {
        return false;
    });
}

/**
 * read file to buffer
 * @param {string} file path
 * @param {object|string} encoding ,the default value is null
 * @return {buffer} return buffer
 */
exports.readFile = function (path, options) {
    //mod=mod||'binary';
    return new Promise(function (resolve, reject) {
        fs.readFile(path, options, function (err, file) {
            if (err) return reject(err);
            resolve(file);
        })
    })
}
/**
 * read gzip file to buffer.
 * @param {string} gzip file path
 * @return {buffer} return buffer
 */
exports.readGzip = function (path) {
    return exports.exist(path).then(function (status) {
        if (status) {
            var stream = fs.createReadStream(path);
            return convert.unzip(stream);
        } else {
            return new Error('no such file or directory, open:' + path);
        }
    })
}

exports.writeFile = function (file, data, options) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(file, data, options, function (err) {
            if (err) return reject(err);
            resolve(true);
        })
    })
}