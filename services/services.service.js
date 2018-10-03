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
var ServicesService = /** @class */ (function () {
    function ServicesService() {
        this.serversSubject = new rxjs_1.BehaviorSubject(null);
    }
    Object.defineProperty(ServicesService.prototype, "servers$", {
        get: function () {
            return this.serversSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ServicesService.prototype.addServer = function (service) {
        var _a;
        var services = this.serversSubject.getValue();
        var key = service.fqdn;
        var newServices = __assign({}, services, (_a = {}, _a[key] = service, _a));
        this.serversSubject.next(newServices);
    };
    return ServicesService;
}());
exports.ServicesService = ServicesService;
