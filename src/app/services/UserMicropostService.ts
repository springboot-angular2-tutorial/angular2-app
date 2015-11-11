import {Observable} from "@reactivex/rxjs";

import {Injectable} from 'angular2/core';

import {Http} from 'app/http';
import {objToSearchParams} from './helpers';
import {Page, Micropost, PageRequest} from 'app/interfaces';

const url = (userId:string):string => `/api/users/${userId}/microposts`;
const defaultPageRequest:PageRequest = {page: 1, size: 5};

@Injectable()
export class UserMicropostService {

  constructor(private http:Http) {
  }

  list(userId:string, pageRequest:PageRequest = defaultPageRequest):Rx.Observable<Page<Micropost>> {
    return this.http.get(url(userId), {search: objToSearchParams(pageRequest)})
      .map(res => res.json())
      ;
  }

}
