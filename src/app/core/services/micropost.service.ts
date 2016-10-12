import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {JsonHttp} from "./";

const url = '/api/microposts';

@Injectable()
export class MicropostService {

  constructor(private http: JsonHttp) {
  }

  create(content: string): Observable<Response> {
    return this.http.post(url, {content: content});
  }

  delete(id: Number): Observable<Response> {
    return this.http.delete(`${url}/${id}`);
  }

}
