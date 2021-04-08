/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class ErrorHandler {

    constructor(opt) {}

    on(err, req, res, next) {
        console.log(err);
    }
}

module.exports = ErrorHandler;
