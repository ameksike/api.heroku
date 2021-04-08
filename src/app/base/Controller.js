/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class Controller {

    constructor(opt) {
        this.opt = opt;
    }

    list(req, res, next) {
        res.json({ "message": "REST API mod <" + this.opt.name + "> selectAll." });
    }

    select(req, res, next) {
        res.json({ "message": "REST API mod <" + this.opt.name + ">  select.", 'id': req.params.id, 'pid': req.params.pid });
    }

    delete(req, res, next) {
        res.json({ "message": "REST API mod <" + this.opt.name + ">  delete.", 'id': req.params.id, 'pid': req.params.pid });
    }

    update(req, res, next) {
        const elm = {
            'name': req.body['name']
        }
        res.json({ "message": "REST API mod <" + this.opt.name + ">  update.", 'id': req.params.id, 'obj': elm });
    }

    insert(req, res, next) {
        const elm = {
            'name': req.body['name']
        }
        res.json({ "message": "REST API mod <" + this.opt.name + ">  insert.", 'obj': elm });
    }
}
module.exports = Controller;