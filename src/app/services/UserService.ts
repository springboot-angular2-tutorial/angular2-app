const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {Http} from 'app/http';
import {objToSearchParams} from './helpers';
import {User, UserResponse, Page, PageRequest, UserParams} from 'app/interfaces';

const url = '/api/users';
const defaultPageRequest:PageRequest = {page: 1, size: 5};

@Injectable()
export class UserService {

  constructor(private http:Http) {
  }

  list(pageRequest:PageRequest = defaultPageRequest):Rx.Observable<Page<User>> {
    return this.http.get(url, {search: objToSearchParams(pageRequest)})
      .map(res => res.json())
      ;
  }

  get(id:string|number):Rx.Observable<UserResponse> {
    return this.http.get(`${url}/${id}`)
      .map(res => res.json())
      ;
  }

  create(params:UserParams):Rx.Observable<Response> {
    return this.http.post(url, JSON.stringify(params));
  }

  updateMe(userParam:UserParams):Rx.Observable<void> {
    return this.http.patch(`${url}/me`, JSON.stringify(userParam))
      .do(resp => {
        localStorage.setItem('jwt', resp.headers.get('X-AUTH-TOKEN'))
      });
  }

  listFollowings(userId:string, pageRequest:PageRequest = defaultPageRequest):Rx.Observable<Page<User>> {
    return this.http.get(`${url}/${userId}/followings`, {search: objToSearchParams(pageRequest)})
      .map(res => res.json())
      ;
  }

  listFollowers(userId:string, pageRequest:PageRequest = defaultPageRequest):Rx.Observable<Page<User>> {
    return this.http.get(`${url}/${userId}/followers`, {search: objToSearchParams(pageRequest)})
      .map(res => res.json())
      ;
  }

}
