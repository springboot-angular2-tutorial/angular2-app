const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Injectable} from 'angular2/core';

import {Http} from 'app/http';

const url = '/api/relationships';

@Injectable()
export class RelationshipService {

  constructor(private http:Http) {
  }

  isFollowing(followerId:string):Rx.Observable<boolean> {
    return this.http.get(`${url}/to/${followerId}`)
      .map(() => true)
      .catch(error => {
        if (error.response.status == 404) {
          return Observable.of(false);
        }
        throw error;
      })
      ;
  }

  follow(followerId:string):Rx.Observable<void> {
    return this.http.post(`${url}/to/${followerId}`, '');
  }

  unfollow(followerId:string):Rx.Observable<void> {
    return this.http.delete(`${url}/to/${followerId}`);
  }

}
