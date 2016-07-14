import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {RelatedUser} from "../../../shared/domains";
import {RelatedUserListComponent} from "./related-user-list.component";
import {UserStatsComponent} from "../../../shared/components";
import {UserService} from "../../../shared/services";

@Component({
  selector: 'mpt-follower-list',
  templateUrl: './follower-list.html',
  directives: [
    ROUTER_DIRECTIVES,
    UserStatsComponent,
    RelatedUserListComponent,
  ],
})
export class FollowerListComponent implements OnInit {

  userId:string;
  listProvider:(params:any) => Observable<RelatedUser[]>;

  constructor(private userService:UserService, private route:ActivatedRoute) {
  }

  ngOnInit():any {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
      this.listProvider = (params) => {
        return this.userService.listFollowers(this.userId, params);
      };
    });
  }

}
