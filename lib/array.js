'use strict'
var _ = require('lodash');


//相关操作----------------------------------------------
//_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
exports.chunk = function (array, num) {
    return _.chunk(array, num);
}

//深度拷贝，数组内部对象重新建立
exports.clone = function (objects) {
    return _.cloneDeep(objects);
}

//删除数组，num为个数，默认为1 
//array=[1,2,3,4,5]
//num=1 return [2,3,4,5]
//num=3 return [4,5]
exports.drop = function (array, num) {
    return _.drop(array, num);
}

//删除数组，从右边开始删除
exports.dropRight = function (array, num) {
    return _.dropRight(array, num);
}

/**
 * 异或，去除相同的，然后去重，所有的比较仅和第一个传参比较
 * 支持[value,object]
 * [1, 2], [1, 2, 3, 4, 5] => [3, 4, 5]
 * @param {...string|number|object}
 * @returns {Array} 返回一个数组
 */
exports.xor = function () {
    var args = [];
    [].push.apply(args, arguments);
    args.push(_.isEqual)
    return _.xorWith.apply(_.xorWith, args)
}

/**
 * 不包含，第一个参数里不包含有之后所有参数的数组
 * 支持[value,object]
 *  [1, 2, 3, 4, 5]，[1, 2, 5]=> [3, 4]
 * @param {...string|number|object}
 * @returns {Array} 返回一个数组
 */
exports.notIn = function () {
    var args = [];
    [].push.apply(args, arguments);
    args.push(_.isEqual)
    return _.differenceWith.apply(_.differenceWith, args)
}

/**
 * 合并数组
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 */
exports.concat = function () {
    var objs = arguments;
    return _.concat.apply(_.concat, objs);
}

/**
 * 去除数组里空值
 * [0, 1, false, 2, '', 3] => [1, 2, 3]
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new compact array.
 */
exports.compact = function (arr) {
    return _.compact(arr);
}

/**
 * 把数组变平
 * @param {Array} array The array to concatenate.
 * @return {Array} Returns the new flatten array.
 *  [1, [2, [3, [4]], 5]]=> [1, 2, [3, [4]], 5]
 */
exports.flatten = function (arr) {
    return _.flatten(arr);
}

/**
 * 遍历集合运算成功数组
 * @param  {array} objects [{a:1},{a:2}]
 * @param  {string|function} key 可以是迭代函数 a
 * @return [1,2]
 */
exports.map = function (objects, key) {
    return _.map(objects, key);
}

/**
 * 去重
 * [{n:1},{n:2},{n:1}] => [{n:1},{n:2}]
 * [1,2,2,3] => [1,2,3]
 * @param  {array} arr [number|object]
 * @return  {array}
 */
exports.uniq = function (arr) {
    if (!arr) return [];
    if (!Array.isArray(arr) || arr.length == 0) return [];
    if (_.isPlainObject(arr[0])) return _.uniqWith(arr, _.isEqual);
    return _.uniq(arr);
}

//返回数组中位置如[1,2,3]找2，return 1;
exports.indexOf = function (arr, value) {
    return _.indexOf(arr, value);
}

//查找对象数组的位置,return int
exports.findIndex = function (objects, obj) {
    return _.findIndex(objects, obj);
}

//[{ 'n': 1 }, { 'n': 2 }]; find {n:2}
//{ 'n': 2 }
//找到一条就返回
exports.findOne = function (objects, obj) {
    return _.find(objects, obj);
}
//[{ 'n': 1 }, { 'n': 2 }]; find {n:2}|[{n:1},{n:2}]
//[{n:1},{n:2}]
//遍历所有行
exports.find = function (objects, cons) {
    if (!Array.isArray(objects)) return [];
    if (!cons || !_.isObject(cons)) return objects;

    if (_.isPlainObject(cons)) {
        return _.filter(objects, cons);
    }
    var arr = [];
    cons = _.uniqWith(cons, _.isEqual);
    cons.forEach(function (c) {
        var _arr = _.filter(objects, c);
        arr = arr.concat(_arr);
    })
    return arr;
}


/**
 * 最大值
 * max([4, 2, 8, 6])=>8
 * max([{a:1},{a:2}],'a')=>{a:2}
 * @param  {array} arr [number|object]
 * @param  {string|function} key? 允许为空
 * @return  {number|object}
 */
exports.max = function (arr, key) {
    return _.maxBy(arr, key);
}

/**
 * 最小值
 * min([4, 2, 8, 6])=>2
 * min([{a:1},{a:2}],'a')=>{a:1}
 * @param  {array} arr [number|object]
 * @param  {string|function} key? 允许为空
 * @return  {number|object}
 */
exports.min = function (arr, key) {
    return _.minBy(arr, key);
}

/**
 * 根据key进行排序，支持纯数组和集合
 * @param  {array} arr [number,number]|[object,object]
 * @param  {string|array} keys?  允许为空可以是'a'|['a',b]
 */
exports.sort = function (arr, keys) {
    return _.sortBy(arr, keys);
}

/**
 * 把集体转化成以key为主键的对象,kv键值对
 * [{id:"key1",b:2},{id:"key2",b:3}]=>{"key1":{id:"key1",b:2},"key2":{id:"key2",b:3}}
 * @param  {array} arr
 * @param  {string|function} key 也可以转入fn
 */
exports.kv = function (arr, key) {
    return _.keyBy(arr, key);
}
