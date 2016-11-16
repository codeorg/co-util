/**
 * Created by Administrator on 2016/3/7.
 */
"use strict";
let qr = require('qrcode');

class Qrcode{
    constructor(){

    }
    getUrl(str){
        return new Promise( (resolve, reject)=> {
            qr.toDataURL(str, (err,dataUrl)=>{
                if(!err){
                    resolve(dataUrl);
                }else {
                    reject(err);
                }
            });
        })
    }
}
module.exports=Qrcode;
