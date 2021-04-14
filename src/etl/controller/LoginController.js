/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
const Controller = require(__dirname + '/../../app/base/Controller.js');

class LoginController extends Controller {

    init() {
        this.srv = this.ioc.get({
            name: 'LoginService',
            type: 'service',
            module: this.module,
            param: {
                opt: this.opt,
                dao: this.dao
            }
        });
    }

    async list(req, res) {
        const data = await this.srv.list();
        res.json(data);
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async insert(req, res) {
        const payload = req.body;
        const data = await this.srv.insert(payload);
        res.json(data);
    }
}

module.exports = LoginController;