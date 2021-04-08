/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
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