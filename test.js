var util = require('./lib/index');
var chai=require('chai');
var assert = chai.assert;
var expect = chai.expect; 

describe('util', function () {
  describe('.toInt()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(100, util.toInt("100.0"));
      //assert.equal(100, util.toInt("100.0"));
      //assert.equal("100", util.toInt("100"));
    });
  });


  describe('http.post()', function () {
    it('http post response object', function () {
     return util.http.post('http://120.26.217.199:3055/web/doc/readFile', { "path": "/https自签名证书.md" })
        .then(function (res) {
          //console.log(res);
          expect(res).to.be.an('object');
          var a = { data: { data: '# https自签名证书生成\n```markup\nmkdir -p server/ client/ all/\n\nopenssl genrsa -out all/ca.key.pem 2048\n\nopenssl req -x509 -new -nodes -key all/ca.key.pem -days 1024 -out all/ca.crt.pem   -subj "/C=CN/ST=CN/L=Provo/O=ACME Signing Authority Inc/CN=*.codeorg.com"\n\nopenssl genrsa -out all/server.key.pem 2048\n\nopenssl req -new -key all/server.key.pem -out all/server.csr.pem -subj "/C=CN/ST=CN/L=Provo/O=ACME Tech Inc/CN=*.codeorg.com"\n\nopenssl x509 -req -in all/server.csr.pem -CA all/ca.crt.pem -CAkey all/ca.key.pem  -CAcreateserial -out all/server.crt.pem -days 500\n\nrsync -a all/server.{key,crt}.pem server/\nrsync -a all/ca.crt.pem server/\nrsync -a all/ca.crt.pem client/\n```\n\nopenssl req -new -key all/server.key.pem -out all/server.csr.pem -subj "/C=CN/ST=CN/L=Provo/O=ACME Tech Inc/CN=119.15.139.192"\n119.15.139.192' } }
          // assert.equal(a, res);
          expect(res).to.deep.equal(a);
          //expect(res).toEqual(a)
          // done();
        })

    });


  });
});



// util.fs=require('./filesystem');
// util.http=require('./http');
// util.http.post('http://120.26.217.199:3055/web/doc/readFile',{"path": "/https自签名证书.md"})
// .then(function(res){
//     console.log(res);
// })


// util.http.post('https://op-dev-137.mobage.cn:8603/play/niudan/cj_log',{"path": "/https自签名证书.md"})
// .then(function(res){
//     console.log(res);
// })

