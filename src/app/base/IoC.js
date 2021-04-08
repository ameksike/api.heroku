/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class IoC {

    constructor(opt = null) {
        this.ctrls = {
            'controller': {},
            'service': {},
            'module': {},
            'model': {}
        }
        this.configure(opt);
    }

    configure(opt) {
        this.opt = opt || {};
    }

    get(opt = {}) {
        opt = opt instanceof Object ? opt : { name: opt };
        opt.name = opt.name || 'DefaultController';
        opt.type = opt.type || 'controller';
        opt.module = opt.module || 'default';
        opt.path = opt.path || opt.type;
        opt.id = opt.id || (opt.type != 'module' ? opt.module + opt.name : opt.name);

        if (!this.ctrls[opt.type][opt.id]) {
            this.ctrls[opt.type][opt.id] = this.instance(opt);
        }

        return this.ctrls[opt.type][opt.id];
    }

    instance(opt) {
        let path = '';
        let file = '';

        switch (opt.type) {
            case 'module':
                path = this.opt.path;
                file = path + opt.name;
                break;

            default:
                path = this.opt.path + '/' + opt.module + '/';
                file = path + opt.path + '/' + opt.name + '.js';
                break;
        }

        const Ctrl = require(file);
        const obj = new Ctrl(opt.param);
        obj.ioc = this;
        return obj;
    }
}
module.exports = IoC;
