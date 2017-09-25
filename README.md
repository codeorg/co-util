# co-util
A collection of utilities for nodejs.
## Install
```git
npm i co-util
```
## Usage
```js
const util=require('co-util');
```
## http
```js
//http请求.支持https,支持gzip
let html = await util.http.get(url).catch(err => err);
let html = await util.http.post(url,opts,postData).catch(err => err);
if (html instanceof Error) {
    //出错
}else{
    //To Do...
}
```

## filesystem
```js
util.fs.mkdir(path) //创建文件夹，同时创建上层目录
util.fs.rmrf(path) //删除整个目录包括子目录
util.fs.mv(src, dest) //移动文件
util.fs.ll(path) //获取所有文件和目录 返回 [{fullname:'',filename:'',stat:{}}]
util.fs.exist(path) //文件是否存在
util.fs.readFile(path) //读文件
util.fs.readGzip(path) //读gzip文件
```

## array
```js
util.drop([1, 2, 3, 4, 5]) //[2, 3, 4, 5]
util.dropRight([1, 2, 3, 4, 5]) //[1, 2, 3, 4]
util.concat([1, 2, 3], [2, 3]) //[1, 2, 3, 2, 3]
util.indexOf([1, 2, 3], 2) //1
util.findIndex([{ n: 1 }, { n: 2 }, { n: 3 }], { n: 3 }) //2
util.findOne([{ n: 1, b: 1 }, { n: 1, b: 2 }, { n: 3 }], { n: 1 }) //{ n: 1, b: 1 }
util.find([{ n: 1 }, { n: 2, a: 22 }, { n: 3 }], [{ n: 2 }])  //[{ n: 2, a: 22 }]
util.map([{a:1},{a:2}], 'a') //[1,2]
util.max([1, 2, 3, 4, 5])   //5
util.maxBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'n')  //{ n: 3, c: 1 }
util.min([1, 2, 3, 4, 5]) //1
util.minBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'n') //{ n: 1, a: 2 })
util.sort([5, 4, 3, 2, 1]) //[1, 2, 3, 4, 5]
```



## object
```js
util.isObject(value)
util.isPlainObject(value)
util.isJson(str)
util.isNullObj(obj)
util.extend(obj,[obj2...])
util.merge(obj,[obj2...])
util.formatObj(obj)
util.sortObj(obj)
```

## number
```js
util.isInt(value)
util.isNumber(value)
util.random(start,end)
util.round(value)
util.toInt(str)
util.toNumber(value)
util.formatMoney(value)
```

## datetime
```js
util.toDate(value)
util.isDate(value)
util.getTimeByObjectId(objectId) //把mongo的Object转成datetime
util.formatDate(value)
util.dayTime(date, inc) //保持到00:00:00
util.setDay(date, inc) //弃用，请使用dayTime
util.addDate(date, type, inc)
util.addSecond(date, inc)
util.addMinute(date, inc)
util.addHour(date, inc)
util.addDay(date, inc)
```
