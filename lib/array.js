'use strict'
var _ = require('lodash');


//相关操作----------------------------------------------
//_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
exports.chunk = function (array, num) {
    return _.chunk(array, num);
}

//深度拷贝，数组内部对象重新建立
exports.clone=function(objects){
    return  _.cloneDeep(objects);
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
 * 把数组变平
 * @param {Array} array The array to concatenate.
 * @returns {Array} Returns the new flatten array.
 *  [1, [2, [3, [4]], 5]]=> [1, 2, [3, [4]], 5]
 */
exports.flatten=function(arr){
    return _.flatten(arr);
}

//[{n:1},{n:2},{n:1}] => [{n:1},{n:2}]
//[1,2,2,3] => [1,2,3]
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

//max([4, 2, 8, 6]);
// => 8
exports.max = function (arr) {
    return _.max(arr);
}

//[{ 'n': 1 }, { 'n': 2 }];
//{ 'n': 2 }
exports.maxBy = function maxBy(objects, key) {
    return _.maxBy(objects, key);
}

//min([4,2,8,6])
//=>2
exports.min = function (arr) {
    return _.min(arr);
}

//[{ 'n': 1 }, { 'n': 2 }];
//{ 'n': 1 }
exports.minBy = function (objects, key) {
    return _.minBy(objects, key);
}
//keys=['id','name']
exports.sort = function (arr, keys) {
    return _.sortBy(arr, keys);
}

