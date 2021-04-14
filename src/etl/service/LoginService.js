/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
class LoginService {

    constructor(opt) {
        this.opt = opt.opt;
        this.dao = opt.dao;
    }

    async list() {
        const Login = this.dao.models['Login'];
        const data = await Login.findAll({
            attributes: { exclude: ['id'] },
        });
        return data;
    }

    /**
     * 
     * @param {*} payload 
     */
    async insert(payload) {
        const Login = this.dao.models['Login'];
        const data = await Login.create({
            ...payload
        });
        return data;
    }
}

module.exports = LoginService;