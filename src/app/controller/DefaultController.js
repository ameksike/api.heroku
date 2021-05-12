/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class DefaultController extends KsMf.app.Controller {

    constructor(opt) {
        super(opt);
    }

    home(req, res) {
        res.end('DEMO APP v1.0');
    }

    list(req, res) {
        res.json({
            action: 'app-DefaultController-list'
        });
    }
}
module.exports = DefaultController;