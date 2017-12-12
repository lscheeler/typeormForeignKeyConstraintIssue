"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import * as ExpressMiddleware from '../util/ExpressMiddleware';
const index = express_1.Router();
index.get('/', (req, res, next) => {
    res.redirect(302, '/home');
});
exports.default = index;
//# sourceMappingURL=Index.js.map