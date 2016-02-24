import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {Http} from "app/http";
import {Micropost} from "app/interfaces";

const url = '/api/feed';

@Injectable()
export class FeedService {

  constructor(private http:Http) {
  }

  showFeed():Observable<Micropost[]> {
    return this.http.get(`${url}`)
      .map(resp => resp.json())
      ;
  }

}
