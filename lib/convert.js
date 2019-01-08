'use strict'
/**
 * 这是一个类型转换的库
 * 该库是基础库不得只能被引用,
 * 把stream转成string和buffer时异步，
 */
var stream = require('stream');
var Promise = require('bluebird');
var zlib = require('zlib');
var _ = require('lodash');

/**
 * convert object to string.
 * @param {*} value The value to convert
 * @param {string?} encoding. The default value is 'utf8'.
 * @return {string|promise.resolve(string)} it's return Promise when obj is stream,otherwise return string.
 */
exports.toString = function (value, mod) {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (!value) return '';
    //buffer
    if (Buffer.isBuffer(value)) {
        var kMaxLength = 268435440;
        if (value.length > kMaxLength) throw new Error('string type max length:268435440,please use toArray function.');
        return value.toString(mod || 'utf8');
    }
    //如果是stream 则异步转 buffer
    if (exports.isStream(value)) {
        return streamToBuffer(value).then(function (buf) {
            return exports.toString(buf);
        })
    }
    if (Array.isArray(value) || _.isPlainObject(value)) return JSON.stringify(value);
    return value.toString();

}

var bufferToArray = function (buf, mod) {
    var arr = [];
    var len = buf.length;
    var kMaxLength = 268435440;
    //if (kMaxLength >= len) return buf.toString('utf8');
    for (var i = 0; i * kMaxLength <= len; i++) {
        var end = Math.min((i + 1) * kMaxLength, len);
        //console.log('end', end);
        var str = buf.toString(mod || 'utf8', i * kMaxLength, end);
        arr.push(str);
    }
    return arr;
}

var streamToBuffer = function (_stream) {
    return new Promise(function (resolve, reject) {
        var arr = [];
        _stream.on('data', function (data) {
            arr.push(data);
        }).on('end', function () {
            var buf = Buffer.concat(arr);
            resolve(buf);
        }).on('error', function (err) {
            reject(err);
        });
    });
}
/**
 * Checks if `value` is a string.
 * @param {*} value The value to check.
 * @param {string?} encoding.The default value is 'utf8'
 * @return {boolean} 
 */
exports.isStream = function (value) {
    return value instanceof stream.Stream;
}

/**
 * 字符串定义最大256M，如果超过256M的string 请用array
 * Convert `value` to Array.
 * @param {*} value The value to convert
 * @param {string?} mod encoding.The default value is 'utf8'
 * @return {array}  Returns the converted boolean.
 */
exports.toArray = function (value, mod) {
    if (!value) return null;
    //buffer
    if (Buffer.isBuffer(value)) {
        return bufferToArray(value, mod);
    }
    return null;
}
/**
 * Convert `value` to Buffer.
 * @param {*} value The value to convert
 * @param {string?} mod encoding.The default value is 'utf8'
 * @return {buffer}  Returns the converted buffer.
 */
exports.toBuffer = function (value, mod) {
    if (!value) return null;
    //buffer
    if (Buffer.isBuffer(value)) {
        return value;
    }
    //stream ,返回Promise
    if (exports.isStream(value)) {
        return streamToBuffer(value)
    }
    value = exports.toString(value);
    //如果是string，直接返回<Buffer...> 不需要回调 不知道这样好不好
    //if (typeof value == 'string') return Buffer.from(value, mod || 'utf8');
    return Buffer.from(value, mod || 'utf8');
}
/**
 * convert string|buffer to stream
 *  转成 stream
 * @param {*} value the value convert to stream,当不为buffer时的其他类型自动转成string
 * @return {stream}
 */
exports.toStream = function (value) {
    if (exports.isStream(value)) return value;
    if (!Buffer.isBuffer(value)) {
        value = exports.toString(value);
    }
    var s = new stream.Readable();
    s.push(value);
    s.push(null);
    return s;
}

/**
 * Convert `value` to json.
 * @param {string} value The value to convert
 * @return {object}  Returns the converted json(plainObject).
 */
exports.toJson = function (value) {
    //string
    if (typeof value === 'object') return value;
    if (typeof value !== 'string') return null;
    return JSON.parse(value);
}

/**
 * unzip `value` to buffer.
 * @param {stream} obj The value to unzip
 * @return {buffer}  Returns the unzip buffer.
 */
exports.unzip = function (value) {
    var gunzip = zlib.createGunzip();
    if (!value) return Promise.resolve(null);
    //不是stream
    if (!exports.isStream(value)) return Promise.resolve(null);
    value.pipe(gunzip);
    return exports.toBuffer(gunzip);
}
//这些转换在单个件里
// exports.toInt=function(obj){
//     //string
// }

// exports.toNumber=function(obj){
//     //string
// }
// exports.toDate=function(obj){
//     //string
// }