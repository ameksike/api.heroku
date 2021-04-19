const App = require(__dirname + "/../base/AppWEB.js");
const app = new App(__dirname + "/../../../");
app.init();
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
    });

    it("should a valid call for App's crypto service ", (done) => {
        const cripto = app.helper.get('Crypto');
        const data = cripto.encode("this is a demo");
        expect(data).toBe('dGhpcyBpcyBhIGRlbW8=');
        done();
    });

    it("should a valid call for App's crypto service by alias on core.json ", (done) => {
        const cripto = app.helper.get('Demo');
        const data = cripto.encode("this is a demo");
        expect(cripto).toBeInstanceOf(Object);
        expect(data).toBe('dGhpcyBpcyBhIGRlbW8=');
        done();
    });

    it("should a valid call for Etl's service", (done) => {
        const srv = app.helper.get({
            name: 'EtlService',
            module: 'etl',
            param: { status: 'success' }
        });
        expect(srv).toBeInstanceOf(Object);
        done();
    });

    it("should a valid call for Etl's controller", (done) => {
        const srv = app.helper.get({
            name: 'LoginController',
            type: 'controller',
            module: 'etl',
            param: {
                opt: app.cfg,
                dao: {
                    // ... CONFIGURE 
                    'cfg': app.cfg.app,
                    // ... ENV
                    'env': app.cfg.env,
                    'envid': app.cfg.envid,
                    // ... PATH
                    'prj': app.path,
                    'mod': app.cfg.srv.module.path + name + "/",
                    'app': app.cfg.srv.module.path + "app/",
                    // ... NAME
                    'name': 'etl'
                }
            }
        });
        expect(srv).toBeInstanceOf(Object);
        done();
    });



});

