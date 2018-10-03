import { BehaviorSubject } from "rxjs";
import * as Bonjour from 'bonjour';
import { debounceTime, map } from "rxjs/operators";
import { groupBy, unset, values } from "lodash";

export interface IService {
    addresses: [],
    rawTxt: ArrayBuffer,
    txt: {},
    name: string,
    fqdn: string,
    host: string,
    referer: {
        address: string,
        family: string,
        port: number,
        size: number,
    },
    port: number,
    type: string,
    protocol: 'tcp' | 'udp',
    subtypes: []
}

export interface ServiceMap {
    [name: string]: IService,
}

export class ServicesService {

    private serversSubject = new BehaviorSubject<ServiceMap>(null);

  constructor() {

    const bonjour = new Bonjour();

    bonjour.find({}, (server) => this.add(server));

  }

    get servers$() {
      return this.serversSubject.pipe(
          map((services) => groupBy(values(services), 'name')),
          debounceTime(1000),
      );
    }

  add(service: IService) {
        const services = this.serversSubject.getValue();
        const key = service.fqdn;
    unset(service, 'rawTxt');
    unset(service, 'txt');
        const newServices = {...services, [key]: service};

        this.serversSubject.next(newServices);
    }

}
