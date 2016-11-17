/**
 * Created by Administrator on 2016/11/17.
 */

/**
 * Created by Administrator on 2016/11/17.
 */
const fs=require('./fs');
const log4js = require('log4js');
class Log{
    constructor(opts){
        let path=opts.path;
        fs.mkdir(path);
        log4js.configure({
            appenders: [
                {type: 'console'},
                {
                    type: "dateFile",
                    filename: path,
                    pattern: "yyyy-MM-dd.log",
                    alwaysIncludePattern: true,
                    category: 'log'
                }
            ]
        });
    }
    /**
     * error(@param1,@param2,@param3...)写日志
     * @param {String|Objecy} str|err 可以是String也可以Error对象，当为Error对象输出Error.stack，
     * @api public
     */
    error() {
        var arr = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            let arg = arguments[i];
            if (typeof arg == "object") {
                arr.push(arg.stack)
            } else {
                arr.push(arg)
            }
        }
        if (arr.length == 0) return;
        let str = arr.join("\n    ");
        let logger = log4js.getLogger('log');
        let level = 'error';
        logger.setLevel(level.toUpperCase());
        // if(level=='error') return logger.error(str);
        // if(level=='info') return logger.info(str);
        // if(level=='warn') return logger.warn(str);
        logger.error(str);
    }
}

module.exports=Log;