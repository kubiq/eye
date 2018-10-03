import {BehaviorSubject} from "rxjs";

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

    get servers$() {
        return this.serversSubject.asObservable();
    }

    addServer(service: IService) {
        const services = this.serversSubject.getValue();
        const key = service.fqdn;
        const newServices = {...services, [key]: service};

        this.serversSubject.next(newServices);
    }

}
