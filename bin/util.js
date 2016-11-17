/**
 * Created by codeorg.com on 2016/11/15.
 */
"use strict";
//const Crypto = require('./Crypto');
const Crypto=require('./crypto');
const Log=require('./log');
const fs=require('./fs');
const uuid = require('node-uuid');
const _ = require('lodash');
const moment=require('moment');


class Utility{
    constructor(opts){
        this._opts=opts;
        this.version='0.1.6'
        this._crypto=new Crypto();
        this._log=new Log({path:this._opts.log.path});
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

    isNullObj(obj) {
        if (!obj) return true;
        if (typeof obj === 'object') {
            for (var key in obj) {
                return false;
            }
            return true;
        }
        return false;
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

    formatObj(obj) {
        if (this.isNullObj(obj)) return null;
        return obj;
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
    //扩展到第一个对象
    extend(...objs) {
        return _.assignIn.apply(this,objs);
    }

    //合并并且创建新对象
    concatObj(...objs) {
        objs=objs||[];
        let o = {};
        objs.unshift(o);
        return this.extend(...objs);
    }

    /**
     * 合并数组
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    concatArr(...objs) {
        return _.concat.apply(this, objs);
    }

    random(start, end) {
        return _.random(start, end)
    }

    indexOf(arr, value) {
        return _.indexOf(arr, value);
    }

    findIndex(arr, obj) {
        return _.findIndex(arr, obj);
    }

    find(arr, obj) {
        return _.find(arr, obj);
    }
    // 文件操作----------------------------------------------
    // 异步创建目录
    mkdir(dirname, mode) {
        return fs.mkdir(dirname, mode);
    }
    //异步删除整个目录
    rmdir(dirname) {
        return fs.rmdir(dirname);
    }

    //ctx 相关----------------------------------------------
    querystring(obj) {
        let arr = []
        for (let key in obj) {
            arr.push(this.format('%s=%s', key, obj[key]));
        }
        return arr.join('&');
    }

    //对象排序
    sort(obj) {
        if (_.isArray(obj)) return _.sortBy(obj);
        let o = {};
        var arr = _.sortBy(_.keys(obj));
        _.forEach(arr, function (value) {
            o[value] = obj[value];
        });
        return o
    }

    //获取签名
    sign(obj,key){
        let o=this.sort(obj);
        let str=this.querystring(o);
        return this.hmac(str,key);
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
        //code = (typeof code !== "string") ? code.toString() : code;
        var formatMsg = this._opts.errs[code.toString()];
        formatMsg = !formatMsg ? "该错误编码是不存在" : formatMsg;
        return {
            err: code,
            msg: this.format(formatMsg, arr)
        };
    }
    guid(){
        let str = uuid.v4();
        return this.md5(str);
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
    //日志
    log(...args){
        this._log.error(...args);
    }
}

module.exports =Utility;