'use strict'
var _ = require('lodash');

/**
 * 两个对象或者数组是否相等
 * @param  {object|number|string} value 
 * @param  {object|number|string} other 
 * @return {boolean}
 */
exports.is = function (value,other) {
    return _.isEqual(value, other);
}

/**
 * 是否object对象，包含数组
 * @param  {*} value the value to check
 * @return {boolean}
 */
exports.isObject = function (value) {
    return _.isObject(value)
}
/**
 * 是否Json对象 ,不包含Array
 * @param  {*} value
 * @return {boolean}
 */
exports.isPlainObject = function (value) {
    return _.isPlainObject(value);
}

/**
 * string是否可以转成json
 * @param  {string} str 必须是字符串
 * @return {boolean}
 */
exports.isJson = function (str) {
    if (!str) return false;
    if (typeof str != 'string') throw new Error('this str is not string type!');
    var strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
    if (!strictJSONReg.test(str)) return false;
    return true;
}
/**
 * 是否为空对象
 * @param  {object} obj
 * @return {boolean} {}=true,{a:1}=false
 */
exports.isNullObj = function (obj) {
    if (!obj) return true;
    if (!exports.isPlainObject(obj)) throw new Error('this obj is not PlainObject');
    if (Object.keys(obj).length == 0) return true;
    return false;
}

/**
 * 扩展对象，不创建新对象
 * 扩展到第一个对象，会改变第一个参数
 * @param  {object} obj 合并到第一个参数上
 * @param  {...object} obj 
 */
exports.extend = function () {
    var objs = arguments;
    return _.assignIn.apply(_.assignIn, objs);
}
/**
 * 合并对象，不改变参数
 * @param  {object} obj 
 * @param  {...object} obj 
 * @return {object} 返回合并后的对象
 */
exports.merge = function () {
    var objs = [];
    [].push.apply(objs, arguments);
    //console.log('objs', objs);
    var o = {};
    objs.unshift(o);
    return exports.extend.apply(exports.extend, objs);
}
/**
 * 对象字段排序，仅对对象进行排序,所有子属性进行排序
 * 不支持数字key
 * @param  {object} obj
 * @return {object} 排序后的对象
 */
exports.sortObj = function (obj) {
    if (!obj || Array.isArray(obj) || typeof obj !== 'object') {
        return obj;
    }
    var o = {};
    var arr = _.sortBy(_.keys(obj));
    _.forEach(arr, function (value) {
        o[value] = exports.sortObj(obj[value]);
    });
    return o;
}

/**
 * 把空对象转成null
 * @param  {object} obj
 * @return {object} 不存在key的返回为null
 */
exports.formatObj = function (obj) {
    if (exports.isNullObj(obj)) return null;
    return obj;
}

