import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
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
