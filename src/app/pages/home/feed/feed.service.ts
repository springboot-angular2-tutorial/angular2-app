import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {MyHttp} from "../../../core/http";
import {Micropost} from "../../../core/domains";

const url = '/api/feed';

@Injectable()
export class FeedService {

  constructor(private http: MyHttp) {
  }

  showFeed(): Observable<Micropost[]> {
    return this.http.get(`${url}`)
      .map(resp => resp.json())
      ;
  }

}
