/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class DAO {

    constructor(opt) {
        this.driver = null;
        this.models = require(__dirname + '/DTO.js');
        this.option = opt || {
            "name": "default",
            "host": "localhost",
            "port": "27017",
            "driver": "postgres"
        };
        this.config = {};
    }

    close() {
        return true;
    }

    prepareConnect(callback = undefined) {

    }

    connect(callback = undefined) {

    }

    getUri() {
        return '';
    }

    getModel(objDTO, collection = 'default', name = false) {
        return null;
    }

    onError(error) {
        const message = error.message ? error.message : error;
        global.log('<------------> DAO ERROR: data base connect error : ' + message);
    }

    onConnect() {
        global.log('<------------> DAO data base connect success');
    }
}
module.exports = BaseDAO;
