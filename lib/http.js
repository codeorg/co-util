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

var formatEncode = function (encode) {
    if (!encode) return 'utf8';
    encode = encode.toLowerCase();
    switch (encode) {
        case 'gbk':
            return 'gbk';
        case 'gbk2312':
            return 'gb2312';
        case 'gb2312':
            return 'gb2312';
        default:
            return 'utf8';
    }
}

/**
 * @param  {string} contentType 'text/html;charset=UTF-8'
 * @return  {string} 返回 'utf8'|'gb2312'|'gbk'
 */
var getEncode = function (contentType) {
    if (!contentType) return 'utf8';
    var m = /charset=([0-9a-z-]+)/gi.exec(contentType);
    if (!m || m.length < 2) return 'utf8';
    return formatEncode(m[1]);
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
            // console.log('----res.statusCode', res.statusCode)
            // console.log('----res.headers', formatUrl(res.headers['location'],protocol,opts))
            // console.log('----res.headers', formatUrl(res.headers['location'],protocol,opts))
            if (res.statusCode == 301 || res.statusCode == 302) return resolve('Found. Redirecting to ' +formatUrl(res.headers['location'],protocol,opts));
            if (res.statusCode >= 400) return reject(new Error(res.statusCode));
            var encode = getEncode(res.headers['content-type']);
            res.setEncoding(encode);
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

var formatUrl = function (url,protocol, opts) {
    if (/^http[s]*:\/\/(.*?)/i.test(url)) return url;
    return protocol + '://' + opts.hostname + (opts.port == 80 ? '' : ':' + opts.port) + url
}
/**
 * @param  {stirng} url 网址
 * @return {object} 返回一个object对象，如果url格式不对则返回null
 */
exports.parse = function (url) {
    if (!url) return null;
    if (!/^http[s]*:\/\/(.*?)/i.test(url)) url = 'http://' + url;
    var obj = {};
    url.replace(/^(http[s]*):\/\/(.*?)(:(\d+))?(\/[\w\W]*)*$/i, function (a, b, c, d, e, f) {
        obj.protocol = b.toLowerCase();
        obj.host = c;
        obj.port = e || (b.toLowerCase() == 'https' ? 443 : 80);
        obj.path = f || '/';
    })
    if (!obj.protocol) return null;
    return obj;
}
exports.form = function (url, data) {
    return exports.post(url, data, {'Content-Type': 'application/x-www-form-urlencoded'});
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

/**
 * http get数据
 * @param  {string} url 网址
 * @return {object|string} 如果是json类型则转成json.反之html标签
 */
exports.get = function (url,headers) {
    var obj = exports.parse(url);
    if (!obj) return Promise.reject(new Error('the url failed, url:' + url));
    var options = {
        hostname: obj.host,
        port: obj.port,
        path: obj.path,
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        }
    };
    headers = headers || {};
    ob.extend(options.headers, headers);
    return request(obj.protocol, options, null);
}