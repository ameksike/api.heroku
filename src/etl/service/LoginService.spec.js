/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */

const App = require(__dirname + "/../../app/base/App.js");
const app = new App(__dirname + "/../../../");
app.init();


describe('Login controller', () => {
    beforeAll(async () => {

        jest.useFakeTimers();

        try {
            await app.dao.driver.sync({ force: true });

        } catch (error) {
            console.log(error.toString());
        }
    });

    afterAll(async () => {
        for (let i in models) {
            models[i].destroy();
        }
    });

    it('should valid LoginService insert', async (done) => {

        const _controller = app.ioc.get({
            name: 'LoginService',
            type: 'service',
            module: 'etl',
            param: {
                opt: app.cfg.app,
                dao: app.dao,
                module: 'etl'
            }
        });

        // _controller.insert({ });
        done();
    });
});

