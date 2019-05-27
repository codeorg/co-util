'use strict'
var moment = require('moment');

//toDate
exports.toDate = function (value) {
    if (!value) return null;
    if (!moment(value).isValid()) return null;
    return moment(value);
}
//mongo objectid toDate
exports.getTimeByObjectId = function (objectId) {
    if (!objectId) return 0;
    var str = '';
    if (typeof objectId === 'object') {
        str = objectId.toString();
    } else {
        str = objectId;
    }
    if (str.length !== 24) return 0;
    var dt = exports.toDate(parseInt(str.substring(0, 8), 16) * 1000);
    if (!dt) return 0;
    return dt.getTime();
}

//是否日期
exports.isDate = function (value) {
    if (!value) return false;
    return moment(value).isValid();
}
//format YYYY-MM-DD HH:mm:ss
exports.formatDate = function (date, format) {
    date = date || new Date();
    date = exports.toDate(date);
    if (!date) return 'Invalid Date';
    format = format || 'YYYY-MM-DD';
    return moment(date).format(format);
}
//获取距离1970-1-1的ms(以天为单位)
exports.dayTime = function (date, inc) {
    if (!date) date = new Date();
    date = exports.formatDate(date, 'YYYY-MM-DD 00:00:00');
    date = exports.toDate(date);
    if (!date) return 0;
    if (!inc) date.getTime();
    return exports.addDay(date, inc)
}

//增加/减少天数，默认下一天，不保留止hh:mm:ss=00:00:00
exports.setDay = function (date, inc) {
    console.log('co-util warning: the setDay() was deprecated. use the dayTime() instead.');
    return exports.dayTime(date, inc);
    // date = date || new Date();
    // if (!inc) return exports.dayTime(date);
    // return exports.dayTime(exports.addDay(date, inc));
}
//添加日期
exports.addDate = function (date, type, inc) {
    return moment(date).add(inc, type).valueOf();
}

exports.addSecond = function (date, inc) {
    return exports.addDate(date, 'seconds', inc);
}
exports.addMinute = function (date, inc) {
    return exports.addDate(date, 'minutes', inc);
}

exports.addHour = function (date, inc) {
    return exports.addDate(date, 'hours', inc);
}
//只添加天数
exports.addDay = function (date, inc) {
    return exports.addDate(date, 'days', inc);
}
//时差 (之前，现在为基准)
exports.fromNow = function (start) {
    return moment(start).startOf('hour').fromNow();
}
