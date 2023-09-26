import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public configUrl = "https://gpate-service.onrender.com/";
    constructor(private http: HttpClient) {}

    isProgress(): boolean {
        return localStorage.getItem('cargando') != null && localStorage.getItem('cargando') != undefined;
    }

    initProgress() {
        localStorage.setItem('cargando', 'true');
    }

    finishProgress() {
        localStorage.removeItem('cargando');
    }

    filter(filter: any, url: string): Promise<any> {
        let sort = '';
        if(filter.orderBy && filter.orderAscOrDesc) {
            sort = '&sort=' + filter.orderBy + ',' + filter.orderAscOrDesc;
        }
        return this.http.get(this.configUrl + url + new URLSearchParams(filter) + sort).toPromise();
    }

    get(url: string): Promise<any> {
        return this.http.get(this.configUrl + url).toPromise();
    }

    delete(url: string): Promise<any> {
        return this.http.delete(this.configUrl + url).toPromise();
    }

    post(object: any, url: string): Promise<any> {
        return this.http.post(this.configUrl + url, object).toPromise();
    }

    getDate(date: any) {
        if(date != null) {
          var parts = date.match(/(\d+)/g);
          return new Date(parts[0], parts[1]-1, parts[2]);
        } else {
          return null;
        }
    }
}