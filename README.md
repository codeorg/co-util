# co-util
A collection of utilities for nodejs.
## install
```git
npm i co-util
```
## use
```js
var util=require('co-util');
var num=util.toInt('11.5');//11

util.isJson('') //false
util.isJson('[1,2,3]')//true
//http请求.支持https,支持gzip
let html = await util.http.get(url).catch(err => err);
let html = await util.http.post(url,opts,postData).catch(err => err);
//读取文件
let buffer=await util.fs.readFile(path);
let buffer=await util.fs.readGzip(path);

```
## Functions
```js
    util.isString(str)
    util.uuid()
    util.isObject(value)
    util.isPlainObject(value)
    util.isJson(str)
    util.isNullObj(obj)
    util.isInt(value)
    util.isNumber(value)
    util.querystring(obj)
    util.trim()
    util.formatIp(str)
    util.drop(arr,num)
    util.format(f,[param1...])
    util.extend(obj,[obj2...])
    util.random(start,end)
    util.round(value)
    util.merge(obj,[obj2...])
    util.formatObj(obj)
    util.dropRight(arr,num)
    util.toInt(str)
    util.toNumber(value)
    util.concat(arr1,arr2,arr3,[arr...])
    util.formatMoney(value)
    util.indexOf(array,value)
    util.sortObj(obj)
    util.findIndex(objects,obj)
    util.findOne(objects,obj)
    util.find(objects,cons)
    util.max(array)
    util.maxBy(array,key)
    util.min(array)
    util.toStream(string|buffer)
    util.minBy(array,key)
    util.sort(array)
    util.toBuffer(*)
    util.toString(*)
    util.sort(array)
  ```
