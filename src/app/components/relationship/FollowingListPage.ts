import {Observable} from "rxjs/Observable";
import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserService} from 'app/services';
import {UserStats, Gravatar} from 'app/components';
import {User, PageRequest, Page} from 'app/interfaces';
import {PrivatePage} from 'app/routes';
import {UserList} from './UserList';

@Component({
  selector: 'following-list-page',
})
@View({
  template: require('./following-list.html'),
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    UserStats,
    UserList,
    Gravatar,
  ],
})
@PrivatePage()
export class FollowingListPage {

  userId:string;
  listProvider:(params:any) => Observable<User[]>;

  constructor(private userService:UserService,
              private params:RouteParams) {
    this.userId = params.get('id');
    this.listProvider = (params) => {
      return userService.listFollowings(this.userId, params);
    };
  }

}
