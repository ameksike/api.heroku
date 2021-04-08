/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const express = require("express");
const cors = require('cors');
const ErrorHandler = require(__dirname + '/ErrorHandler.js');
const IoC = require(__dirname + '/IoC.js');

class App {

    constructor(path) {
        this.path = path;
        this.app = express();
        this.mod = [];
        this.cfg = {};
        this.err = new ErrorHandler();
        this.ioc = new IoC();
    }

    init() {
        this.loadConfig();
        this.initApp();
        this.loadModules();
        return this;
    }

    run() {
        const port = process.env.PORT || this.cfg.srv.port;
        return this.app.listen(port, () => {
            if (this.cfg.srv.log === 1) {
                console.log(
                    ">>> SERVER: " +
                    this.cfg.srv.protocol + "://" + this.cfg.srv.host + ":" + port
                );
                this.logRoutes();
            }
        });
    }

    loadConfig() {
        const envid = process.env.NODE_ENV || 'production';
        const option = require(this.path + 'cfg/config.json') || {};
        this.cfg = option.env[envid] || { srv: { module: {} }};
        this.cfg.env = envid;
        this.cfg.srv.module.path = this.path + 'src/';
        this.ioc.configure({ path: this.cfg.srv.module.path });
    }

    loadModules() {

        if (this.cfg.srv.module && this.cfg.srv.module.load) {
            this.cfg.srv.module.load.forEach(name => {
                const obj = this.ioc.get({
                    name,
                    type: 'module',
                    param: {
                        app: this.app,
                        opt: {
                            'cfg': this.cfg.app,
                            'prj': this.path,
                            'mod': this.cfg.srv.module.path + name + "/",
                            'app': this.cfg.srv.module.path + "app/",
                            'name': name
                        }
                    }
                });

                if (obj) {
                    obj.init();
                }
            });
        }

        if (this.cfg.srv.route) {
            for(const i in this.cfg.srv.route){
                const route = this.cfg.srv.route[i];
                this.app[route.method](i, (req, res) => {
                    const controller = this.ioc.get(route);
                    controller[route.action](req, res);
                });
            }
        }

        this.app.get('*', (req, res) => {
            console.log(`>>! ${req.method} : ${req.path} `);
            res.end('');
        });
    }

    initApp() {
        //... Set Error Handler
        this.app.use(this.err.on);

        //... Allow all origin request, CORS on ExpressJS
        this.app.use(cors());

        //... Log requests 
        this.app.use((req, res, next) => {
            console.log(`>>> ${req.method} : ${req.path} `);
            return next();
        })
    }

    logRoutes() {
        function print(path, layer) {
            if (layer.route) {
                layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
            } else if (layer.name === 'router' && layer.handle.stack) {
                layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
            } else if (layer.method) {
                console.log('%s /%s',
                    layer.method.toUpperCase(),
                    path.concat(split(layer.regexp)).filter(Boolean).join('/'))
            }
        }

        function split(thing) {
            if (typeof thing === 'string') {
                return thing.split('/')
            } else if (thing.fast_slash) {
                return ''
            } else {
                var match = thing.toString()
                    .replace('\\/?', '')
                    .replace('(?=\\/|$)', '$')
                    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
                return match
                    ? match[1].replace(/\\(.)/g, '$1').split('/')
                    : '<complex:' + thing.toString() + '>'
            }
        }

        this.app._router.stack.forEach(print.bind(null, []))
    }
}

module.exports = App;