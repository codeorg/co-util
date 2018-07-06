import test from 'ava';
import util from '../lib';
test('util.isString(str)',t=>{
    t.is(util.isString(),false);
    t.is(util.isString('dfdsf'),true);
    t.is(util.isString({}),false)
})
test('util.uuid()',t=>{
    let str=util.uuid();
    t.is(util.isString(str),true);
    t.is(str.length,32);
})

test('util.trim()',t=>{
    t.is(util.trim(' fdsfdsf   '),'fdsfdsf');
    t.is(util.trim('ddd ddd '),'ddd ddd')
})
test('util.formatIp(str)',t=>{
    t.is(util.formatIp('ffffff:127.0.0.1'),'127.0.0.1');
    t.is(util.formatIp('127.0.0.1:80'),'127.0.0.1');
    t.is(util.formatIp('百草枯127.0.0.1:80'),'127.0.0.1');
})
test('util.format(f,[param1...])',t=>{
    t.is(util.format('df sf fs dfdddg%sg','在'),'df sf fs dfdddg在g');
    t.is(util.format('%s在在在在%sf f %s',1,2,3),'1在在在在2f f 3')
    t.is(util.format('%s在在在在%sf f %s',1,2),'1在在在在2f f %s')
    t.is(util.format('%s在在在在%sf f %s',1,2),'1在在在在2f f %s')
    t.is(util.format('%s',{a:1}),'{"a":1}')
})

test('util.encodeUrl(obj)',t=>{
    t.is(util.encodeUrl('asdad在'),'asdad%E5%9C%A8');
  
})