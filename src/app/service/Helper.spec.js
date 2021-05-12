const KsMf = require('ksmf');
const app = new KsMf.app.WEB(__dirname + "/../../../").init();

describe('APP controller', () => {
    beforeAll(async () => { });

    afterAll(async () => { });

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

    it("should a valid call for app service", (done) => {
        const srv = app.helper.get({
            name: 'Hook',
            dependency: { 'helper': 'helper' }
        });
        expect(srv).toBeInstanceOf(Object);
        done();
    });

    it("should a valid call for Etl's controller", (done) => {
        const srv = app.helper.get({
            name: 'LoginController',
            path: 'controller',
            module: 'etl',
            options: {
                opt: app.cfg,
                dao: {
                    // ... CONFIGURE 
                    'cfg': app.cfg.app,
                    // ... ENV
                    'env': app.cfg.env,
                    'envid': app.cfg.envid,
                    // ... PATH
                    'prj': app.path,
                    // ... NAME
                    'name': 'etl'
                }
            }
        });
        expect(srv).toBeInstanceOf(Object);
        done();
    });
});

