import test from 'ava';
import util from '../lib/';

test('util.is(value,other)', t => {
    t.is(util.is({ a: 1 }, { a: 1 }), true);
    t.is(util.is({ b: { b: 2 }, a: 1 }, { a: 1, b: { b: 2 } }), true);
    t.is(util.is({ a: 2 }, { a: 1 }), false);
    t.is(util.is(1, 1), true);
    t.is(util.is("a", "a"), true);
})

test('util.isObject(value)', t => {
    t.is(util.isObject({}), true);
    t.is(util.isObject([1, 2]), true);
    t.is(util.isObject(''), false);
    t.is(util.isObject(), false);
})
test('util.isPlainObject(value)', t => {
    t.is(util.isPlainObject({}), true);
    t.is(util.isPlainObject([1, 2]), false);
    t.is(util.isPlainObject(''), false);
    t.is(util.isPlainObject(), false);
})

test('util.isJson(str)', t => {
    //t.is(util.isJson({}),true);
    //t.is(util.isJson([1,2]),false);
    t.is(util.isJson(''), false);
    t.is(util.isJson(), false);
    t.is(util.isJson('[1,2,3]'), true);
    t.is(util.isJson('{}'), true);
})

test('util.isNullObj(obj)', t => {
    t.is(util.isNullObj({}), true);
    t.is(util.isNullObj({ a: 1 }), false);
    t.is(util.isNullObj(null), true);
})
test('util.extend(obj,[obj2...])', t => {
    let obj = { a: 1 };
    util.extend(obj, { b: 2 });
    t.deepEqual(obj, { a: 1, b: 2 });
    util.extend(obj, { a: 2 }, { c: 3 });
    t.deepEqual(obj, { a: 2, b: 2, c: 3 });
})
test('util.merge(obj,[obj2...])', t => {
    t.deepEqual(util.merge({ a: 1 }, { b: 2 }), { a: 1, b: 2 })
    t.deepEqual(util.merge({ a: 1 }, { b: 2, a: 2 }, { c: 3 }), { a: 2, b: 2, c: 3 })
})

test('util.formatObj(obj)', t => {
    t.is(util.formatObj({}), null);
    t.deepEqual(util.formatObj({ a: 1 }), { a: 1 });
});

test('util.sortObj(obj)', t => {
    t.deepEqual(util.sortObj({ c: 1, b: { c: 1, b: 1, a: { b: 1, a: 1 } }, a: 1 }), {
        a: 1,
        b:
        {
            a: { a: 1, b: 1 },
            b: 1,
            c: 1
        },
        c: 1
    });
})