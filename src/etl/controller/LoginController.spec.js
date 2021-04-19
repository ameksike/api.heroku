const models = {};

describe('Login controller', () => {
    beforeAll(async () => {

        jest.useFakeTimers();

        try {
            //await db.sequelize.sync({ force: true });

            const data = {
                "action_type": "login",
                "session": "f234r234r",
                "device_id": "asdfasdfsdf2134rf43r",
                "ip": "127.0.0.1",
                "user_name": "tonykssa@tropipa.com",
                "user_id": "2rf24234f234f34ff2",
                "tor_account": "1",
                "shared_account": "1",
                "multi_geo_account": "0",
                "lost_account": "0",
                "inactive_account": "0",
                "visited_before_account": "1",
                "seen_once_account": "1",
                "sqreen_score": "0.98",
                "point_lat": "-17.5",
                "point_lon": "45.8"
            };
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

