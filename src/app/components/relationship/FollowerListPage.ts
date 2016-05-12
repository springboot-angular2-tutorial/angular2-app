import {Observable} from "rxjs/Observable";
import {Component} from "@angular/core";
import {CanActivate, RouteParams, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {CORE_DIRECTIVES} from "@angular/common";
import {UserService} from "app/services";
import {UserStats} from "app/components";
import {RelatedUser} from "app/interfaces";
import {activateIfSignedIn} from "app/routes";
import {UserList} from "./UserList";

@Component({
  selector: 'follower-list-page',
  template: require('./follower-list.html'),
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    UserStats,
    UserList,
  ],
})
@CanActivate(() => activateIfSignedIn())
export class FollowerListPage {

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
