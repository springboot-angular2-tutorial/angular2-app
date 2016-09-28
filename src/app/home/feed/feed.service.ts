import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {MyHttp} from "../../../shared/http/http";
import {Micropost} from "../../../shared/domains";

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
