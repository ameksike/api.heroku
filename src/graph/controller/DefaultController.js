/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
const Controller = require(__dirname + '/../../app/base/Controller.js');

class DefaultController extends Controller {

    constructor(opt) {
        super(opt);
    }

    list(req, res) {
        console.log('DefaultController-list');
        res.end('DefaultController-list');
    }

    select(req, res) {
        res.end('DefaultController-select');
    }

    insert(req, res) {
        res.end('DefaultController-insert');
    }

    update(req, res) {
        res.end('DefaultController-update');
    }

    delete(req, res) {
        res.end('DefaultController-delete');
    }

}
module.exports = DefaultController;