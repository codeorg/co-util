/**
 * Created by Administrator on 2018/7/6.
 */
import test from 'ava';
import util from '../lib'

test('util.http.post', async t => {
    let doc = await util.http.post('https://api.weixin.qq.com/sns/oauth2/access_token');
    t.deepEqual( doc.errcode, 41002);
});
test('util.http.get', async t => {
    let doc = await util.http.get('https://api.weixin.qq.com/sns/oauth2/access_token');
    t.deepEqual( doc.errcode, 41002);

});