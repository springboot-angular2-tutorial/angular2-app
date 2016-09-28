import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RelatedUser} from "../../shared/domains";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'mpt-follower-list',
  templateUrl: './follower-list.html',
})
export class FollowerListComponent implements OnInit {

  userId: string;
  listProvider: (params: any) => Observable<RelatedUser[]>;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): any {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
      this.listProvider = (params) => {
        return this.userService.listFollowers(this.userId, params);
      };
    });
  }

}
