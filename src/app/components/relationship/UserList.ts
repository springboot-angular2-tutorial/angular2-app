import {Observable} from "rxjs/Observable";
import {Component, View, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {PageRequest, Page, User} from "app/interfaces";
import {ErrorHandler, LoginService} from "app/services";
import {Gravatar, Pager} from 'app/components';

@Component({
  selector: 'user-list',
  properties: ['listProvider'],
})
@View({
  styles: [require('./user-list.scss')],
  template: require('./user-list.html'),
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    FORM_DIRECTIVES,
    Gravatar,
    Pager,
  ],
})
export class UserList implements OnInit {

  listProvider:(pageRequest:PageRequest) => Observable<Page<User>>;
  users:User[];
  totalPages:number;

  constructor(private errorHandler:ErrorHandler) {
  }

  ngOnInit():any {
    this.list(1);
  }

  list(page) {
    this.listProvider({page: page, size: 5})
      .subscribe(usersPage => {
        this.users = usersPage.content;
        this.totalPages = usersPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

}
