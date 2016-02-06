import {Observable} from "rxjs/Observable";
import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {Http} from 'app/http';

const url = '/api/relationships';

@Injectable()
export class RelationshipService {

  constructor(private http:Http) {
  }

  follow(followerId:string):Observable<Response> {
    return this.http.post(`${url}/to/${followerId}`, '');
  }

  unfollow(followerId:string):Observable<Response> {
    return this.http.delete(`${url}/to/${followerId}`);
  }

}
