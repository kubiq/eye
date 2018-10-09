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
    Object.defineProperty(ServicesService.prototype, "value", {
        get: function () {
            return this.toArray(this.serversSubject.getValue());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesService.prototype, "servers$", {
        get: function () {
            return this.serversSubject.pipe(operators_1.map(this.toArray));
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
        // const allServices = values(newServices);
        // const groupedServices = groupBy(allServices, 'name');
        this.serversSubject.next(newServices);
    };
    ServicesService.prototype.toArray = function (services) {
        var allServices = lodash_1.values(services);
        var groupedServices = lodash_1.groupBy(allServices, 'name');
        return lodash_1.reduce(groupedServices, function (acc, services, hostname) {
            acc.push({ hostname: hostname, services: services });
            return acc;
        }, []);
    };
    return ServicesService;
}());
exports.ServicesService = ServicesService;
