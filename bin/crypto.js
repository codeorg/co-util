/**
 * Created by codeorg.com on 2016/11/15.
 */
"use strict";
var crypto = require('crypto');
var bcrypt=require('bcrypt');

class Crypto {
    constructor(opts) {
        opts=opts||{};
        this.key = opts.key || "codeorg.com";
        this.level = opts.level||5;
    }

    md5(str, bit) {
        let shasum = crypto.createHash('md5');
        shasum.update(str);
        let val = shasum.digest('hex');
        if (bit == 16) {
            if (val && val.length == 32) return val.substr(8, 16);
            return "";
        }
        return val;
    }

    hmac(str, key) {
        if (!key)key = this.key;
        var hmac = crypto.createHmac('md5', key);
        hmac.update(str);
        return hmac.digest('hex');
    }

//加密
    aesEncrypt(str, key) {
        //console.log("str",str)
        if (!str)return "";
        if (!key)key = this.key;
        key=this.md5(key,16);
        //if (key.length > 16)key = key.slice(-16);
        var cipher = crypto.createCipheriv('aes-128-cbc', key, key);
        var crypted = cipher.update(str, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

//解密
    aesDecrypt(str, key) {
        try {
            if (!key)key = this.key;
            key=this.md5(key,16);
            var decipher = crypto.createDecipheriv('aes-128-cbc', key, key)
            var dec = decipher.update(str, 'hex', 'utf8')
            dec += decipher.final('utf8')
            return dec;
        } catch (e) {
            return "";
        }
    }

    //加盐加密
    saltEncrypt(str) {
        return new Promise((resolve, reject)=> {
            bcrypt.genSalt(this.level, (err, salt)=> {
                if (err) {
                    //utility.log('crypto:saltEncrypt(' + str + ')', err);
                    reject(err);
                }
                bcrypt.hash(str, salt, (err, hash)=> {
                    if (err) {
                        //utility.log('crypto:saltEncrypt(' + str + ')', err);
                        reject(err);
                    } else {

                        resolve(this.aesEncrypt(hash))
                    }
                });
            });
        })
    }

    //匹配加盐加密
    saltCompare(src, salted) {
        return new Promise((resolve, reject)=> {
            salted = this.aesDecrypt(salted);
            bcrypt.compare(src, salted,  (err, res)=>{
                if (err) {
                    //utility.log('crypto:saltCompare("' + src + '","' + salted + '")', err);
                    reject(false);
                } else {
                    resolve(res)
                }
            });
        })
    }
}

module.exports=Crypto;

