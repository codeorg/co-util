'use strict'
var http = require('http');
var https = require('https');
var qs = require('querystring');
var zlib = require('zlib');
var ob = require('./object');
var Promise = require('bluebird');

var getStream = function (res) {
    switch (res.headers['content-encoding']) {
        case 'gzip':
            var gzip = zlib.createGunzip();
            res.pipe(gzip);
            return gzip;
        case 'deflate':
            var deflate = zlib.createInflate();
            res.pipe(deflate);
            return deflate;
        default:
            return res;
    }
}
/**
 * @param  {string} protocol 协议，http|https
 * @param  {object} opts 请求选项
 * @param  {object} postData 提交数据
 */
var request = function (protocol, opts, postData) {
    var httpProvider = protocol === 'https' ? https : http;
    return new Promise(function (resolve, reject) {
        var req = httpProvider.request(opts, function (res) {
            var stream = getStream(res);
            var str = '';
            stream.on('data', function (chunk) {
                str += chunk;
            });
            stream.on('end', function () {
                if (!str) return resolve('');
                try {
                    if (ob.isJson(str)) {
                        var obj = JSON.parse(str);
                        resolve(obj);
                    } else {
                        resolve(str);
                    }
                } catch (e) {
                    resolve(str);
                }
            });
        });

        req.on('error', function (e) {
            reject(e);
        });
        if (postData) req.write(postData);
        req.end();
    })
}
/**
 * @param  {stirng} url 网址
 * @return {object} 返回一个object对象，如果url格式不对则返回null
 */
exports.parse = function (url) {
    var obj = {};
    url.replace(/^(http[s]*):\/\/(.*?)(:(\d+))?(\/[\w\W]*)*$/, function (a, b, c, d, e, f) {
        obj.protocol = b.toLowerCase();
        obj.host = c;
        obj.port = e || (b.toLowerCase() == 'https' ? 443 : 80);
        obj.path = f || '/';
    })
    if (!obj.protocol) return null;
    return obj;
}
/**
 * http post提交数数
 * @param  {string} url 网址
 * @param  {object} data 提交参数
 * @param  {stirng} contentType 默认为application/json
 * @return {object|string} 如果是json类型则转成json.反之html标签
 */
exports.post = function (url, data, headers) {
    var obj = exports.parse(url);
    if (!obj) return Promise.reject(new Error('the url failed, url:' + url));
    data = data || {};
    headers = headers || {};
    var postData;
    var options = {
        hostname: obj.host,
        port: obj.port,
        path: obj.path,
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        }
    };
    ob.extend(options.headers, headers);
    if (options.headers['Content-Type'].indexOf('x-www-form-urlencoded') != -1) {
        postData = qs.stringify(data);//node 5以下版本 hasOwnProperty 方法不存在
    } else {
        postData = JSON.stringify(data);
    }
    options.headers['Content-Length'] = Buffer.byteLength(postData);
    return request(obj.protocol, options, postData);
}
exports.form = function (url, data) {
    return exports.post(url, data, {'Content-Type': 'application/x-www-form-urlencoded'});
}
/**
 * http get数据
 * @param  {string} url 网址
 * @return {object|string} 如果是json类型则转成json.反之html标签
 */
exports.get = function (url) {
    var obj = exports.parse(url);
    if (!obj) return Promise.reject(new Error('the url failed, url:' + url));
    var options = {
        hostname: obj.host,
        port: obj.port,
        path: obj.path,
        method: 'GET'
    };
    return request(obj.protocol, options, null);
}