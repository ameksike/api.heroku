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
        res.end('DATAWAREHOSE APP v1.0');
    }

    list(req, res) {
        res.json({
            action: 'app-DefaultController-list'
        });
    }

    select(req, res) {
        res.json({
            action: 'app-DefaultController-select'
        });
    }

    insert(req, res) {
        res.json({
            action: 'app-DefaultController-insert'
        });
    }

    update(req, res) {
        res.json({
            action: 'app-DefaultController-update'
        });
    }

    delete(req, res) {
        res.json({
            action: 'app-DefaultController-delete'
        });
    }
}
module.exports = DefaultController;