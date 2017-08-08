'use strict'
var util = {}
    , obj = require('./object')
    ;
obj.extend(util, obj);
obj.extend(util, require('./datetime'));
obj.extend(util, require('./array'));
obj.extend(util, require('./string'));
obj.extend(util, require('./number'));
obj.extend(util, require('./crypto'));
obj.extend(util, require('./convert'));
util.fs = require('./filesystem');
util.qs = require('querystring');
util.http = require('./http');
util.Promise = require('bluebird');
util.use = function (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    fn(this);
}
module.exports = util;

