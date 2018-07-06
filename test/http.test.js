/**
 * Created by Administrator on 2018/7/6.
 */
import test from 'ava';
import util from '../lib'

test('util.http.post', async t => {
    let doc = await util.http.post('http://japi.juhe.cn/rank/getRankType?key=myKey');
    t.deepEqual( doc, {
        "error_code": 10001,
        "reason": "无效的key！",
        "result": "myKey"
    });
});
test('util.http.get', async t => {
    let doc = await util.http.get('http://apis.juhe.cn/mobile/get?phone=13429667914&key=myKey');
    t.deepEqual( doc, {
        "resultcode": "101",
        "reason": "错误的请求KEY",
        "result": null,
        "error_code": 10001
    });

});