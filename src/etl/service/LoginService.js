/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		19/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
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
     * @param {*} payload {
     *      action_type:string,
     *      session:string,
     *      device_id: string,
     *      ip:string,
     *      user_name:string,
     *      user_id:string,
     *      tor_account:string,
     *      shared_account:string,
     *      multi_geo_account:string,
     *      lost_account:string,
     *      inactive_account:string,
     *      visited_before_account:string,
     *      seen_once_account:string,
     *      sqreen_score:string,
     *      point_lat:string,
     *      point_lon:string
     * } 
     */
    async insert(payload) {
        const Login = this.dao.models['Login'];
        const data = await Login.create({
            ...payload
        });
        return data;
    }
    
    update(req, res) {
        res.json({
            action: 'app-DefaultController-update'
        });
    }
}

module.exports = LoginService;