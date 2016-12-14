import {Observable} from "rxjs/Observable";
import {Component} from "@angular/core";
import {RelatedUserListComponent} from "../related-user-list.component";
import {RelatedUser} from "../../../core/domains";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorHandler} from "../../../core/services/http-error-handler";

@Component({
  selector: 'mpt-following-list',
  templateUrl: '../related-user-list.component.html',
})
export class FollowingListComponent extends RelatedUserListComponent {

  constructor(protected userService: UserService,
              protected route: ActivatedRoute,
              protected errorHandler: HttpErrorHandler) {
    super(userService, route, errorHandler);
  }

  ngOnInit(): any {
    super.ngOnInit();
    this.title = "Followings";
  }

  protected listProvider(maxId: number|any): Observable<RelatedUser[]> {
    return this.userService.listFollowings(this.userId, {
      maxId: maxId,
      count: 5
    });
  }

}
