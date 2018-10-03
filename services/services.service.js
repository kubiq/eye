"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var Bonjour = require("bonjour");
var operators_1 = require("rxjs/operators");
var lodash_1 = require("lodash");
var ServicesService = /** @class */ (function () {
    function ServicesService() {
        var _this = this;
        this.serversSubject = new rxjs_1.BehaviorSubject(null);
        var bonjour = new Bonjour();
        bonjour.find({}, function (server) { return _this.add(server); });
    }
    Object.defineProperty(ServicesService.prototype, "servers$", {
        get: function () {
            return this.serversSubject.pipe(operators_1.map(function (services) { return lodash_1.groupBy(lodash_1.values(services), 'name'); }), operators_1.debounceTime(1000));
        },
        enumerable: true,
        configurable: true
    });
    ServicesService.prototype.add = function (service) {
        var _a;
        var services = this.serversSubject.getValue();
        var key = service.fqdn;
        lodash_1.unset(service, 'rawTxt');
        lodash_1.unset(service, 'txt');
        var newServices = __assign({}, services, (_a = {}, _a[key] = service, _a));
        this.serversSubject.next(newServices);
    };
    return ServicesService;
}());
exports.ServicesService = ServicesService;
