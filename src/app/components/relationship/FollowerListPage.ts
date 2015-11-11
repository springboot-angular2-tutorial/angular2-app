const Rx = require('@reactivex/rxjs/dist/cjs/Rx');

import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {pagination} from 'ng2-bootstrap/components/pagination/pagination';

import {UserService} from 'app/services';
import {UserStats, Gravatar} from 'app/components';
import {User, PageRequest, Page} from 'app/interfaces';
import {PrivatePage} from 'app/routes';
import {UserList} from './UserList';

@Component({
  selector: 'follower-list-page',
})
@View({
  template: require('./follower-list.html'),
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    UserStats,
    UserList,
  ],
})
@PrivatePage()
export class FollowerListPage {

  userId:string;
  listProvider:(pageRequest:PageRequest) => Rx.Observable<Page<User>>;

  constructor(private userService:UserService,
              private params:RouteParams) {
    this.userId = params.get('id');
    this.listProvider = (pageRequest) => {
      return userService.listFollowers(this.userId, pageRequest);
    };
  }

}
