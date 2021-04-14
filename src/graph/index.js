/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
const Module = require(__dirname + '/../app/base/Module.js');
class GraphModule extends Module {

    initConfig() {
        this.routes.push({ route: this.prefix + '/home', controller: 'HomeController' });
        super.initConfig();
    }

}
module.exports = GraphModule;
