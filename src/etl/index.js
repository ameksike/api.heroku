/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const Module = require(__dirname + '/../app/base/Module.js');
class EtlModule extends Module {

    initConfig() {
        this.routes.push({ route: this.prefix + '/register', controller: 'RegisterController' });
        super.initConfig();
    }

    initRoutesREST(opt) {
        if (opt.controller === 'RegisterController') {
            const _prefix = opt.route;
            const _controller = this.ioc.get({
                name: opt.controller,
                type: 'controller',
                module: this.name,
                param: this.opt
            });

            this.app.get(_prefix + "/fill", (req, res, next) => {
                _controller.fill(req, res, next);
            });
        }

        super.initRoutesREST(opt);
    }
}
module.exports = EtlModule;
