import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Blog } from './blog.model';

@Injectable()
export class BlogService {
    private resourceUrl = Api.API_URL + '/blogs';

    constructor(private http: HttpClient) { }

    create(blog: Blog): Observable<Blog> {
        return this.http.post(this.resourceUrl, blog);
    }

    update(blog: Blog): Observable<Blog> {
        return this.http.put(this.resourceUrl, blog);
    }

    find(id: number): Observable<Blog> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
