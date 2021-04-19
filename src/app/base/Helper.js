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
        this.ctrls = {
            'controller': {},
            'service': {},
            'module': {},
            'model': {}
        }
        this.configure(opt);
        this.err = null;
    }

    configure(opt) {
        this.opt = opt || this.opt;
    }

    get(opt = {}) {
        opt = opt instanceof Object ? opt : (this.opt.src[opt] || { name: opt });
        opt.name = opt.name || 'DefaultService';
        opt.type = opt.type || 'service';
        opt.module = opt.module || (opt.type === 'module' ? opt.name : 'app');
        opt.path = opt.path || opt.type;
        opt.id = opt.id || (opt.type != 'module' ? opt.module + opt.name : opt.name);

        this.ctrls[opt.type] = this.ctrls[opt.type] || {};
        if (!this.ctrls[opt.type][opt.id]) {
            this.ctrls[opt.type][opt.id] = this.process(opt);
        }

        return this.ctrls[opt.type][opt.id];
    }

    process(opt) {
        let path = '';
        let file = '';
        let out = null;

        switch (opt.type) {
            case 'module':
                path = this.opt.path;
                opt.file = path + opt.name;
                out = this.instance(opt);
                break;

            case 'action':
                path = this.opt.path + '/' + opt.module + '/';
                opt.file = path + opt.path + '/' + opt.name + '.js';
                out = this.instance(opt);
                out = out[opt.action].apply(out, opt.params || []);
                break;

            default:
                path = this.opt.path + '/' + opt.module + '/';
                opt.file = path + opt.path + '/' + opt.name + '.js';
                out = this.instance(opt);
                break;
        }
        return out;
    }

    instance(opt) {
        try {
            const Ctrt = require(opt.file);
            const Ctrl = Ctrt[opt.name] || Ctrt;
            const obj = new Ctrl(opt.param);
            obj.helper = this;
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
}
module.exports = Helper;
