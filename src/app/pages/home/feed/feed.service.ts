import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Micropost} from "../../../core/domains";
import {JsonHttp} from "../../../core/services";

const url = '/api/feed';

@Injectable()
export class FeedService {

  constructor(private http: JsonHttp) {
  }

  showFeed(): Observable<Micropost[]> {
    return this.http.get(`${url}`)
      .map(resp => resp.json())
      ;
  }

}
