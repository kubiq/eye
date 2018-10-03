"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_service_1 = require("./services/services.service");
var Bonjour = require("bonjour");
var operators_1 = require("rxjs/operators");
var lodash_1 = require("lodash");
var bonjour = new Bonjour();
var serversService = new services_service_1.ServicesService();
bonjour.find({}, function (server) {
    serversService.addServer(server);
});
function parseServices(services) {
    return lodash_1.reduce(services, function (acc, val, key) {
        acc[key] = {
            name: val.name,
            type: val.type,
        };
        return acc;
    }, {});
}
serversService.servers$
    .pipe(operators_1.map(parseServices))
    .subscribe(function (services) {
    console.log(services);
});
