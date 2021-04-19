/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const Controller = require(__dirname + '/../base/Controller.js');

class DefaultController extends Controller {

    constructor(opt) {
        super(opt);
    }

    home(req, res) {
        res.end('DEMO APP v1.0');
    }

    list(req, res) {
        console.log('DefaultController-list');
        res.end('app-DefaultController-list');
    }

    select(req, res) {
        res.end('app-DefaultController-select');
    }

    insert(req, res) {
        res.end('app-DefaultController-insert');
    }

    update(req, res) {
        res.end('app-DefaultController-update');
    }

    delete(req, res) {
        res.end('app-DefaultController-delete');
    }
}
module.exports = DefaultController;