import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {Response} from "angular2/http";
import {MyHttp} from "app/http";

const url = '/api/microposts';

@Injectable()
export class MicropostService {

  constructor(private http:MyHttp) {
  }

  create(content:string):Observable<Response> {
    const body = JSON.stringify({content: content});
    return this.http.post(url, body);
  }

  delete(id:Number):Observable<Response> {
    return this.http.delete(`${url}/${id}`);
  }

}
