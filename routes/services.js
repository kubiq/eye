"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.router = express_1.Router();
/* GET services listing. */
exports.router.get('/', function (req, res) {
    res.send('respond with a resource');
});
