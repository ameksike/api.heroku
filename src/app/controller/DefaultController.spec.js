const App = require(__dirname + "/../base/AppWEB.js");
const app = new App(__dirname + "/../../../").init();
const web = app.web;

const supertest = require('supertest');
const req = supertest(web);

const baseUrl = '/app';
const models = {};

describe('APP controller', () => {
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
        web.stop();
    });

    it("should a valid call action:controller", (done) => {
        req
            .get(baseUrl)
            .send({
                "version": '2.1',
            })
            .end((error, res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.action).toBe('app-DefaultController-list');
                done();
            });
    });

});

