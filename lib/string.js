'use strict'
var _ = require('lodash');
var uuid = require('uuid');
var convert = require('./convert');

exports.isString = function (str) {
    if (str === undefined || str === null) return false;
    return typeof str === 'string';
};

exports.uuid = function () {
    var str = uuid.v4();
    return str.replace(/\-/g, '');
}

//去除两边的空格
exports.trim = function (str) {
    return _.trim(str);
}


//不带端口，return 127.0.0.1
exports.formatIp = function (ip) {
    if (!ip) return '';
    var arr = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.exec(ip);
    if (!arr || arr.length === 0) return '';
    return arr[1];
}

//格式化----------------------------------------------
exports.format = function (f) {
    var formatRegExp = /%[s]/g; //加入g会循环执行
    if (typeof f !== 'string') throw new Error('util.format(f),the f data type must be string.');
    var i = 1;
    var args = [];
    [].push.apply(args, arguments);
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x) {
        if (i >= len) return x;
        return convert.toString(args[i++]);
    });
    return str;
};

exports.querystring=function(obj){
    var arr = []
    for (var key in obj) {
        var value=obj[key]||'';
        if(typeof value=='object') value=JSON.stringify(value)
        value=exports.encodeUrl(value);
        arr.push(exports.format('%s=%s', key, value));
    }
    return arr.join('&');
}

exports.decodeUrl=function(value) {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        return "";
    }
}

exports.encodeUrl=function(value) {
    return encodeURIComponent(value);
}



