import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Micropost} from "../../domains";
import {objToSearchParams} from "../../services/helpers";
import {MyHttp} from "../../http";

const url = (userId:string):string => `/api/users/${userId}/microposts`;

@Injectable()
export class MicropostListService {

  constructor(private http:MyHttp) {
  }

  list(userId:string, params:{maxId:number, count:number}):Observable<Micropost[]> {
    return this.http.get(url(userId), {search: objToSearchParams(params)})
      .map(res => res.json())
      ;
  }

}
