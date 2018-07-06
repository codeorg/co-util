'use strict'
var qs = require('querystring');
var util = function () {
};
var obj = require('./object');
//js intellisense for editor
// module.exports = obj;
// obj.extend(util, module.exports);
// module.exports = require('./datetime');
// obj.extend(util, module.exports);
// module.exports = require('./array');
// obj.extend(util, module.exports);
// module.exports = require('./string');
// obj.extend(util, module.exports);
// module.exports = require('./number');
// obj.extend(util, module.exports);
// module.exports = require('./crypto');
// obj.extend(util, module.exports);
// module.exports = require('./convert');
// obj.extend(util, module.exports);

obj.extend(util,
    obj,
    require('./datetime'),
    require('./array'),
    require('./string'),
    require('./number'),
    require('./crypto'),
    require('./convert')
);

util.fs = require('./filesystem');
util.qs = require('querystring');
util.http = require('./http');
util.Promise = require('bluebird');

util.use = function (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    fn(this);
}

/**
 * 获取签名
 * @param  {object} obj
 * @param  {string} key
 */
util.sign = function (obj, key) {
    var o = util.sortObj(obj);
    var str = util.querystring(o);
    return util.hmac(str, key);
}

module.exports = util;



