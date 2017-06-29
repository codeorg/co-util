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
