import { BehaviorSubject } from 'rxjs';
import * as Bonjour from 'bonjour';
import { map } from 'rxjs/operators';
import { groupBy, unset, values, reduce } from 'lodash';

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

export interface ServicesMap {
  [name: string]: IService,
}

export class ServicesService {

  private serversSubject = new BehaviorSubject<ServicesMap>(null);

  constructor() {

    const bonjour = new Bonjour();
    bonjour.find({}, (server) => this.add(server));

  }

  get value(): ServicesMap {
    return this.toArray(this.serversSubject.getValue());
  }

  get servers$() {
    return this.serversSubject.pipe(
        map(this.toArray),
    );
  }

  add(service: IService) {
    const services = this.serversSubject.getValue();
    const key = service.fqdn;
    unset(service, 'rawTxt');
    unset(service, 'txt');
    const newServices = {...services, [key]: service};
    // const allServices = values(newServices);
    // const groupedServices = groupBy(allServices, 'name');

    this.serversSubject.next(newServices);
  }

  toArray(services: ServicesMap) {

    const allServices = values(services);
    const groupedServices = groupBy(allServices, 'name');

    return reduce(groupedServices, (acc, services: IService[], hostname: string) => {

      acc.push({hostname, services});

      return acc;
    }, [])
  }
}
