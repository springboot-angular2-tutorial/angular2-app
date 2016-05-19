import {Observable} from "rxjs/Observable";
import {Component} from "@angular/core";
import {
  CanActivate,
  RouteParams,
  ROUTER_DIRECTIVES
} from "@angular/router-deprecated";
import {CORE_DIRECTIVES} from "@angular/common";
import {RelatedUser} from "../../../shared/domains";
import {RelatedUserListComponent} from "./related-user-list.component";
import {UserStatsComponent} from "../../../shared/components";
import {UserService} from "../../../shared/services";
import {activateIfSignedIn} from "../../../shared/routes";

@Component({
  selector: 'mpt-follower-list',
  template: require('./follower-list.html'),
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    UserStatsComponent,
    RelatedUserListComponent,
  ],
})
@CanActivate(() => activateIfSignedIn())
export class FollowerListComponent {

  userId:string;
  listProvider:(params:any) => Observable<RelatedUser[]>;

  constructor(private userService:UserService,
              private params:RouteParams) {
    this.userId = params.get('id');
    this.listProvider = (params) => {
      return userService.listFollowers(this.userId, params);
    };
  }

}
