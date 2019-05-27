import test from 'ava';
import util from '../lib'
test('util.isDate(*)',t=>{
    t.is(util.isDate('dfsf'),false);
    t.is(util.isDate('2017-01-02'),true);
    t.is(util.isDate(1547803027944),true)
})


test('util.formatDate()',t=>{
    console.log(util.formatDate(new Date("Fri Jan 18 2019 17:18:48 GMT+0800 (中国标准时间)"),'YYYY-MM-DD'))

    t.is(util.formatDate(new Date("Fri Jan 18 2019 17:18:48 GMT+0800 (中国标准时间)"),'YYYY-MM-DD'),'2019-01-18');
})
test('util.dayTime()',t=>{
    t.is(util.dayTime(new Date("Fri Jan 18 2019 17:18:48 GMT+0800 (中国标准时间)"),1),1547827200000);
})
test('util.addDate()',t=>{
    t.is(util.addDate(new Date("Fri Jan 18 2019 17:18:48 GMT+0800 (中国标准时间)"),'days',1),1547889528000);
})


test('util.addDay()',t=>{
    t.is(util.addDay(new Date("Fri Jan 18 2019 17:18:48 GMT+0800 (中国标准时间)"),1),1547889528000);
})
