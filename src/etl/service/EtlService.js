/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		19/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class EtlService {

    constructor(opt) {
        this.opt = opt;
    }

    getOpt() {
        return { data: 'EtlService', ...this.opt };
    }
}

module.exports = EtlService;