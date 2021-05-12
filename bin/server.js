/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const app = new KsMf.app.WEB(__dirname + "/../");
module.exports = app.init().run();
