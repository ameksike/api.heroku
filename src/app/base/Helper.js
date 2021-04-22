/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class Helper {

    constructor(opt = null) {
        this.opt = { src: {} };
        this.ctrls = {};
        this.configure(opt);
        this.err = null;
    }

    configure(opt) {
        this.opt = opt || this.opt;
    }

    /**
     * @description fill payload
     * @param {string} opt.name [OPTIONAL] DEFAULT['DefaultService']  
     * @param {string} opt.type [OPTIONAL] DEFAULT['instance'] VALUES['module', 'controller', 'service', 'action']
     * @param {string} opt.module [OPTIONAL] DEFAULT['app']  
     * @param {string} opt.dependency [OPTIONAL] DEFAULT[null]  
     * @param {string} opt.options [OPTIONAL] DEFAULT[null]     
     * @param {string} opt.params [OPTIONAL] DEFAULT[null]    
     * @param {string} opt.path [OPTIONAL] DEFAULT[@opt.type]    
     * @param {string} opt.file [OPTIONAL]    
     * @param {string} opt.id [OPTIONAL]    
     * @returns Object
     */
    fill(opt) {
        opt = opt instanceof Object ? opt : (this.opt.src[opt] || { name: opt });
        opt.name = opt.name || 'DefaultService';
        opt.type = opt.type || 'instance';
        opt.module = opt.module || (opt.type === 'module' ? opt.name : 'app');
        opt.path = opt.path || (opt.type === 'module' ? '' : 'service');
        opt.id = opt.id || (opt.type != 'module' ? opt.module + ':' + opt.path + ':' + opt.name : opt.name);
        return opt;
    }

    set(value, opt = {}) {
        opt = this.fill(opt);
        this.ctrls[opt.type]
        this.ctrls[opt.type] = this.ctrls[opt.type] || {};
        this.ctrls[opt.type][opt.id] = value;
    }

    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {string} opt.name [OPTIONAL] DEFAULT['DefaultService']  
     * @param {string} opt.path [OPTIONAL] DEFAULT['service']    
     * @param {string} opt.type [OPTIONAL] DEFAULT['instance'] VALUES['module', 'load', 'instance', 'action', 'raw']
     * @param {string} opt.module [OPTIONAL] DEFAULT['app']  
     * @param {string} opt.dependency [OPTIONAL] DEFAULT[null]  
     * @param {string} opt.options [OPTIONAL] DEFAULT[null]     
     * @param {string} opt.params [OPTIONAL] DEFAULT[null]    
     * @param {string} opt.file [OPTIONAL]    
     * @param {string} opt.id [OPTIONAL]    
     * @returns Object
     */
    get(opt = {}) {
        opt = this.fill(opt);
        if (opt.name === 'helper') {
            return this;
        }
        this.ctrls[opt.type] = this.ctrls[opt.type] || {};
        if (!this.ctrls[opt.type][opt.id]) {
            this.ctrls[opt.type][opt.id] = this.process(opt);
        }
        return this.ctrls[opt.type][opt.id];
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {*} opt 
     * @returns 
     */
    process(opt) {
        let path, out = null;
        switch (opt.type) {
            case 'module':
                opt.file = opt.file || this.opt.path + opt.name;
                out = this.instance(opt);
                break;

            case 'raw':
                out = opt.data;
                break;

            default:
                path = this.opt.path;
                path = opt.module ? path + opt.module + '/' : path;
                path = opt.path ? path + opt.path + '/' : path;

                opt.file = opt.file || this.validPath([
                    path + opt.name + '.js',
                    path + opt.name + '/' + opt.name + '.js',
                    path + opt.name + '/index.js'
                ]);
                out = this[opt.type] ? this[opt.type](opt) : null;
                break;
        }
        return out;
    }

    /**
     * @description get valid path from path list
     * @param {array[string]} list 
     */
    validPath(list) {
        const fs = require('fs');
        for (let i in list) {
            if (fs.existsSync(list[i])) {
                return list[i];
            }
        }
        return false;
    }

    /**
     * @description Factory Pattern load part 
     * @param {*} opt 
     * @returns {Class}
     */
    load(opt) {
        try {
            const Ctrt = require(opt.file);
            return Ctrt[opt.name] || Ctrt;
        }
        catch (error) {
            if (this.err) {
                this.err.on(error);
            }
            return null;
        }
    }

    /**
     * @description Factory Pattern
     * @param {*} opt 
     * @returns 
     */
    instance(opt) {
        try {
            const target = this.load(opt);
            let obj = (target instanceof Function) ? new target(opt.options) : target;
            obj = this.setDI(obj, opt);
            if (obj.init) {
                obj.init();
            }
            return obj;
        }
        catch (error) {
            if (this.err) {
                this.err.on(error);
            }
            return null;
        }
    }

    /**
     * @description excecute action from object
     * @param {*} opt 
     * @returns {Class}
     */
    action(opt) {
        const object = this.instance(opt);
        const action = object[opt.action];
        return (action instanceof Function) ? action.apply(object, opt.params || []) : null;
    }

    /**
     * @description Dependency Injection Pattern (DI)
     * @param {*} obj 
     * @param {*} opt 
     * @returns Object
     */
    setDI(obj, opt) {
        if (!opt && !opt.dependency) {
            return obj;
        }
        for (let i in opt.dependency) {
            obj[i] = this.get(opt.dependency[i]);
        }
        return obj;
    }
}
module.exports = Helper;
