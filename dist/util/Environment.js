"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Environment {
    /**
     *
     *
     * @readonly
     * @static
     * @type {string}
     * @memberof Environment
     */
    static get NODE_ENV() {
        return process.env.NODE_ENV || 'development';
    }
    /**
     *
     *
     * @readonly
     * @static
     * @type {string}
     * @memberof Environment
     */
    static get SECRET_TOKEN() {
        return process.env.SECRET_TOKEN || crypto.randomBytes(64).toString('base64');
    }
    static get PBKDF2_HASHING_ROUNDS() {
        return parseInt(process.env['PBKDF2_HASHING_ROUNDS'] || '', 10) || 729000;
    }
}
exports.default = Environment;
//# sourceMappingURL=Environment.js.map