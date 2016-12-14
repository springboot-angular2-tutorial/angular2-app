import {Observable} from "rxjs/Observable";
import {Component} from "@angular/core";
import {RelatedUserListComponent} from "../related-user-list.component";
import {RelatedUser} from "../../../core/domains";

@Component({
  selector: 'mpt-follower-list',
  templateUrl: '../related-user-list.component.html',
})
export class FollowerListComponent extends RelatedUserListComponent {

  ngOnInit(): any {
    super.ngOnInit();
    this.title = "Followers";
  }

  protected listProvider(maxId: number|any): Observable<RelatedUser[]> {
    return this.userService.listFollowers(this.userId, {
      maxId: maxId,
      count: 5
    });
  }

}
