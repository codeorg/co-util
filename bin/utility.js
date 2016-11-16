/**
 * Created by codeorg.com on 2016/11/15.
 */
"use strict";
//const Crypto = require('./Crypto');
let Crypto=require('./crypto');
let uuid = require('node-uuid');
let _ = require('lodash');
let moment=require('moment');
let mkdirp = require('mkdirp');
let rimraf = require('rimraf');

class Utility{
    constructor(){
        this._crypto=new Crypto();
    }
    //类型判断----------------------------------------------
    //整数
    isInt(value) {
        return _.isInteger(value);
    }
    //整数
    isNumber(value) {
        return _.isNumber(value);
    }

    //是否数组
    isArray(value) {
        return _.isArray(value);
    }

    //是否Json对象，包含数组
    isObject(value) {
        _.isObject(value)
    }

    //是否Json对象
    isPlainObject(value) {
        _.isPlainObject(value)
    }

    //是否日期
    isDate(value) {
        if (!value) return false;
        let dt = new Date(value);
        return dt != 'Invalid Date';
    }
    //转化类型----------------------------------------------
    toInt(value) {
        return _.toInteger(value);
    }

    toNumber(value) {
        if (_.isNaN(value)) return 0;
        return _.toNumber(value);
    }

    //格式化----------------------------------------------
    format(f) {
        var formatRegExp = /%[sdj%]/g;
        if (typeof f !== 'string') {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {

                objects.push(arguments[i].toString());
            }
            return objects.join(' ');
        }
        var i = 1;
        var args = [];
        if (this.isArray(arguments[1]) || (typeof arguments[1] === 'object' && arguments[1].toString().indexOf('Arguments') !== -1)) {
            args.push(f);
            [].push.apply(args, arguments[1]);
        } else {
            args = arguments;
        }
        var len = args.length;
        var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
                case '%s':
                    return String(args[i++]);
                case '%d':
                    return Number(args[i++]);
                case '%j':
                    try {
                        return JSON.stringify(args[i++]);
                    } catch (_) {
                        return '[Circular]';
                    }
                default:
                    return x;
            }
        });
        return str;
    };
    formatMoney(obj) {
        obj = this.toNumber(obj);
        return obj.toFixed(2).toString();
    }
    formatDate(date, format) {
        if (!date)date = new Date();
        if (!this.isDate(date)) return 'Invalid Date';
        if (!format)format = 'YYYY-MM-DD'
        return moment(date).format(format);
    }
    formatIp(ip) {
        ip.replace(/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/, function (a, b) {
            ip = b;
        })
        return ip;
    }

    //获取距离1970-1-1的ms(以天为单位)
    dayTime(date) {
        if (!date)date = new Date();
        date = date(date, 'YYYY-MM-DD 00:00:00')
        date = new Date(date);
        return date.getTime();
    }

    //增加/减少天数，默认下一天
    setDay(date, inc) {
        if (!inc) inc = 1;
        if (!date)date = new Date();
        if (typeof date == "string" || typeof date == "number") date = new Date(date);
        return this.dayTime(date.setDate(date.getDate() + inc));
    }
    //相关操作----------------------------------------------
    drop(array, num) {
        return _.drop(array, num);
    }

    dropRight(array, num) {
        return _.dropRight(array, num);
    }

    trim(str) {
        return _.trim(str);
    }


    //扩展对象，不创建新对象
    extend(...objs) {
        if (!objs || objs.length == 0) return;
        let obj = objs[0];
        for (let i = 1; i < objs.length; i++) {
            _.assignIn(obj, objs[i]);
        }
        return obj;
    }

    //合并并且创建新对象
    assignIn(...objs) {
        let o = {};
        _.assignIn(o, objs[0]);
        objs[0] = o;
        return this.extend.apply(this, objs);
    }

    //合并
    concat(...objs) {
        return _.concat.apply(this, objs);
    }



    // 文件操作----------------------------------------------
    // 异步创建目录
    mkdir(dirname, mode) {
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
    rmdir(dirname) {
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

    //加密----------------------------------------------
    md5(str) {
        return this._crypto.md5(str);
    }

    hmac(str, key) {
        return this._crypto.hmac(str, key);
    }

    aesEncrypt(str, key) {
        return this._crypto.aesEncrypt(str, key);
    }


    aesDecrypt(str, key) {
        return this._crypto.aesDecrypt(str, key);
    }

    saltEncrypt(str) {
        return this._crypto.saltEncrypt(str);
    }

    saltCompare(str, salted) {
        return this._crypto.saltCompare(str, salted);
    }



    //ctx 相关----------------------------------------------
    querystring(obj) {
        let arr = []
        for (let key in obj) {
            arr.push(this.format('%s=%s', key, obj[key]));
        }
        return arr.join('&');
    }

    body(data) {
        return {data: data};
    }

    err(code) {
        var arr = [];
        if (arguments && arguments.length > 1) {
            for (var i = 0, len = arguments.length; i < len; i++) {
                if (i > 0) arr.push(arguments[i]);
            }
        }
        code = (typeof code !== "string") ? code.toString() : code;
        var errMsg = errs[code.toString()];
        errMsg = !errMsg ? "该错误编码是不存在" : errMsg;
        return {
            err: code,
            msg: this.format(errMsg, arr)
        };
    }
    guid(){
        let str = uuid.v4();
        return str;
    }

}
module.exports =new Utility();