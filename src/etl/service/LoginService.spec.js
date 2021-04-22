const App = require(__dirname + "/../../app/base/AppWEB.js");
const app = new App(__dirname + "/../../../").init();
const models = {};

describe('Login controller', () => {
    beforeAll(async () => {
        try {
            // jest.useFakeTimers();
            // await app.dao.driver.sync({ force: true });

        } catch (error) {
            console.log(error.toString());
        }
    });

    afterAll(async () => {
        for (let i in models) {
            models[i].destroy();
        }
    });

    it('should valid LoginService insert', (done) => {
        done();
    });
});

