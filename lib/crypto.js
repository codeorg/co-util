'use strict'
var crypto = require('crypto');
var KEY = 'util.codeorg.com'; //必须16位
var util_obj=require('./object')

exports.hash = function hash(method, input, format) {
    var sum = crypto.createHash(method);
    var isBuffer = Buffer.isBuffer(input);
    if (!isBuffer && typeof input === 'object') {
        input = JSON.stringify(util_obj.sortObj(input));
    }
    sum.update(input, isBuffer ? 'binary' : 'utf8');
    return sum.digest(format || 'hex');
};

exports.md5 = function md5(str, bit) {
    bit = bit || 32;
    var val = exports.hash('md5', str);
    if (bit == 32) return val;
    if (val && val.length == 32) return val.substr(8, 16);
    return "";
}

/**
 * sha1 hash
 *
 * @param {String|Buffer} str
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
exports.sha1 = function (str, format) {
    return exports.hash('sha1', str, format);
};

/**
 * sha256 hash
 *
 * @param {String|Buffer} str
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
exports.sha256 = function (str, format) {
    return exports.hash('sha256', str, format);
};


/**
 * HMAC algorithm.
 *
 * Equal bash:
 *
 * ```bash
 * $ echo -n "$data" | openssl dgst -binary -$algorithm -hmac "$key" | openssl $encoding
 * $ echo -n "$data" | openssl dgst -binary -hex -hmac "$key"
 * ```
 *
 * @param {String} data,content string.
 * @param {String} key, the hmac key.
 * @param {String} algorithm. examples are 'sha1','md5','sha256','sha512',etc.
 * @param {String} encoding default=hex, 'base64'|'hex'
 * @return {String} return string
 */
exports.hmac = function hmac(data, key, algorithm, encoding) {
    algorithm = algorithm || 'md5';
    encoding = encoding || 'hex';
    key = key || KEY;
    var hmac = crypto.createHmac(algorithm, key);
    hmac.update(data, Buffer.isBuffer(data) ? 'binary' : 'utf8');
    return hmac.digest(encoding);
};


/**
 * Base64 encode string.
 *
 * @param {String|Buffer} s
 * @param {Boolean} [urlsafe=false] Encode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} base64 encode format string.
 */
exports.base64Encode = function base64encode(str, urlsafe) {
    if (!Buffer.isBuffer(str)) {
        str = new Buffer(str);
    }
    var encode = str.toString('base64');
    if (urlsafe) {
        encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
    }
    return encode;
};

/**
 * Base64 string decode.
 *
 * @param {String} encode, base64 encoding string.
 * @param {Boolean} [urlsafe=false] Decode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @param {encoding} [encoding=utf8] if encoding = buffer, will return Buffer instance
 * @return {String|Buffer} plain text.
 */
exports.base64Decode = function base64decode(encodeStr, urlsafe, encoding) {
    if (urlsafe) {
        encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
    }
    var buf = new Buffer(encodeStr, 'base64');
    if (encoding === 'buffer') {
        return buf;
    }
    return buf.toString(encoding || 'utf8');
};


/**
 * aes 加密
 * @param  {string} str
 * @param  {string} key length=16
 * @return {string}
 */
exports.aesEncode = function (str, key) {
    //console.log("str",str)
    if (!str) return "";
    key = key || KEY;
    if (key.length < 16) throw Error('the key length can\'t less than 16');
    key = key.slice(-16);
    //key = exports.md5(key, 16);
    //if (key.length > 16)key = key.slice(-16);
    var cipher = crypto.createCipheriv('aes-128-cbc', key, key);
    var crypted = cipher.update(str, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
/**
 * aes解密
 * @param  {string} str
 * @param  {string} key length=16
 * @return {string}
 */
exports.aesDecode = function (str, key) {
    try {
        key = key || KEY;
        if (key.length < 16) throw Error('the key length can\'t less than 16');
        key = key.slice(-16);
        //key = this.md5(key, 16);
        var decipher = crypto.createDecipheriv('aes-128-cbc', key, key)
        var dec = decipher.update(str, 'hex', 'utf8')
        dec += decipher.final('utf8')
        return dec;
    } catch (e) {
        return "";
    }
}

