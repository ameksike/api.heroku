/*
 * @author		Antonio Membrides Espinosa
 * @date		07/05/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const App = require(__dirname + "/base/App.js");
const app = new App(__dirname + "/../../");
module.exports = app.init().run();
