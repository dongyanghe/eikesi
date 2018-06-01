import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserFlock } from './user-flock.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserFlock>;

@Injectable()
export class UserFlockService {

    private resourceUrl =  SERVER_API_URL + 'api/user-flocks';

    constructor(private http: HttpClient) { }

    create(userFlock: UserFlock): Observable<EntityResponseType> {
        const copy = this.convert(userFlock);
        return this.http.post<UserFlock>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userFlock: UserFlock): Observable<EntityResponseType> {
        const copy = this.convert(userFlock);
        return this.http.put<UserFlock>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserFlock>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserFlock[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserFlock[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserFlock[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserFlock = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserFlock[]>): HttpResponse<UserFlock[]> {
        const jsonResponse: UserFlock[] = res.body;
        const body: UserFlock[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserFlock.
     */
    private convertItemFromServer(userFlock: UserFlock): UserFlock {
        const copy: UserFlock = Object.assign({}, userFlock);
        return copy;
    }

    /**
     * Convert a UserFlock to a JSON which can be sent to the server.
     */
    private convert(userFlock: UserFlock): UserFlock {
        const copy: UserFlock = Object.assign({}, userFlock);
        return copy;
    }
}
