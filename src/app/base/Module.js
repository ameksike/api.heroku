/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class Module {

    constructor(payload) {
        this.app = payload.app;
        this.opt = payload.opt;

        this.name = this.opt.name;
        this.prefix = "/" + this.name;
        this.routes = [];
    }

    init() {
        this.initConfig();
        this.initRoutes();
    }

    initConfig() {
        this.routes.push({ route: this.prefix, controller: 'DefaultController', path: 'controller' });
    }

    initRoutes() {
        for (const i in this.routes) {
            this.initRoutesREST(this.routes[i]);
        }
    }

    initRoutesREST(opt) {
        const _prefix = opt.route;
        const _controller = this.ioc.get({
            name: opt.controller,
            type: 'controller',
            module: this.name,
            param: this.opt
        });

        this.app.get(_prefix, (req, res, next) => {
            _controller.list(req, res, next);
        });
        this.app.get(_prefix + "/:id", (req, res, next) => {
            _controller.select(req, res, next);
        });
        this.app.post(_prefix, (req, res, next) => {
            _controller.insert(req, res, next);
        });
        this.app.put(_prefix + "/:id", (req, res, next) => {
            _controller.update(req, res, next);
        });
        this.app.patch(_prefix + "/:id", (req, res, next) => {
            _controller.update(req, res, next);
        });
        this.app.delete(_prefix + "/:id", (req, res, next) => {
            _controller.delete(req, res, next);
        });
    }
}
module.exports = Module;