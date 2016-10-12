import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {JsonHttp} from "../../core/services";

const url = '/api/relationships';

@Injectable()
export class FollowBtnService {

  constructor(private http:JsonHttp) {
  }

  follow(followerId:string):Observable<Response> {
    return this.http.post(`${url}/to/${followerId}`, {});
  }

  unfollow(followerId:string):Observable<Response> {
    return this.http.delete(`${url}/to/${followerId}`);
  }

}
