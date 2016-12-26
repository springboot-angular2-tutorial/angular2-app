import {Observable} from "rxjs/Observable";
import {RelatedUser} from "../../core/domains";


export abstract class RelatedUserListService {

  abstract list(userId: string,
                params: {maxId: number|null, count: number}): Observable<RelatedUser[]>;

  abstract title(): string
}
