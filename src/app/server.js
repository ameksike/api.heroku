/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
const App = require(__dirname + "/base/App.js");
const app = new App(__dirname + "/../../");
module.exports = app.init().run();
