import test from 'ava';
import util from '../lib';

test('util.isInt(value)', t => {
    t.deepEqual(util.isInt(11.1), false);
    t.deepEqual(util.isInt('11.22'), false);
    t.deepEqual(util.isInt(11), true);
    t.deepEqual(util.isInt('3333'), false);
    t.deepEqual(util.isInt(), false);
})

test('util.isNumber(value)', t => {
    t.deepEqual(util.isNumber(11.1), true);
    t.deepEqual(util.isNumber('11.22'), false);
    t.deepEqual(util.isNumber(11), true);
    t.deepEqual(util.isNumber('3333'), false);
    t.deepEqual(util.isNumber(), false);
})

test('util.random(start,end)', t => {
    var rnd = util.random(1000, 10000);
    t.true(rnd >= 1000);
    t.true(rnd <= 10000);
})

test('util.round(value)', t => {
   t.is(util.round(0.5) , 1);
   t.is(util.round(10.4) , 10);

})

test('util.toInt(str)', t => {
    t.deepEqual(util.toInt(10.11), 10);
    t.deepEqual(util.toInt('10.11'), 10);
    t.deepEqual(util.toInt('dss10.11'), 0);
    t.deepEqual(util.toInt({}), 0);
    t.deepEqual(util.toInt(), 0);
})

test('util.toNumber(value)', t => {
   t.is(util.toNumber('10.11') , 10.11);
   t.is(util.toNumber(10.11) , 10.11);
   t.is(util.toNumber('aaaa10.11') , 0);
   t.is(util.toNumber() , 0);
   t.is(util.toNumber({}) , 0);
})

test('util.formatMoney(value)', t => {
    t.is(util.formatMoney(99999.11111) , '99999.11');
    t.is(util.formatMoney('55') , '55.00');
    t.is(util.formatMoney('55.99999') , '56.00');
    t.is(util.formatMoney('55.11911') , '55.12');
    
})

