'use strict'
var _ = require('lodash');
var uuid = require('uuid');

exports.isString = function (str) {
    if(str===undefined||str===null) return false;
    return typeof str === 'string';
};

exports.uuid = function () {
    return uuid.v4();
}
exports.querystring = function (obj) {
    var arr = []
    for (var key in obj) {
        arr.push(exports.format('%s=%s', key, obj[key] || ''));
    }
    return arr.join('&');
}


//去除两边的空格
exports.trim = function (str) {
    return _.trim(str);
}

//不带端口，return 127.0.0.1
exports.formatIp = function (ip) {
    ip.replace(/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/, function (a, b) {
        ip = b;
        return b;
    })
    return ip;
}

//格式化----------------------------------------------
exports.format = function (f) {
    var formatRegExp = /%[sdj%]/g;
    if (typeof f !== 'string') {
        var objects = [];
        for (var str_i = 0; str_i < arguments.length; str_i++) {

            objects.push(arguments[str_i].toString());
        }
        return objects.join(' ');
    }
    var i = 1;
    var args = [];
    if (Array.isArray(arguments[1]) || (typeof arguments[1] === 'object' && arguments[1].toString().indexOf('Arguments') !== -1)) {
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
                } catch (err) {
                    return '[Circular]';
                }
                //break;
            default:
                return x;
        }
    });
    return str;
};

