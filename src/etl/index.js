/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
const Module = require(__dirname + '/../app/base/Module.js');
class EtlModule extends Module {

    initConfig() {
        this.routes.push({ route: this.prefix + '/register', controller: 'RegisterController' });
        this.routes.push({ route: this.prefix + '/login', controller: 'LoginController' });
        super.initConfig();
    }

    initRoutesREST(opt) {
        if (opt.controller === 'RegisterController') {
            const _prefix = opt.route;
            const _controller = this.ioc.get({
                name: opt.controller,
                type: 'controller',
                module: this.name,
                param: {
                    opt: this.opt,
                    dao: this.dao
                }
            });

            this.app.get(_prefix + "/fill", (req, res, next) => {
                _controller.fill(req, res, next);
            });
        }

        super.initRoutesREST(opt);
    }
}
module.exports = EtlModule;
