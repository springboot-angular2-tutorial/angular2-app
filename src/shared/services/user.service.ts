import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {User, RelatedUser} from "../domains";
import {objToSearchParams} from "./helpers";
import {PageRequest, Page, UserParams} from "../dto";
import {MyHttp} from "../http";

const url = '/api/users';
const defaultPageRequest:PageRequest = {page: 1, size: 5};

@Injectable()
export class UserService {

  constructor(private http:MyHttp) {
  }

  list(pageRequest:PageRequest = defaultPageRequest):Observable<Page<User>> {
    return this.http.get(url, {search: objToSearchParams(pageRequest)})
      .map(res => res.json())
      ;
  }

  get(id:string|number):Observable<User> {
    return this.http.get(`${url}/${id}`)
      .map(res => res.json())
      ;
  }

  create(params:UserParams):Observable<Response> {
    return this.http.post(url, params);
  }

  updateMe(userParam:UserParams):Observable<Response> {
    return this.http.patch(`${url}/me`, userParam)
      .do(resp => {
        localStorage.setItem('jwt', resp.headers.get('x-auth-token'));
      });
  }

  listFollowings(userId:string, params:{maxId:number, count:number}):Observable<RelatedUser[]> {
    return this.http.get(`${url}/${userId}/followings`, {search: objToSearchParams(params)})
      .map(res => res.json())
      ;
  }

  listFollowers(userId:string, params:{maxId:number, count:number}):Observable<RelatedUser[]> {
    return this.http.get(`${url}/${userId}/followers`, {search: objToSearchParams(params)})
      .map(res => res.json())
      ;
  }

}
