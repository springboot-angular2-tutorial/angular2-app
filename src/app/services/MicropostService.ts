import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {Http} from 'app/http';

const url = '/api/microposts';

@Injectable()
export class MicropostService {

  constructor(private http:Http) {
  }

  create(content:string):Rx.Observable<Response> {
    const body = JSON.stringify({content: content});
    return this.http.post(url, body);
  }

  delete(id:Number):Rx.Observable<void> {
    return this.http.delete(`${url}/${id}`);
  }

}
