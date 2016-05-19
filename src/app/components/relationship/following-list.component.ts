import {Observable} from "rxjs/Observable";
import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {CanActivate, RouteParams, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {RelatedUserListComponent} from "./related-user-list.component";
import {RelatedUser} from "../../../shared/domains";
import {GravatarComponent, UserStatsComponent} from "../../../shared/components";
import {UserService} from "../../../shared/services";
import {activateIfSignedIn} from "../../../shared/routes";

@Component({
  selector: 'mpt-following-list',
  template: require('./following-list.html'),
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    UserStatsComponent,
    RelatedUserListComponent,
    GravatarComponent,
  ],
})
@CanActivate(() => activateIfSignedIn())
export class FollowingListComponent {

  userId:string;
  listProvider:(params:any) => Observable<RelatedUser[]>;

  constructor(private userService:UserService,
              private params:RouteParams) {
    this.userId = params.get('id');
    this.listProvider = (params) => {
      return userService.listFollowings(this.userId, params);
    };
  }

}
