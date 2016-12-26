import {Observable} from "rxjs/Observable";
import {RelatedUserListService} from "../related-user-list.service";
import {RelatedUser} from "../../../core/domains";
import {Injectable} from "@angular/core";
import {JsonHttp} from "../../../core/services/json-http";
import {objToSearchParams} from "../../../core/services/helpers";

const url = '/api/users';

@Injectable()
export class FollowingListService extends RelatedUserListService {

  constructor(private http: JsonHttp) {
    super();
  }

  list(userId: string, params: {maxId: (number|any); count: number}): Observable<RelatedUser[]> {
    return this.http.get(`${url}/${userId}/followings`, {search: objToSearchParams(params)})
      .map(res => res.json())
      ;
  }

  title(): string {
    return 'Followings';
  }

}
