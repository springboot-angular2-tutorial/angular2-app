import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {RelatedUserListComponent} from "./related-user-list.component";
import {RelatedUser} from "../../../shared/domains";
import {
  GravatarComponent,
  UserStatsComponent
} from "../../../shared/components";
import {UserService} from "../../../shared/services";

@Component({
  selector: 'mpt-following-list',
  templateUrl: './following-list.html',
  directives: [
    ROUTER_DIRECTIVES,
    UserStatsComponent,
    RelatedUserListComponent,
    GravatarComponent,
  ],
})
export class FollowingListComponent implements OnInit {

  userId:string;
  listProvider:(params:any) => Observable<RelatedUser[]>;

  constructor(private userService:UserService, private route:ActivatedRoute) {
  }

  ngOnInit():any {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
      this.listProvider = (params) => {
        return this.userService.listFollowings(this.userId, params);
      };
    });
  }

}
