/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @dependencies express cors dotenv Helper
 * */
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

const ErrorHandler = require('./ErrorHandler.js');
const Logger = require('./Logger.js');
const KsDp = require('ksdp');

class AppWEB {

    constructor(path) {
        this.option = { app: {}, srv: {} };
        this.path = path;
        this.web = express();
        this.mod = [];
        this.cfg = {};

        this.error = new ErrorHandler();
        this.helper = new KsDp.integration.IoC();
        this.logger = new Logger();
    }

    init() {
        try {
            this.initConfig();
            this.initApp();
            this.initModels();
            this.initModules();
            this.initRoutes();
        } catch (error) {
            if (this.error) {
                this.error.on(error);
            }
        }
        return this;
    }

    run() {
        return this.web.listen(this.cfg.srv.port, () => {
            this.logger.log(`>>> SERVER: ${this.cfg.srv.protocol}://${this.cfg.srv.host}:${this.cfg.srv.port}`);
            if (this.cfg.srv.log === 1) {
                this.logRoutes();
            }
        });
    }

    stop() {
        if (this.dao) {
            this.dao.disconnect();
        }
        if (this.web) {
            this.web.close();
        }
    }

    initConfig() {
        dotenv.config();
        const envid = process.env.NODE_ENV || 'development';
        const app = require(this.path + 'cfg/config.json') || {};
        const srv = require(this.path + 'cfg/core.json') || {};

        this.cfg.env = process.env;
        this.cfg.envid = envid;
        this.cfg.app = app[envid] || {};
        this.cfg.srv = srv[envid] || {};

        this.cfg.srv.module = this.cfg.srv.module || {};
        this.cfg.srv.module.path = this.path + 'src/';
        this.cfg.srv.log = this.cfg.env.LOGGER_DB === 'true' ? 1 : this.cfg.srv.log;
        this.cfg.srv.port = this.cfg.env.PORT || this.cfg.srv.port;

        this.cfg.app.url = this.cfg.env.DATABASE_URL;
        this.cfg.app.logging = this.cfg.srv.log > 0;
        this.error.configure({ level: this.cfg.srv.log });
        this.logger.configure({ level: this.cfg.srv.log });
        this.helper.configure({ 
            path: this.cfg.srv.module.path, 
            src: this.cfg.srv.helper, 
            error: this.error,
            name: 'helper' 
        });
        this.helper.set(this.logger, { name: 'logger', type: 'instance', module: 'app' });
        this.helper.set(this.error, { name: 'error', type: 'instance', module: 'app' });
    }

    initApp() {
        //... Set Error Handler
        this.web.use((err, req, res, next) => {
            this.error.on(err, req, res, next);
        });

        //... Allow all origin request, CORS on ExpressJS
        this.web.use(cors());

        //... Allow body Parser
        this.web.use(express.json());
        this.web.use(express.urlencoded());
        //this.web.use(express.multipart());

        //... Log requests 
        this.web.use((req, res, next) => {
            this.logger.log(`>>> ${req.method} : ${req.path} `);
            return next();
        })
    }

    initModels() {
        this.dao = this.helper.get('dao');
        if (this.dao) {
            this.dao.configure(this.cfg.app);
            this.dao.connect();
            this.dao.load(this.path + 'db/models/');
        }
    }

    initModules() {
        if (this.cfg.srv.module && this.cfg.srv.module.load) {
            this.cfg.srv.module.load.forEach(name => {
                const obj = this.helper.get({
                    name,
                    type: 'module',
                    options: {
                        // ... EXPRESS APP
                        app: this.web,
                        // ... DATA ACCESS OBJECT 
                        dao: this.dao,
                        opt: {
                            // ... CONFIGURE 
                            'cfg': this.cfg.app,
                            // ... ENV
                            'env': this.cfg.env,
                            'envid': this.cfg.envid,
                            // ... PATH
                            'prj': this.path,
                            'mod': this.cfg.srv.module.path + name + "/",
                            'app': this.cfg.srv.module.path + "app/",
                            // ... NAME
                            'name': name
                        }
                    },
                    dependency: { 'helper': 'helper', 'dao': 'dao' }
                });

                if (obj && this.dao) {
                    this.dao.load(this.cfg.srv.module.path + name + "/model/");
                }
            });
        }
    }

    initRoutes() {
        if (this.cfg.srv.route) {
            for (const i in this.cfg.srv.route) {
                const route = this.cfg.srv.route[i];
                if (this.web[route.method]) {
                    this.web[route.method](i, (req, res) => {
                        route.path = route.path || 'controller';
                        route.name = route.name || route.controller;
                        const controller = this.helper.get(route);
                        if (!controller || !controller[route.action]) {
                            throw `Error << '${route.module}:${route.controller}:${route.action}'`;
                        }
                        controller[route.action](req, res);
                    });
                }
            }
        }

        this.web.get('*', (req, res) => {
            this.logger.log(`>>! ${req.method} : ${req.path} `);
            res.end('');
        });
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

        this.web._router.stack.forEach(print.bind(null, []))
    }
}

module.exports = AppWEB;