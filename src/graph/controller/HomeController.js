/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
class HomeController {

    list(req, res) {

        const srv = this.ioc.get({
            name: 'GraphService',
            type: 'service',
            module: 'graph',
            param: { status: 'success' }
        });

        res.json(srv.getOpt());
    }

    select(req, res) {
        res.end('HomeController-select');
    }

    insert(req, res) {
        res.end('HomeController-insert');
    }

    update(req, res) {
        res.end('HomeController-update');
    }

    delete(req, res) {
        res.end('HomeController-delete');
    }
}

module.exports = HomeController;