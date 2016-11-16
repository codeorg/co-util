/**
 * Created by Codeorg.com on 2016/11/14.
 */
"use strict";
let uuid = require('node-uuid');
class Utility{
    constructor(){

    }
    guid(){
        let str = uuid.v4();
        return str;
    }

}
module.exports =new Utility();