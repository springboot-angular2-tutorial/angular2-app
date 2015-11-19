const Rx = require('@reactivex/rxjs/dist/cjs/Rx');

import {
  Component,
  View,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {pagination} from 'ng2-bootstrap/ng2-bootstrap';

import {PageRequest, Page, User} from "app/interfaces";
import {ErrorHandler, LoginService} from "app/services";
import {Gravatar} from 'app/components';

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
    pagination,
    Gravatar,
  ],
})
export class UserList {

  listProvider:(pageRequest:PageRequest) => Rx.Observable<Page<User>>;
  users:User[];
  currentPage:number;
  totalItems:number;
  itemsPerPage:number = 5;
  totalPages:number = 0;

  constructor(private errorHandler:ErrorHandler) {
  }

  list() {
    this.listProvider({
        page: this.currentPage,
        size: this.itemsPerPage,
      })
      .subscribe(usersPage => {
        this.users = usersPage.content;
        this.totalItems = usersPage.totalElements;
        this.totalPages = usersPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

  pageChanged(event) {
    if (event.page == this.currentPage) return;
    this.currentPage = event.page;
    this.list();
  }

}
