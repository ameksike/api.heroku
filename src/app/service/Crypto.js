const sha1 = require('sha1');
const base64 = require('base-64');
const sha256 = require('js-sha256');
const md5 = require('md5');
const { totp } = require('otplib');
const jwt = require('jsonwebtoken');
/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/03/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * @dependencies sha1 md5 base-64 otplib jsonwebtoken
 * */
class Crypto {

    /**
     * @description generate public token signature
     * @param key String : public code 
     * @param secret String : private code 
     * @return Object : public token to verify
     */
    generateToken(secret, key) {
        key = key || Date.now();
        return { secret, key, token: this.sign(secret, key, 'md5') };
    }

    /**
     * @description verify public token signature
     * @param key String : public code 
     * @param secret String : private code 
     * @param token String : public code 
     * @param time Number: difference in milliseconds
     * @return Object
    */
    verifyToken(token, secret, key, time) {
        const diff = time ? Math.floor(Date.now() - parseFloat(key)) : 0;
        const spected = this.sign(secret, key, 'md5');
        return { secret, key, token: spected === token, diff, expired: diff >= time };
    }

    /**
     * @description generate public token based on totp encode
     * @param key String : public code 
     * @param secret String : private code 
     * @return String : public token to verify
     */
    generateTokenTime(secret, key) {
        key = key || '13524';
        return this.encode(secret + '-' + key, 'totp');
    }

    /**
     * @description verify public token based on totp encode
     * @param key String : public code 
     * @param secret String : private code 
     * @param token String : public code 
     * @return Boolean
    */
    verifyTokenTime(token, secret, key) {
        key = key || '13524';
        return this.decode(token, 'totp', { secret: secret + '-' + key }, 'totp');
    }

    /**
     * @description generate key based on sha1 with timestamp
     * @param denomination String 
     * @return String
     */
    generateKey(denomination) {
        denomination = denomination || '-';
        return this.encode(denomination + Date.now(), 'sha1');
    }

    /**
     * @description Generate signature based on {sha256(md5(first) + second)}
     * @param first String
     * @param second String
     * @return String 
     */
    sign(first, second, algorithm) {
        first = first || '*';
        second = second || Date.now();
        algorithm = algorithm || 'sha256';
        let content = '';
        switch (algorithm) {
            case 'sha256':

                content = this.encode(this.encode(first, 'md5') + second, 'sha256');
                break;

            default:
                content = this.encode(first + '-.-' + second, 'md5');
                break;
        }
        return content;
    }

    /**
     * @description Generate plain String decoded from an algorithm
     * @param data String to decode
     * @param algorithm String [base64 | hash | totp ]
     * @param options Object config options based on selected algorithm
     * @return String 
     */
    decode(data, algorithm, options) {
        algorithm = algorithm || 'base64';
        options = options || {};
        let content = '';
        try {
            switch (algorithm) {
                case 'base64':
                    options.character = options.url && !options.character ? { '.': '/' } : options.character;
                    if (options.character) {
                        for (var i in options.character) {
                            data = data.replace(i, options.character[i]);
                        }
                    }
                    content = Buffer.from(data, 'base64').toString('ascii');
                    break;

                case 'totp':
                    content = totp.verify({ token: data, secret: options.secret });
                    break;

                case 'hash':
                    content = JSON.parse(this.decode(data, options.algorithm, options));
                    break;

                case 'apikey':
                    const bearer = data.split(' ')[1];
                    const token = base64.decode(bearer).split(':');
                    content = { code: Number(token[0]), apikey: token[1] };
                    break;

                case 'jwt':
                    const AUTH_PRIVATE_KEY = options.privateKey || process.env.AUTH_PRIVATE_KEY;
                    content = jwt.verify(data, AUTH_PRIVATE_KEY, options.callback);
                    break;
                
                default:
                    content = data;
                    break;
            }
            return content;
        }
        catch (error) {
            console.log(error);
            return data;
        }
    }

    /**
     * @description Generate String encoded from an algorithm 
     * @param data String to encode
     * @param algorithm String [base64 | sha1 | sha256 | md5 | totp | hash]
     * @param options Object config options based on selected algorithm
     * @return String 
     */
    encode(data, algorithm, options) {
        algorithm = algorithm || 'base64';
        options = options || {};
        let content = '';
        try {
            switch (algorithm) {
                case 'base64':
                    content = Buffer.from(data).toString('base64');
                    options.character = options.url && !options.character ? { '/': '.' } : options.character;
                    if (options.character) {
                        for (var i in options.character) {
                            content = content.replace(i, options.character[i]);
                        }
                    }
                    break;

                case 'sha1':
                    content = sha1(data);
                    break;

                case 'sha256':
                    content = sha256(data);
                    break;

                case 'totp':
                    content = totp.generate(data);
                    break;

                case 'md5':
                    content = md5(data);
                    break;

                case 'hash':
                    content = this.encode(JSON.stringify(data), options.algorithm, options);
                    break;

                case 'apikey':
                    const code = data.code || data.id;
                    content = this.encode(`${code}:${data.apikey}`);
                    break;

                case 'jwt':
                    const AUTH_PRIVATE_KEY = options.privateKey || process.env.AUTH_PRIVATE_KEY;
                    const AUTH_PRIVATE_KEY_EXP_TIME = options.privateKeyExpTime || process.env.AUTH_PRIVATE_KEY_EXP_TIME;
                    content = jwt.sign(
                        data,
                        AUTH_PRIVATE_KEY,
                        {
                            expiresIn: AUTH_PRIVATE_KEY_EXP_TIME,
                        },
                    );
                    break;

                default:
                    content = data;
                    break;
            }
            return content;
        }
        catch (error) {
            console.log(error);
            return data;
        }
    }
}

module.exports = Crypto;