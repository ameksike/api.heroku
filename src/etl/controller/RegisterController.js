/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		19/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const Controller = require(__dirname + '/../../app/base/Controller.js');

class RegisterController extends Controller {

    list(req, res) {

        const srv = this.helper.get({
            name: 'EtlService',
            type: 'service',
            module: 'etl',
            param: { status: 'success' }
        });

        res.json(srv.getOpt());
    }

    fill(req, res) {
        res.end('RegisterController-fill');
    }

    select(req, res) {
        res.end('RegisterController-select');
    }

    insert(req, res) {
        res.end('RegisterController-insert');
    }

    update(req, res) {
        res.end('RegisterController-update');
    }

    delete(req, res) {
        res.end('RegisterController-delete');
    }
}

module.exports = RegisterController;