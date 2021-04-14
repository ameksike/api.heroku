/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */

const models = {};

describe('Login controller', () => {
    beforeAll(async () => {

        jest.useFakeTimers();

        try {
            //await db.sequelize.sync({ force: true });

        } catch (error) {
            console.log(error.toString());
        }
    });

    afterAll(async () => {
        for (let i in models) {
            models[i].destroy();
        }
    });

    it('should valid getServiceFee form service setting', async (done) => {

        done();
    });
});

