import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Entry } from './entry.model';

@Injectable()
export class EntryService {
    private resourceUrl = Api.API_URL + '/entries';

    constructor(private http: HttpClient) { }

    create(entry: Entry): Observable<Entry> {
        return this.http.post(this.resourceUrl, entry);
    }

    update(entry: Entry): Observable<Entry> {
        return this.http.put(this.resourceUrl, entry);
    }

    find(id: number): Observable<Entry> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
