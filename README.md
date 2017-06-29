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
let html = await util.http.get('http://www.gzplan.gov.cn/sofpro/bmyyqt/fgw/zmhd/zmhdview.jsp?id=15877', opts, 'x-www-form-urlencoded').catch(err => err);
//返回html代码
let buffer=await util.fs.readGzip(path);

```
