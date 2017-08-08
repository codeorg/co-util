import test from 'ava';
import util from '../lib';
import fs from 'fs';
import path from 'path';

test('util.toString(*)', async t => {
    t.is(util.toString([1, 2, 3, 4, 5]), '[1,2,3,4,5]');
    t.is(util.toString({ a: 1 }), '{"a":1}');
    t.is(util.toString(1), '1');
    var str = 'tdsdgdd';
    t.is(util.toString(Buffer.from(str)), str);
    var stream = fs.createReadStream(path.join(__dirname, 'txt.txt'));
    var txt = await util.toString(stream);
    t.is(txt, 'aaaaa');
});

test('util.toBuffer(*)', async t => {
    t.deepEqual(await util.toBuffer('fsdfdsf'), Buffer.from('fsdfdsf'));
    var stream = fs.createReadStream(path.join(__dirname, 'txt.txt'));
    t.deepEqual(await util.toBuffer(stream), Buffer.from('aaaaa'));

});

test('util.toStream(string|buffer)', async t => {
    t.is(await util.toString((util.toStream('aaaaa'))), 'aaaaa');
    t.is(await util.toString((util.toStream(Buffer.from('fsdfdsf1')))), 'fsdfdsf1');
});


test('util.qs.stringify(object)', t => {
    t.is(util.qs.stringify({a:1,b:2}), 'a=1&b=2');
});

test('util.qs.parse(string)', t => {
    t.deepEqual(util.qs.parse('a=1&b=2'), {a:"1",b:"2"});
});