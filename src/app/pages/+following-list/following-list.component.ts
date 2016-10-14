import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RelatedUser} from "../../core/domains";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'mpt-following-list',
  templateUrl: 'following-list.component.html',
})
export class FollowingListComponent implements OnInit {

  userId: string;
  listProvider: (params: any) => Observable<RelatedUser[]>;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): any {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
      this.listProvider = (params) => {
        return this.userService.listFollowings(this.userId, params);
      };
    });
  }

}
