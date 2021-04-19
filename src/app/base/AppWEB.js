/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

const ErrorHandler = require(__dirname + '/ErrorHandler.js');
const Helper = require(__dirname + '/Helper.js');
const DAO = require(__dirname + '/DAO.js');

class AppWEB {

    constructor(path) {
        this.option = { app: {}, srv: {} };
        this.path = path;
        this.app = express();
        this.mod = [];
        this.cfg = {};
        this.err = new ErrorHandler();
        this.helper = new Helper();
        this.dao = new DAO();
        this.helper.err = this.err;
    }

    init() {
        try {
            this.loadConfig();
            this.initApp();
            this.initModel();
            this.loadModules();
        } catch (error) {
            if (this.err) {
                this.err.on(error);
            }
        }
        return this;
    }

    run() {
        const port = this.cfg.srv.port;
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
        this.helper.configure({ path: this.cfg.srv.module.path, src: this.cfg.srv.helper });
        this.err.configure({ level: this.cfg.srv.log });
    }

    loadModules() {
        if (this.cfg.srv.module && this.cfg.srv.module.load) {
            this.cfg.srv.module.load.forEach(name => {
                const obj = this.helper.get({
                    name,
                    type: 'module',
                    param: {
                        // ... EXPRESS APP
                        app: this.app,
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
                    }
                });

                if (obj) {
                    this.dao.loadModels(this.cfg.srv.module.path + name + "/model/");
                    obj.init();
                }
            });
        }

        if (this.cfg.srv.route) {
            for (const i in this.cfg.srv.route) {
                const route = this.cfg.srv.route[i];
                this.app[route.method](i, (req, res) => {
                    route.type = route.type || 'controller';
                    route.name = route.name || route.controller;
                    const controller = this.helper.get(route);
                    if (!controller || !controller[route.action]) {
                        throw `Error << '${route.module}:${route.controller}:${route.action}'`;
                    }
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
        this.app.use((err, req, res, next) => {
            this.err.on(err, req, res, next);
        });

        //... Allow all origin request, CORS on ExpressJS
        this.app.use(cors());

        //... Allow body Parser
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        //this.app.use(express.multipart());

        //... Log requests 
        this.app.use((req, res, next) => {
            console.log(`>>> ${req.method} : ${req.path} `);
            return next();
        })
    }

    initModel() {
        this.dao.configure(this.cfg.app);
        this.dao.connect();
        this.dao.loadModels(this.path + 'db/models/');
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

module.exports = AppWEB;