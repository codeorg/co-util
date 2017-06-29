'use strict'
var _ = require('lodash');

//整数，判断数据类型
//value='11' retutn false
//value=11 return true
exports.isInt = function (value) {
    //console.log(isNumber(111));
    return _.isInteger(value);
}
//是否是数字
//value='11' return false
//value=11 return true
exports.isNumber = function (value) {
    return _.isNumber(value);
}

//随机
exports.random = function (start, end) {
    return _.random(start, end)
}
//四舍5入
//     _.round(4.006);
//  => 4
//
//     _.round(4.006, 2);
//  => 4.01
//
//     _.round(4060, -2);
//  => 4100
exports.round = function (number, precision) {
    return _.round(number, precision);
}

//转化类型----------------------------------------------
exports.toInt = function (value) {
    if (!value) return 0;
    var val = _.toInteger(value);
    if (_.isNaN(val)) return 0;
    return val;
}

exports.toNumber = function (value) {
    if (!value) return 0;
    var val = _.toNumber(value);
    if (_.isNaN(val)) return 0;
    return val;
}

//格式化货币，转字符串
exports.formatMoney = function (obj) {
    obj = exports.toNumber(obj);
    return obj.toFixed(2).toString();  
}
