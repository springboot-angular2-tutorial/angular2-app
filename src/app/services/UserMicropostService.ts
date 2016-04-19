import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {MyHttp} from "app/http";
import {objToSearchParams} from "./helpers";
import {Micropost} from "app/interfaces";

const url = (userId:string):string => `/api/users/${userId}/microposts`;

@Injectable()
export class UserMicropostService {

  constructor(private http:MyHttp) {
  }

  list(userId:string, params:{maxId:number, count:number}):Observable<Micropost[]> {
    return this.http.get(url(userId), {search: objToSearchParams(params)})
      .map(res => res.json())
      ;
  }

}
