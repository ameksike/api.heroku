/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
class GraphService {

    constructor(opt) {
        this.opt = opt;
    }
    
    getOpt() {
        return { data: 'GraphService', ...this.opt };
    }
}

module.exports = GraphService;