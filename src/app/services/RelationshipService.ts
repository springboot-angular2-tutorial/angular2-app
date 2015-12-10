import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/angular2';

import {Http} from 'app/http';

const url = '/api/relationships';

@Injectable()
export class RelationshipService {

  constructor(private http:Http) {
  }

  isFollowing(followerId:string):Observable<boolean> {
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

  follow(followerId:string):Observable<void> {
    return this.http.post(`${url}/to/${followerId}`, '');
  }

  unfollow(followerId:string):Observable<void> {
    return this.http.delete(`${url}/to/${followerId}`);
  }

}
