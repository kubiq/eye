import {IService, ServicesService} from "./services/services.service";
import * as Bonjour from 'bonjour';
import {map} from "rxjs/operators";
import {reduce} from 'lodash';

const bonjour = new Bonjour();

const serversService = new ServicesService();

bonjour.find({}, function (server) {
    serversService.addServer(server)
});

function parseServices(services) {
    return reduce(services, (acc, val: IService, key: string) => {
        acc[key] = {
            name: val.name,
            type: val.type,
        };
        return acc;
    }, {})
}

serversService.servers$
    .pipe(map(parseServices))
    .subscribe((services) => {
        console.log(services);
    });
